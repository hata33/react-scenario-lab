"use client";

import { AlertTriangle, ArrowLeft, CheckCircle, Database, Eye, Key, Lock, Shield } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "@/components/Layout";

interface SecurityExample {
	id: string;
	title: string;
	description: string;
	category: "Authentication" | "Authorization" | "Data Protection" | "API Security" | "CSRF" | "XSS";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	features: string[];
	security: {
		protection: string;
		complexity: string;
		standards: string;
	};
}

const securityExamples: SecurityExample[] = [
	{
		id: "nextauth-authentication",
		title: "NextAuth.js 认证系统",
		description: "使用 NextAuth.js 实现完整的用户认证和会话管理",
		category: "Authentication",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
});

// lib/auth.ts
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

export async function requireRole(role: string) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect('/unauthorized');
  }

  return session;
}

// app/dashboard/page.tsx
import { requireAuth } from '@/lib/auth';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
  const session = await requireAuth();

  return <DashboardContent user={session.user} />;
}

// app/admin/page.tsx
import { requireRole } from '@/lib/auth';
import AdminPanel from './AdminPanel';

export default async function AdminPage() {
  const session = await requireRole('admin');

  return <AdminPanel user={session.user} />;
}

// components/AuthButton.tsx
'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span>
          Welcome, {session.user?.name}
          {session.user?.role && (\` (\${session.user.role})\`)}
        </span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="space-x-4">
      <Link href="/auth/signin" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign In
      </Link>
      <Link href="/auth/signup" className="bg-green-500 text-white px-4 py-2 rounded">
        Sign Up
      </Link>
    </div>
  );
}

// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};`,
		benefits: ["多种登录方式", "会话管理", "安全存储", "类型安全"],
		features: ["OAuth 集成", "JWT 令牌", "会话持久化", "角色管理"],
		security: {
			protection: "企业级",
			complexity: "中等",
			standards: "OAuth 2.0",
		},
	},
	{
		id: "rbac-authorization",
		title: "基于角色的访问控制 (RBAC)",
		description: "实现细粒度的权限控制系统",
		category: "Authorization",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// lib/permissions.ts
export enum Permission {
  // 用户权限
  READ_PROFILE = 'read:profile',
  UPDATE_PROFILE = 'update:profile',

  // 文章权限
  READ_ARTICLES = 'read:articles',
  CREATE_ARTICLE = 'create:article',
  UPDATE_ARTICLE = 'update:article',
  DELETE_ARTICLE = 'delete:article',
  PUBLISH_ARTICLE = 'publish:article',

  // 管理员权限
  MANAGE_USERS = 'manage:users',
  MANAGE_ROLES = 'manage:roles',
  VIEW_ANALYTICS = 'view:analytics',

  // 系统权限
  ACCESS_ADMIN = 'access:admin',
  MANAGE_SYSTEM = 'manage:system'
}

export enum Role {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.USER]: [
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_ARTICLES
  ],
  [Role.EDITOR]: [
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_ARTICLES,
    Permission.CREATE_ARTICLE,
    Permission.UPDATE_ARTICLE,
    Permission.DELETE_ARTICLE
  ],
  [Role.ADMIN]: [
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_ARTICLES,
    Permission.CREATE_ARTICLE,
    Permission.UPDATE_ARTICLE,
    Permission.DELETE_ARTICLE,
    Permission.PUBLISH_ARTICLE,
    Permission.MANAGE_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.ACCESS_ADMIN
  ],
  [Role.SUPER_ADMIN]: Object.values(Permission)
};

// lib/rbac.ts
import { Permission, Role, ROLE_PERMISSIONS } from './permissions';

export class RBAC {
  private static instance: RBAC;
  private userRoles: Map<string, Role[]> = new Map();
  private rolePermissions: Map<Role, Permission[]> = new Map();

  static getInstance(): RBAC {
    if (!RBAC.instance) {
      RBAC.instance = new RBAC();
      RBAC.instance.initializeRoles();
    }
    return RBAC.instance;
  }

  private initializeRoles() {
    Object.entries(ROLE_PERMISSIONS).forEach(([role, permissions]) => {
      this.rolePermissions.set(role as Role, permissions);
    });
  }

  assignRole(userId: string, role: Role) {
    const roles = this.userRoles.get(userId) || [];
    if (!roles.includes(role)) {
      roles.push(role);
      this.userRoles.set(userId, roles);
    }
  }

  removeRole(userId: string, role: Role) {
    const roles = this.userRoles.get(userId) || [];
    const index = roles.indexOf(role);
    if (index > -1) {
      roles.splice(index, 1);
      this.userRoles.set(userId, roles);
    }
  }

  getUserRoles(userId: string): Role[] {
    return this.userRoles.get(userId) || [];
  }

  getUserPermissions(userId: string): Permission[] {
    const roles = this.getUserRoles(userId);
    const permissions = new Set<Permission>();

    roles.forEach(role => {
      const rolePerms = this.rolePermissions.get(role) || [];
      rolePerms.forEach(perm => permissions.add(perm));
    });

    return Array.from(permissions);
  }

  hasPermission(userId: string, permission: Permission): boolean {
    const userPermissions = this.getUserPermissions(userId);
    return userPermissions.includes(permission);
  }

  hasAnyPermission(userId: string, permissions: Permission[]): boolean {
    const userPermissions = this.getUserPermissions(userId);
    return permissions.some(perm => userPermissions.includes(perm));
  }

  hasAllPermissions(userId: string, permissions: Permission[]): boolean {
    const userPermissions = this.getUserPermissions(userId);
    return permissions.every(perm => userPermissions.includes(perm));
  }

  hasRole(userId: string, role: Role): boolean {
    const roles = this.getUserRoles(userId);
    return roles.includes(role);
  }

  hasAnyRole(userId: string, roles: Role[]): boolean {
    const userRoles = this.getUserRoles(userId);
    return roles.some(role => userRoles.includes(role));
  }
}

// hooks/usePermissions.ts
import { useSession } from 'next-auth/react';
import { Permission } from '@/lib/permissions';
import { RBAC } from '@/lib/rbac';

export function usePermissions() {
  const { data: session } = useSession();
  const rbac = RBAC.getInstance();

  const userId = session?.user?.id;
  const userPermissions = userId ? rbac.getUserPermissions(userId) : [];

  const hasPermission = (permission: Permission) => {
    if (!userId) return false;
    return rbac.hasPermission(userId, permission);
  };

  const hasAnyPermission = (permissions: Permission[]) => {
    if (!userId) return false;
    return rbac.hasAnyPermission(userId, permissions);
  };

  const hasAllPermissions = (permissions: Permission[]) => {
    if (!userId) return false;
    return rbac.hasAllPermissions(userId, permissions);
  };

  const hasRole = (role: string) => {
    if (!userId) return false;
    return rbac.hasRole(userId, role as any);
  };

  return {
    permissions: userPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole
  };
}

// components/ProtectedComponent.tsx
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/lib/permissions';

interface ProtectedComponentProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  role?: string;
  roles?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function ProtectedComponent({
  permission,
  permissions = [],
  requireAll = false,
  role,
  roles = [],
  fallback = <div>Access Denied</div>,
  children
}: ProtectedComponentProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, hasRole } = usePermissions();

  // 检查单个权限
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // 检查多个权限
  if (permissions.length > 0) {
    const hasPerms = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);

    if (!hasPerms) {
      return <>{fallback}</>;
    }
  }

  // 检查单个角色
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  // 检查多个角色
  if (roles.length > 0) {
    const hasAnyRole = roles.some(r => hasRole(r));
    if (!hasAnyRole) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// 使用示例
function ArticleEditor({ articleId }: { articleId: string }) {
  const { hasPermission } = usePermissions();

  return (
    <div>
      <h1>Article Editor</h1>

      {/* 只有编辑者和管理员可以创建文章 */}
      <ProtectedComponent
        permissions={[Permission.CREATE_ARTICLE, Permission.MANAGE_SYSTEM]}
      >
        <button>Create New Article</button>
      </ProtectedComponent>

      {/* 只有管理员可以管理用户 */}
      <ProtectedComponent permission={Permission.MANAGE_USERS}>
        <button>Manage Users</button>
      </ProtectedComponent>

      {/* 只有管理员和超级管理员可以访问系统设置 */}
      <ProtectedComponent roles={['admin', 'super_admin']}>
        <button>System Settings</button>
      </ProtectedComponent>
    </div>
  );
}

// 服务端权限检查
// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { RBAC } from '@/lib/rbac';
import { Permission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rbac = RBAC.getInstance();

  if (!rbac.hasPermission(session.user.id, Permission.READ_ARTICLES)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 获取文章列表
  const articles = await getArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rbac = RBAC.getInstance();

  if (!rbac.hasPermission(session.user.id, Permission.CREATE_ARTICLE)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const article = await createArticle(body);

  return NextResponse.json({ article }, { status: 201 });
}`,
		benefits: ["细粒度控制", "角色管理", "权限继承", "安全审核"],
		features: ["动态权限", "角色继承", "权限缓存", "审计日志"],
		security: {
			protection: "企业级",
			complexity: "高",
			standards: "NIST",
		},
	},
	{
		id: "csrf-protection",
		title: "CSRF 跨站请求伪造防护",
		description: "实现完整的 CSRF 防护机制",
		category: "CSRF",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// lib/csrf.ts
import crypto from 'crypto';

export class CSRFProtection {
  private static instance: CSRFProtection;
  private tokens: Map<string, { token: string; expires: number }> = new Map();
  private readonly TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

  static getInstance(): CSRFProtection {
    if (!CSRFProtection.instance) {
      CSRFProtection.instance = new CSRFProtection();
    }
    return CSRFProtection.instance;
  }

  generateToken(sessionId: string): string {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + this.TOKEN_EXPIRY;

    this.tokens.set(sessionId, { token, expires });
    return token;
  }

  validateToken(sessionId: string, providedToken: string): boolean {
    const storedData = this.tokens.get(sessionId);

    if (!storedData) {
      return false;
    }

    // 检查是否过期
    if (Date.now() > storedData.expires) {
      this.tokens.delete(sessionId);
      return false;
    }

    // 使用时间安全比较
    return crypto.timingSafeEqual(
      Buffer.from(storedData.token),
      Buffer.from(providedToken)
    );
  }

  // 清理过期令牌
  cleanupExpiredTokens() {
    const now = Date.now();
    for (const [sessionId, data] of this.tokens.entries()) {
      if (now > data.expires) {
        this.tokens.delete(sessionId);
      }
    }
  }
}

// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { CSRFProtection } from '@/lib/csrf';

const csrf = CSRFProtection.getInstance();

// 需要 CSRF 保护的 HTTP 方法
const PROTECTED_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

// 不需要 CSRF 保护的路径
const EXEMPT_PATHS = [
  '/api/auth',
  '/api/webhook',
  '/api/external'
];

export function middleware(request: NextRequest) {
  const { pathname, method } = request;

  // 检查是否需要 CSRF 保护
  if (
    !PROTECTED_METHODS.includes(method) ||
    EXEMPT_PATHS.some(path => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // 从 cookie 获取会话 ID
  const sessionId = request.cookies.get('sessionId')?.value;

  if (!sessionId) {
    return NextResponse.json(
      { error: 'No session found' },
      { status: 401 }
    );
  }

  // 获取 CSRF 令牌
  const csrfToken = request.headers.get('x-csrf-token') ||
                   request.body?.get('csrfToken');

  if (!csrfToken) {
    return NextResponse.json(
      { error: 'CSRF token missing' },
      { status: 403 }
    );
  }

  // 验证 CSRF 令牌
  if (!csrf.validateToken(sessionId, csrfToken)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// app/api/csrf-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CSRFProtection } from '@/lib/csrf';

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value;

  if (!sessionId) {
    return NextResponse.json(
      { error: 'No session found' },
      { status: 401 }
    );
  }

  const csrf = CSRFProtection.getInstance();
  const token = csrf.generateToken(sessionId);

  // 设置 CSRF 令牌 cookie
  const response = NextResponse.json({ csrfToken: token });
  response.cookies.set('csrfToken', token, {
    httpOnly: false, // JavaScript 需要读取
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 // 1 hour
  });

  return response;
}

// hooks/useCSRF.ts
import { useEffect, useState } from 'react';

export function useCSRF() {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // 从 cookie 获取 CSRF 令牌
    const getCookie = (name: string) => {
      const value = \`; \${document.cookie}\`;
      const parts = value.split(\`; \${name}=\`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const token = getCookie('csrfToken');
    if (token) {
      setCsrfToken(token);
    } else {
      // 如果没有令牌，请求新的
      fetch('/api/csrf-token')
        .then(res => res.json())
        .then(data => setCsrfToken(data.csrfToken))
        .catch(console.error);
    }
  }, []);

  const fetchWithCSRF = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    };

    return fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });
  };

  return { csrfToken, fetchWithCSRF };
}

// components/CSRFProtectedForm.tsx
'use client';
import { useState } from 'react';
import { useCSRF } from '@/hooks/useCSRF';

interface CSRFProtectedFormProps {
  action: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  children: React.ReactNode;
  onSubmit?: (data: FormData) => Promise<void>;
}

export default function CSRFProtectedForm({
  action,
  method,
  children,
  onSubmit
}: CSRFProtectedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { csrfToken, fetchWithCSRF } = useCSRF();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // 添加 CSRF 令牌
      formData.append('csrfToken', csrfToken);

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        const response = await fetchWithCSRF(action, {
          method,
          body: formData
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 隐藏的 CSRF 令牌字段 */}
      <input
        type="hidden"
        name="csrfToken"
        value={csrfToken}
      />

      {children}

      <button
        type="submit"
        disabled={isSubmitting || !csrfToken}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

// 使用示例
function UserProfileForm() {
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      email: formData.get('email')
    };

    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  };

  return (
    <CSRFProtectedForm
      action="/api/user/profile"
      method="PUT"
      onSubmit={handleSubmit}
    >
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
    </CSRFProtectedForm>
  );
}`,
		benefits: ["防止 CSRF 攻击", "时间安全比较", "令牌过期管理", "自动清理"],
		features: ["令牌生成", "令牌验证", "中间件保护", "客户端集成"],
		security: {
			protection: "高级",
			complexity: "中等",
			standards: "OWASP",
		},
	},
	{
		id: "xss-prevention",
		title: "XSS 跨站脚本防护",
		description: "全面的 XSS 攻击防护和输入验证",
		category: "XSS",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// lib/xss-protection.ts
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// 创建 DOMPurify 实例（服务端）
const window = new JSDOM('').window;
const purify = DOMPurify(window);

export class XSSProtection {
  // 清理 HTML 内容
  static sanitizeHTML(dirty: string): string {
    return purify.sanitize(dirty, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'i', 'b',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
        'a', 'img'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
      ALLOW_DATA_ATTR: false
    });
  }

  // 验证和清理用户输入
  static sanitizeInput(input: string, type: 'text' | 'email' | 'url' | 'html' = 'text'): string {
    if (!input) return '';

    // 基础清理
    let cleaned = input.trim();

    switch (type) {
      case 'text':
        // 只允许文本字符，移除所有 HTML 标签
        cleaned = cleaned.replace(/<[^>]*>/g, '');
        break;

      case 'email':
        // 邮箱格式验证
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(cleaned)) {
          throw new Error('Invalid email format');
        }
        break;

      case 'url':
        // URL 格式验证
        try {
          new URL(cleaned);
        } catch {
          throw new Error('Invalid URL format');
        }
        break;

      case 'html':
        // 使用 DOMPurify 清理 HTML
        cleaned = this.sanitizeHTML(cleaned);
        break;
    }

    return cleaned;
  }

  // 转义特殊字符
  static escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 验证 JSON 内容
  static sanitizeJSON(jsonString: string): any {
    try {
      const parsed = JSON.parse(jsonString);

      // 递归清理对象中的字符串值
      const sanitizeObject = (obj: any): any => {
        if (typeof obj === 'string') {
          return this.escapeHtml(obj);
        }

        if (Array.isArray(obj)) {
          return obj.map(sanitizeObject);
        }

        if (obj && typeof obj === 'object') {
          const sanitized: any = {};
          for (const [key, value] of Object.entries(obj)) {
            sanitized[key] = sanitizeObject(value);
          }
          return sanitized;
        }

        return obj;
      };

      return sanitizeObject(parsed);
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }
}

// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { XSSProtection } from '@/lib/xss-protection';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // 检查查询参数中的 XSS
  for (const [key, value] of url.searchParams) {
    if (typeof value === 'string') {
      const sanitized = XSSProtection.escapeHtml(value);
      if (sanitized !== value) {
        // 检测到潜在的 XSS，重定向到安全版本
        url.searchParams.set(key, sanitized);
        return NextResponse.redirect(url);
      }
    }
  }

  // 设置安全头
  const response = NextResponse.next();

  // XSS 保护
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 内容类型选项
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 内容安全策略
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'"
  );

  return response;
}

// components/SafeHTML.tsx
import React from 'react';
import { XSSProtection } from '@/lib/xss-protection';

interface SafeHTMLProps {
  html: string;
  className?: string;
}

export default function SafeHTML({ html, className }: SafeHTMLProps) {
  const sanitizedHTML = XSSProtection.sanitizeHTML(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { XSSProtection } from '@/lib/xss-protection';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证和清理输入
    const sanitizedComment = {
      content: XSSProtection.sanitizeInput(body.content, 'html'),
      author: XSSProtection.sanitizeInput(body.author, 'text'),
      email: XSSProtection.sanitizeInput(body.email, 'email'),
      website: body.website ? XSSProtection.sanitizeInput(body.website, 'url') : null
    };

    // 保存到数据库
    const comment = await saveComment(sanitizedComment);

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid input data' },
      { status: 400 }
    );
  }
}

// 使用示例
function CommentForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content,
          author: 'John Doe',
          email: 'john@example.com'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}

// 显示用户生成的内容
function Comment({ comment }: { comment: any }) {
  return (
    <div className="border rounded p-4 mb-4">
      <div className="font-semibold">{comment.author}</div>
      <SafeHTML
        html={comment.content}
        className="mt-2 prose prose-sm max-w-none"
      />
    </div>
  );
}`,
		benefits: ["防止 XSS 攻击", "HTML 内容清理", "输入验证", "安全头设置"],
		features: ["DOMPurify 集成", "多种输入类型", "CSP 头设置", "实时防护"],
		security: {
			protection: "高级",
			complexity: "中等",
			standards: "OWASP",
		},
	},
	{
		id: "api-rate-limiting",
		title: "API 速率限制",
		description: "防止 API 滥用和 DDoS 攻击的速率限制",
		category: "API Security",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// lib/rate-limiter.ts
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // 时间窗口（毫秒）
  max: number;     // 最大请求数
  message?: string; // 错误消息
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
  error?: {
    message: string;
    retryAfter: number;
  };
}

export class RateLimiter {
  private static instance: RateLimiter;
  private requests: Map<string, { count: number; resetTime: number }> = new Map();

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  checkLimit(
    identifier: string,
    config: RateLimitConfig
  ): RateLimitResult {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // 清理过期记录
    this.cleanupExpired();

    const record = this.requests.get(identifier);
    let count = 0;
    let resetTime = now + config.windowMs;

    if (record) {
      if (now > record.resetTime) {
        // 时间窗口已过期，重置计数
        count = 1;
        resetTime = now + config.windowMs;
        this.requests.set(identifier, { count, resetTime });
      } else {
        // 在时间窗口内
        count = record.count + 1;

        if (count > config.max) {
          // 超出限制
          return {
            success: false,
            limit: config.max,
            remaining: 0,
            resetTime: new Date(resetTime),
            error: {
              message: config.message || 'Too many requests',
              retryAfter: Math.ceil((resetTime - now) / 1000)
            }
          };
        }

        this.requests.set(identifier, { count, resetTime });
      }
    } else {
      // 新记录
      count = 1;
      this.requests.set(identifier, { count, resetTime });
    }

    return {
      success: true,
      limit: config.max,
      remaining: Math.max(0, config.max - count),
      resetTime: new Date(resetTime)
    };
  }

  private cleanupExpired() {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// 不同类型的速率限制配置
export const RATE_LIMITS = {
  // 通用 API 限制
  API: {
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100,                // 最多 100 个请求
    message: 'Too many API requests, please try again later'
  },

  // 认证相关限制（更严格）
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 5,                   // 最多 5 次登录尝试
    message: 'Too many authentication attempts, please try again later'
  },

  // 注册限制
  REGISTER: {
    windowMs: 60 * 60 * 1000, // 1 小时
    max: 3,                   // 最多 3 次注册
    message: 'Too many registration attempts, please try again later'
  },

  // 文件上传限制
  UPLOAD: {
    windowMs: 60 * 60 * 1000, // 1 小时
    max: 10,                  // 最多 10 个文件
    message: 'Upload limit exceeded, please try again later'
  }
};

// 中间件函数
export function createRateLimitMiddleware(config: RateLimitConfig) {
  const rateLimiter = RateLimiter.getInstance();

  return async (request: NextRequest) => {
    // 获取客户端标识符
    const identifier = getClientIdentifier(request);

    // 检查速率限制
    const result = rateLimiter.checkLimit(identifier, config);

    if (!result.success) {
      return {
        success: false,
        response: new Response(
          JSON.stringify({
            error: result.error?.message,
            retryAfter: result.error?.retryAfter
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': result.limit.toString(),
              'X-RateLimit-Remaining': result.remaining.toString(),
              'X-RateLimit-Reset': result.resetTime.toISOString(),
              'Retry-After': result.error?.retryAfter.toString() || '60'
            }
          }
        )
      };
    }

    return {
      success: true,
      headers: {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.resetTime.toISOString()
      }
    };
  };
}

// 获取客户端标识符
function getClientIdentifier(request: NextRequest): string {
  // 优先使用用户 ID（如果已认证）
  const userId = request.headers.get('x-user-id');
  if (userId) {
    return \`user:\${userId}\`;
  }

  // 使用 IP 地址
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

  return \`ip:\${ip}\`;
}

// app/api/auth/login/route.ts
import { NextRequest } from 'next/server';
import { createRateLimitMiddleware, RATE_LIMITS } from '@/lib/rate-limiter';

const rateLimitMiddleware = createRateLimitMiddleware(RATE_LIMITS.AUTH);

export async function POST(request: NextRequest) {
  // 应用速率限制
  const rateLimitResult = await rateLimitMiddleware(request);

  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  try {
    const { email, password } = await request.json();

    // 验证凭据
    const user = await authenticateUser(email, password);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // 生成会话
    const session = await createSession(user);

    const response = new Response(
      JSON.stringify({ user, session }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...rateLimitResult.headers
        }
      }
    );

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}

// app/api/upload/route.ts
import { NextRequest } from 'next/server';
import { createRateLimitMiddleware, RATE_LIMITS } from '@/lib/rate-limiter';

const uploadRateLimit = createRateLimitMiddleware(RATE_LIMITS.UPLOAD);

export async function POST(request: NextRequest) {
  // 应用上传速率限制
  const rateLimitResult = await uploadRateLimit(request);

  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400 }
      );
    }

    // 文件大小和类型检查
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({ error: 'File too large' }),
        { status: 400 }
      );
    }

    // 处理文件上传
    const result = await handleFileUpload(file);

    const response = new Response(
      JSON.stringify({ success: true, url: result.url }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...rateLimitResult.headers
        }
      }
    );

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Upload failed' }),
      { status: 500 }
    );
  }
}

// 客户端速率限制感知
// hooks/useRateLimit.ts
import { useState, useCallback } from 'react';

interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: string;
  retryAfter?: number;
}

export function useRateLimit() {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);

  const apiCall = useCallback(async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, options);

      // 检查速率限制头
      const limit = response.headers.get('x-ratelimit-limit');
      const remaining = response.headers.get('x-ratelimit-remaining');
      const resetTime = response.headers.get('x-ratelimit-reset');
      const retryAfter = response.headers.get('retry-after');

      if (limit || remaining || resetTime) {
        setRateLimitInfo({
          limit: parseInt(limit || '0'),
          remaining: parseInt(remaining || '0'),
          resetTime: resetTime || '',
          retryAfter: retryAfter ? parseInt(retryAfter) : undefined
        });
      }

      if (response.status === 429) {
        const error = await response.json();
        throw new Error(error.error || 'Rate limit exceeded');
      }

      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const isRateLimited = rateLimitInfo?.remaining === 0;
  const canRetry = rateLimitInfo?.retryAfter
    ? new Date(rateLimitInfo.resetTime) <= new Date()
    : true;

  return {
    rateLimitInfo,
    isRateLimited,
    canRetry,
    apiCall
  };
}`,
		benefits: ["防止 API 滥用", "DDoS 防护", "灵活配置", "实时监控"],
		features: ["多种限制策略", "客户端感知", "自动清理", "统计报告"],
		security: {
			protection: "高级",
			complexity: "中等",
			standards: "NIST",
		},
	},
	{
		id: "data-encryption",
		title: "数据加密保护",
		description: "敏感数据的加密存储和传输",
		category: "Data Protection",
		difficulty: "高级",
		status: "planned",
		codeSnippet: `// lib/encryption.ts
import crypto from 'crypto';

export class DataEncryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;

  // 生成加密密钥
  static generateKey(): string {
    return crypto.randomBytes(this.KEY_LENGTH).toString('hex');
  }

  // 加密数据
  static encrypt(text: string, keyHex: string): string {
    const key = Buffer.from(keyHex, 'hex');
    const iv = crypto.randomBytes(this.IV_LENGTH);

    const cipher = crypto.createCipher(this.ALGORITHM, key);
    cipher.setAAD(Buffer.from('additional-data'));

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag();

    // 组合 iv + tag + encrypted
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
  }

  // 解密数据
  static decrypt(encryptedData: string, keyHex: string): string {
    const key = Buffer.from(keyHex, 'hex');
    const parts = encryptedData.split(':');

    const iv = Buffer.from(parts[0], 'hex');
    const tag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const decipher = crypto.createDecipher(this.ALGORITHM, key);
    decipher.setAuthTag(tag);
    decipher.setAAD(Buffer.from('additional-data'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}`,
		benefits: ["端到端加密", "密钥管理", "安全传输", "合规支持"],
		features: ["AES 加密", "密钥轮换", "数据脱敏", "访问控制"],
		security: {
			protection: "最高级",
			complexity: "高",
			standards: "ISO 27001",
		},
	},
];

export default function SecurityFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<SecurityExample | null>(null);

	const getCategoryColor = (category: SecurityExample["category"]) => {
		switch (category) {
			case "Authentication":
				return "text-blue-600 bg-blue-100";
			case "Authorization":
				return "text-green-600 bg-green-100";
			case "Data Protection":
				return "text-purple-600 bg-purple-100";
			case "API Security":
				return "text-orange-600 bg-orange-100";
			case "CSRF":
				return "text-red-600 bg-red-100";
			case "XSS":
				return "text-cyan-600 bg-cyan-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: SecurityExample["difficulty"]) => {
		switch (difficulty) {
			case "初级":
				return "text-green-600 bg-green-100";
			case "中级":
				return "text-yellow-600 bg-yellow-100";
			case "高级":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusColor = (status: SecurityExample["status"]) => {
		switch (status) {
			case "completed":
				return "text-green-600 bg-green-100";
			case "in-progress":
				return "text-blue-600 bg-blue-100";
			case "planned":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusText = (status: SecurityExample["status"]) => {
		switch (status) {
			case "completed":
				return "已完成";
			case "in-progress":
				return "进行中";
			case "planned":
				return "计划中";
			default:
				return "未知";
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
							>
								<ArrowLeft className="mr-2 h-5 w-5" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<Shield className="h-8 w-8 text-red-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">安全性特性</h1>
									<p className="text-gray-600">Next.js 完整安全解决方案：认证、授权、数据保护、API 安全</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 安全方案对比 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">安全方案对比</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Key className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="mb-2 font-semibold text-blue-900">认证</h3>
								<p className="text-blue-700 text-sm">身份验证</p>
								<div className="mt-2 text-blue-600 text-xs">
									<div>🔐 多因素认证</div>
									<div>🌐 OAuth 集成</div>
									<div>🔑 会话管理</div>
								</div>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Lock className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="mb-2 font-semibold text-green-900">授权</h3>
								<p className="text-green-700 text-sm">权限控制</p>
								<div className="mt-2 text-green-600 text-xs">
									<div>👥 RBAC 角色</div>
									<div>🛡️ 细粒度权限</div>
									<div>📋 权限审计</div>
								</div>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Database className="h-6 w-6 text-purple-600" />
								</div>
								<h3 className="mb-2 font-semibold text-purple-900">数据保护</h3>
								<p className="text-purple-700 text-sm">加密存储</p>
								<div className="mt-2 text-purple-600 text-xs">
									<div>🔒 端到端加密</div>
									<div>🗝️ 密钥管理</div>
									<div>📄 数据脱敏</div>
								</div>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Shield className="h-6 w-6 text-orange-600" />
								</div>
								<h3 className="mb-2 font-semibold text-orange-900">API 安全</h3>
								<p className="text-orange-700 text-sm">接口保护</p>
								<div className="mt-2 text-orange-600 text-xs">
									<div>🚦 速率限制</div>
									<div>🔐 API 认证</div>
									<div>📊 监控审计</div>
								</div>
							</div>
							<div className="rounded-lg bg-red-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<AlertTriangle className="h-6 w-6 text-red-600" />
								</div>
								<h3 className="mb-2 font-semibold text-red-900">CSRF</h3>
								<p className="text-red-700 text-sm">跨站防护</p>
								<div className="mt-2 text-red-600 text-xs">
									<div>🎯 令牌验证</div>
									<div>⏰ 时间安全</div>
									<div>🔍 自动检测</div>
								</div>
							</div>
							<div className="rounded-lg bg-cyan-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Eye className="h-6 w-6 text-cyan-600" />
								</div>
								<h3 className="mb-2 font-semibold text-cyan-900">XSS</h3>
								<p className="text-cyan-700 text-sm">脚本防护</p>
								<div className="mt-2 text-cyan-600 text-xs">
									<div>🧹 内容清理</div>
									<div>🔒 输入验证</div>
									<div>🛡️ CSP 头</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 安全示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">实现示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{securityExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-red-500" : ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="mb-3 flex items-start justify-between">
											<div>
												<h3 className="mb-1 font-semibold text-gray-900 text-lg">{example.title}</h3>
												<div className="mb-2 flex items-center space-x-2">
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getCategoryColor(example.category)}`}
													>
														{example.category}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getDifficultyColor(
															example.difficulty,
														)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getStatusColor(example.status)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{example.description}</p>
										<div className="flex items-center justify-between text-gray-500 text-sm">
											<div className="flex space-x-4">
												<span>🛡️ {example.security.protection}</span>
												<span>⚙️ {example.security.complexity}</span>
											</div>
											<span>📋 {example.security.standards}</span>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* 右侧：示例详情 */}
						<div className="lg:sticky lg:top-6">
							{selectedExample ? (
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-6">
										<div className="mb-4 flex items-center justify-between">
											<h3 className="font-semibold text-gray-900 text-xl">{selectedExample.title}</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-sm ${getCategoryColor(
														selectedExample.category,
													)}`}
												>
													{selectedExample.category}
												</span>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{selectedExample.description}</p>
										<div className="grid grid-cols-3 gap-4 text-sm">
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">保护级别</div>
												<div className="text-gray-600">{selectedExample.security.protection}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">复杂度</div>
												<div className="text-gray-600">{selectedExample.security.complexity}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">合规标准</div>
												<div className="text-gray-600">{selectedExample.security.standards}</div>
											</div>
										</div>
									</div>

									<div className="p-6">
										<h4 className="mb-3 font-semibold text-gray-900">代码示例</h4>
										<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6">
											<h5 className="mb-2 font-medium text-gray-900">主要优势</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>

										<div className="mt-4">
											<h5 className="mb-2 font-medium text-gray-900">核心功能</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.features.map((feature, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
													>
														{feature}
													</span>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="border-green-200 border-t bg-green-50 p-6">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="h-5 w-5" />
												<span className="font-medium">该安全方案已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<Shield className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个安全方案</h3>
									<p className="text-gray-600">点击左侧的安全方案查看详细信息和代码示例</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
