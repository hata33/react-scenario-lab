import { NextRequest } from 'next/server';

export interface DeviceInfo {
  id: string;
  name: string;
  userAgent: string;
  platform: string;
  screenResolution: string;
  colorDepth: number;
  timezone: string;
  language: string;
  isMobile: boolean;
  isBot: boolean;
}

export interface LoginSession {
  sceneId: string;
  state: 'waiting' | 'scanned' | 'confirmed' | 'expired';
  userId?: string;
  token?: string;
  deviceInfo?: DeviceInfo;
  createdAt: number;
  expiresAt: number;
  scannedAt?: number;
  confirmedAt?: number;
  ipAddress?: string;
  userAgent?: string;
}

class SessionManager {
  private sessions = new Map<string, LoginSession>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startCleanup();
  }

  createSession(sceneId: string, request?: NextRequest): LoginSession {
    const session: LoginSession = {
      sceneId,
      state: 'waiting',
      createdAt: Date.now(),
      expiresAt: Date.now() + 1800000, // 30分钟
      ipAddress: this.getClientIP(request),
      userAgent: request?.headers.get('user-agent') || undefined,
    };

    this.sessions.set(sceneId, session);
    return session;
  }

  updateSession(sceneId: string, updates: Partial<LoginSession>): boolean {
    const session = this.sessions.get(sceneId);
    if (!session) return false;

    Object.assign(session, updates);

    // 状态变更时记录时间戳
    if (updates.state === 'scanned' && !session.scannedAt) {
      session.scannedAt = Date.now();
    }
    if (updates.state === 'confirmed' && !session.confirmedAt) {
      session.confirmedAt = Date.now();
    }

    return true;
  }

  getSession(sceneId: string): LoginSession | undefined {
    return this.sessions.get(sceneId);
  }

  isSessionValid(sceneId: string): boolean {
    const session = this.sessions.get(sceneId);
    if (!session) return false;
    return session.expiresAt > Date.now() && session.state !== 'expired';
  }

  // 获取用户的活动会话
  getUserActiveSessions(userId: string): LoginSession[] {
    const now = Date.now();
    return Array.from(this.sessions.values()).filter(session =>
      session.userId === userId &&
      session.expiresAt > now &&
      session.state === 'confirmed'
    );
  }

  // 终止用户的所有会话
  terminateUserSessions(userId: string): number {
    let terminatedCount = 0;
    for (const [sceneId, session] of this.sessions.entries()) {
      if (session.userId === userId) {
        session.state = 'expired';
        session.expiresAt = Date.now();
        terminatedCount++;
      }
    }
    return terminatedCount;
  }

  private getClientIP(request?: NextRequest): string | undefined {
    if (!request) return undefined;

    // 获取真实IP，考虑代理情况
    return (
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') || // Cloudflare
      undefined
    )?.split(',')[0]?.trim();
  }

  private startCleanup() {
    // 每分钟清理一次过期会话
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const expiredKeys: string[] = [];

      for (const [sceneId, session] of this.sessions.entries()) {
        if (session.expiresAt < now) {
          expiredKeys.push(sceneId);
        }
      }

      expiredKeys.forEach(sceneId => {
        this.sessions.delete(sceneId);
      });

      if (expiredKeys.length > 0) {
        console.log(`Cleaned up ${expiredKeys.length} expired sessions`);
      }
    }, 60000);
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.sessions.clear();
  }

  // 统计信息
  getStats() {
    const now = Date.now();
    const total = this.sessions.size;
    const active = Array.from(this.sessions.values()).filter(s => s.expiresAt > now).length;
    const expired = total - active;

    return {
      total,
      active,
      expired,
      states: {
        waiting: Array.from(this.sessions.values()).filter(s => s.state === 'waiting').length,
        scanned: Array.from(this.sessions.values()).filter(s => s.state === 'scanned').length,
        confirmed: Array.from(this.sessions.values()).filter(s => s.state === 'confirmed').length,
        expired: Array.from(this.sessions.values()).filter(s => s.state === 'expired').length,
      }
    };
  }
}

// 验证sceneId格式
export const validateSceneId = (sceneId: string): boolean => {
  try {
    const timestamp = parseInt(sceneId.split('-')[0]);
    const now = Date.now();
    const isValid = (now - timestamp) < 1800000; // 30分钟内有效
    return isValid && !isNaN(timestamp);
  } catch {
    return false;
  }
};

// 全局会话管理器实例
export const sessionManager = new SessionManager();