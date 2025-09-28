import jwt from "jsonwebtoken";
import type { DeviceInfo } from "./session";

// 模拟用户数据库
const mockUsers = [
  {
    id: "user1",
    username: "demo_user",
    email: "demo@example.com",
    name: "演示用户",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user",
  },
  {
    id: "user2",
    username: "test_user",
    email: "test@example.com",
    name: "测试用户",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=test_user",
  },
];

// 生成设备指纹
const generateDeviceFingerprint = async (): Promise<string> => {
  if (typeof window === "undefined") {
    return "server-side";
  }

  const components = [
    navigator.userAgent,
    navigator.platform,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency,
    (navigator as any).deviceMemory || "unknown",
  ].filter(Boolean);

  const fingerprint = components.join("|");

  // 在浏览器中使用简单的哈希
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprint);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// 获取平台信息
const getPlatformInfo = (): string => {
  if (typeof window === "undefined") return "Unknown";

  const userAgent = navigator.userAgent;
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "Unknown";
};

// 获取浏览器信息
const getBrowserInfo = (): string => {
  if (typeof window === "undefined") return "Unknown";

  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "Unknown";
};

// 简单的机器人检测
const detectBot = (): boolean => {
  if (typeof window === "undefined") return false;

  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /postman/i,
    /insomnia/i,
  ];

  return botPatterns.some((pattern) => pattern.test(navigator.userAgent));
};

// 收集设备信息
export const collectDeviceInfo = async (): Promise<DeviceInfo> => {
  const fingerprint = await generateDeviceFingerprint();

  return {
    id: fingerprint,
    name: `${getPlatformInfo()} - ${getBrowserInfo()}`,
    userAgent: typeof window !== "undefined" ? navigator.userAgent : "server",
    platform: typeof window !== "undefined" ? navigator.platform : "server",
    screenResolution:
      typeof window !== "undefined"
        ? `${screen.width}x${screen.height}`
        : "unknown",
    colorDepth: typeof window !== "undefined" ? screen.colorDepth : 24,
    timezone:
      typeof window !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "UTC",
    language: typeof window !== "undefined" ? navigator.language : "en",
    isMobile:
      typeof window !== "undefined"
        ? /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        : false,
    isBot: detectBot(),
  };
};

// 查找用户
export const findUser = (userId: string) => {
  return mockUsers.find((user) => user.id === userId);
};

// 查找用户 by username/email
export const findUserByCredentials = (username: string, password: string) => {
  // 在实际应用中，这里应该验证密码哈希
  const user = mockUsers.find(
    (u) => u.username === username || u.email === username,
  );
  return user && password === "password123" ? user : null;
};

// 生成安全的JWT token
export const generateAuthToken = (
  userId: string,
  deviceInfo: DeviceInfo,
): string => {
  const payload = {
    userId,
    deviceId: deviceInfo.id,
    iat: Math.floor(Date.now() / 1000), // 使用秒级时间戳
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7天过期
    jti: Math.random().toString(36).substr(2, 9), // JWT ID，防止重放
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "default-jwt-secret", {
    algorithm: "HS256",
  });
};

// 验证JWT token
export const verifyAuthToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "default-jwt-secret", {
      algorithms: ["HS256"],
      clockTolerance: 30, // 30秒时钟容差
    });
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// 获取当前用户信息（模拟）
export const getCurrentUser = async (token: string) => {
  try {
    const decoded = verifyAuthToken(token);
    const user = findUser(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      deviceId: decoded.deviceId,
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
