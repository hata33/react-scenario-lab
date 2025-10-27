// 移动端模块类型定义

// 响应式设计相关类型
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
export type DemoType = "grid" | "navigation" | "touch" | "typography";

export interface DemoConfig {
	title: string;
	description: string;
	component: React.ReactNode;
}

// 设备API相关类型
export interface Location {
	lat: number;
	lng: number;
}

export interface DeviceOrientation {
	alpha: number;
	beta: number;
	gamma: number;
}

export type PermissionName = "geolocation" | "camera" | "microphone";
export type PermissionStatusMap = Record<PermissionName, PermissionState>;
export type VibrationPattern = number | number[];

// PWA相关类型
export type CacheStatusMessage = string;
export type NotificationPermissionStatus = NotificationPermission;

export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

// 通用组件Props类型
export interface ErrorToastProps {
	message: string;
	onClose: () => void;
}

export interface StatusIndicatorProps {
	status: "online" | "offline" | "loading" | "error";
	label: string;
}

// 功能模块配置类型
export interface MobileFeatureConfig {
	path: string;
	title: string;
	description: string;
	icon: string;
	enabled: boolean;
}

// 设备能力检测类型
export interface DeviceCapabilities {
	vibrate: boolean;
	geolocation: boolean;
	camera: boolean;
	deviceOrientation: boolean;
	serviceWorker: boolean;
	notifications: boolean;
}

// 性能监控类型
export interface PerformanceMetrics {
	timestamp: number;
	memoryUsage?: number;
	networkType?: string;
	batteryLevel?: number;
	connectionSpeed?: string;
}

// 用户交互类型
export interface TouchGesture {
	type: "tap" | "swipe" | "pinch" | "rotate";
	startX: number;
	startY: number;
	endX?: number;
	endY?: number;
	duration: number;
}

// 缓存策略类型
export type CacheStrategy = "cache-first" | "network-first" | "stale-while-revalidate" | "cache-only";

export interface CacheConfig {
	strategy: CacheStrategy;
	maxAge: number; // 缓存最大年龄（毫秒）
	maxSize: number; // 最大缓存条目数
	excludePatterns?: string[]; // 排除的URL模式
}
