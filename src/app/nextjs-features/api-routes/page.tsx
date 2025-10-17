"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import {
	Code,
	Shield,
	FileText,
	Upload,
	Database,
	CheckCircle,
	ArrowLeft,
	Copy,
	Download,
	Play,
	AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface APIExample {
	id: string;
	title: string;
	description: string;
	category: "RESTful" | "Middleware" | "Auth" | "File" | "Error" | "Versioning";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	httpMethods: string[];
	responseExample?: string;
}

const apiExamples: APIExample[] = [
	{
		id: "restful-api",
		title: "RESTful API 设计",
		description: "构建符合 REST 规范的 API 端点",
		category: "RESTful",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users - 获取用户列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  try {
    const users = await getUsers(page, limit);
    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: users.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取用户列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证请求数据
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: '姓名和邮箱不能为空' },
        { status: 400 }
      );
    }

    const user = await createUser(body);
    return NextResponse.json({
      success: true,
      data: user
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '创建用户失败' },
      { status: 500 }
    );
  }
}`,
		benefits: ["标准化接口", "易于理解", "可扩展性强", "工具支持丰富"],
		httpMethods: ["GET", "POST", "PUT", "DELETE"],
		responseExample: `{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}`,
	},
	{
		id: "middleware",
		title: "中间件实现",
		description: "使用中间件处理请求拦截、日志记录和性能监控",
		category: "Middleware",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. 请求日志记录
  console.log(\`\${request.method} \${request.url}\`);

  // 2. CORS 处理
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 3. 认证检查
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: '未授权访问' },
      { status: 401 }
    );
  }

  // 4. 请求限流
  const clientIP = request.ip || request.headers.get('x-forwarded-for');
  if (isRateLimited(clientIP)) {
    return NextResponse.json(
      { error: '请求过于频繁' },
      { status: 429 }
    );
  }

  return response;
}

// 配置中间件运行路径
export const config = {
  matcher: '/api/:path*'
};`,
		benefits: ["请求拦截", "日志记录", "认证保护", "性能监控"],
		httpMethods: ["ALL"],
		responseExample: `{
  "timestamp": "2024-01-01T00:00:00Z",
  "method": "GET",
  "url": "/api/users",
  "status": 200
}`,
	},
	{
		id: "authentication",
		title: "身份验证和授权",
		description: "实现基于 JWT 的身份验证和 RBAC 授权系统",
		category: "Auth",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // 1. 验证用户凭据
    const user = await authenticateUser(username, password);
    if (!user) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 2. 生成 JWT Token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24小时
      },
      JWT_SECRET
    );

    // 3. 返回用户信息和 Token
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    );
  }
}

// 权限中间件
export function authorize(roles: string[]) {
  return function (request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      if (!roles.includes(decoded.role)) {
        return NextResponse.json(
          { error: '权限不足' },
          { status: 403 }
        );
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: '无效的 Token' },
        { status: 401 }
      );
    }
  };
}`,
		benefits: ["安全认证", "角色授权", "Token 管理", "权限控制"],
		httpMethods: ["POST", "GET"],
		responseExample: `{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "管理员",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`,
	},
	{
		id: "file-upload",
		title: "文件上传处理",
		description: "处理大文件上传、分片上传和文件验证",
		category: "File",
		difficulty: "高级",
		status: "completed",
		codeSnippet: `// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '没有上传文件' },
        { status: 400 }
      );
    }

    // 1. 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '不支持的文件类型' },
        { status: 400 }
      );
    }

    // 2. 验证文件大小 (最大 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小超过限制' },
        { status: 400 }
      );
    }

    // 3. 生成文件名
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const filename = \`\${timestamp}-\${randomId}-\${file.name}\`;
    const filepath = join(process.cwd(), 'uploads', filename);

    // 4. 确保目录存在
    await mkdir(join(process.cwd(), 'uploads'), { recursive: true });

    // 5. 保存文件
    await writeFile(filepath, buffer);

    // 6. 返回文件信息
    return NextResponse.json({
      success: true,
      data: {
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: \`/uploads/\${filename}\`
      }
    });
  } catch (error) {
    console.error('文件上传失败:', error);
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    );
  }
}`,
		benefits: ["安全上传", "文件验证", "分片支持", "类型检查"],
		httpMethods: ["POST"],
		responseExample: `{
  "success": true,
  "data": {
    "filename": "1704067200000-abc123-example.jpg",
    "originalName": "example.jpg",
    "size": 1024000,
    "type": "image/jpeg",
    "url": "/uploads/1704067200000-abc123-example.jpg"
  }
}`,
	},
	{
		id: "error-handling",
		title: "错误处理",
		description: "统一的错误处理机制和错误响应格式",
		category: "Error",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// utils/error-handler.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    console.error('服务器错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: '服务器内部错误',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: '未知错误',
      code: 'UNKNOWN_ERROR'
    },
    { status: 500 }
  );
}

// 使用示例
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id);

    if (!user) {
      throw new APIError(404, '用户不存在', 'USER_NOT_FOUND');
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    return handleAPIError(error);
  }
}`,
		benefits: ["统一错误格式", "错误分类", "调试信息", "用户体验"],
		httpMethods: ["ALL"],
		responseExample: `{
  "success": false,
  "error": "用户不存在",
  "code": "USER_NOT_FOUND"
}`,
	},
	{
		id: "api-versioning",
		title: "API 版本控制",
		description: "实现 API 版本控制和向后兼容性",
		category: "Versioning",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `// app/api/v1/users/route.ts
export async function GET(request: NextRequest) {
  // v1 版本的实现
  const users = await getUsersV1();
  return NextResponse.json({
    success: true,
    data: users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }))
  });
}

// app/api/v2/users/route.ts
export async function GET(request: NextRequest) {
  // v2 版本的实现 - 添加更多字段
  const users = await getUsersV2();
  return NextResponse.json({
    success: true,
    data: users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profile: {
        avatar: user.avatar,
        bio: user.bio
      },
      metadata: {
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }))
  });
}

// 版本协商中间件
export function negotiateVersion(request: NextRequest) {
  const acceptHeader = request.headers.get('Accept');
  const version = request.headers.get('API-Version');
  const pathVersion = request.nextUrl.pathname.split('/')[3];

  // 优先级: 路径 > Header > Accept > 默认 v1
  const targetVersion = pathVersion || version ||
    (acceptHeader?.includes('application/vnd.api.v2+json') ? 'v2' : 'v1');

  return NextResponse.next({
    headers: {
      'API-Version': targetVersion
    }
  });
}`,
		benefits: ["向后兼容", "平滑升级", "多版本共存", "客户端选择"],
		httpMethods: ["GET", "POST"],
		responseExample: `{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com",
    "profile": {
      "avatar": "https://example.com/avatar.jpg",
      "bio": "前端开发工程师"
    }
  },
  "version": "v2"
}`,
	},
];

export default function APIRoutesPage() {
	const [selectedExample, setSelectedExample] = useState<APIExample | null>(
		null,
	);
	const [copiedCode, setCopiedCode] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedCode(true);
			setTimeout(() => setCopiedCode(false), 2000);
		} catch (error) {
			console.error("复制失败:", error);
		}
	};

	const getCategoryColor = (category: APIExample["category"]) => {
		switch (category) {
			case "RESTful":
				return "text-blue-600 bg-blue-100";
			case "Middleware":
				return "text-green-600 bg-green-100";
			case "Auth":
				return "text-purple-600 bg-purple-100";
			case "File":
				return "text-orange-600 bg-orange-100";
			case "Error":
				return "text-red-600 bg-red-100";
			case "Versioning":
				return "text-indigo-600 bg-indigo-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: APIExample["difficulty"]) => {
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

	const getStatusColor = (status: APIExample["status"]) => {
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

	const getStatusText = (status: APIExample["status"]) => {
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
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<Code className="w-8 h-8 text-blue-600" />
								<div>
									<h1 className="text-3xl font-bold text-gray-900">
										API 路由特性
									</h1>
									<p className="text-gray-600">
										Next.js 全栈 API 开发：RESTful、中间件、认证、文件处理
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* API 架构概览 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							API 路由架构
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-6 gap-4">
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
								<h3 className="font-semibold text-blue-900 mb-1">RESTful</h3>
								<p className="text-sm text-blue-700">标准化接口</p>
							</div>
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
								<h3 className="font-semibold text-green-900 mb-1">认证</h3>
								<p className="text-sm text-green-700">JWT 授权</p>
							</div>
							<div className="text-center p-4 bg-purple-50 rounded-lg">
								<FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
								<h3 className="font-semibold text-purple-900 mb-1">中间件</h3>
								<p className="text-sm text-purple-700">请求处理</p>
							</div>
							<div className="text-center p-4 bg-orange-50 rounded-lg">
								<Upload className="w-6 h-6 text-orange-600 mx-auto mb-2" />
								<h3 className="font-semibold text-orange-900 mb-1">文件处理</h3>
								<p className="text-sm text-orange-700">上传下载</p>
							</div>
							<div className="text-center p-4 bg-red-50 rounded-lg">
								<AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
								<h3 className="font-semibold text-red-900 mb-1">错误处理</h3>
								<p className="text-sm text-red-700">统一格式</p>
							</div>
							<div className="text-center p-4 bg-indigo-50 rounded-lg">
								<Code className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
								<h3 className="font-semibold text-indigo-900 mb-1">版本控制</h3>
								<p className="text-sm text-indigo-700">兼容性</p>
							</div>
						</div>
					</div>
				</div>

				{/* API 示例 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">实现示例</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{apiExamples.map((example) => (
								<div
									key={example.id}
									className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer ${
										selectedExample?.id === example.id
											? "ring-2 ring-blue-500"
											: ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="flex items-start justify-between mb-3">
											<div>
												<h3 className="text-lg font-semibold text-gray-900 mb-1">
													{example.title}
												</h3>
												<div className="flex items-center space-x-2 mb-2">
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(example.category)}`}
													>
														{example.category}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(example.status)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="text-gray-600 mb-4">{example.description}</p>
										<div className="flex items-center justify-between">
											<div className="flex flex-wrap gap-1">
												{example.httpMethods.map((method) => (
													<span
														key={method}
														className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
													>
														{method}
													</span>
												))}
											</div>
											<div className="flex items-center space-x-2">
												{example.status === "completed" && (
													<CheckCircle className="w-4 h-4 text-green-500" />
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* 右侧：示例详情 */}
						<div className="lg:sticky lg:top-6">
							{selectedExample ? (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200">
									<div className="p-6 border-b border-gray-200">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-xl font-semibold text-gray-900">
												{selectedExample.title}
											</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedExample.category)}`}
												>
													{selectedExample.category}
												</span>
											</div>
										</div>
										<p className="text-gray-600 mb-4">
											{selectedExample.description}
										</p>

										{/* HTTP 方法标签 */}
										<div className="flex flex-wrap gap-2 mb-4">
											{selectedExample.httpMethods.map((method) => (
												<span
													key={method}
													className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
												>
													{method}
												</span>
											))}
										</div>
									</div>

									<div className="p-6">
										<div className="flex items-center justify-between mb-3">
											<h4 className="font-semibold text-gray-900">代码示例</h4>
											<button
												onClick={() =>
													copyToClipboard(selectedExample.codeSnippet)
												}
												className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
											>
												<Copy className="w-4 h-4" />
												<span>{copiedCode ? "已复制" : "复制"}</span>
											</button>
										</div>
										<div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										{/* 响应示例 */}
										{selectedExample.responseExample && (
											<div className="mb-6">
												<h4 className="font-semibold text-gray-900 mb-3">
													响应示例
												</h4>
												<div className="bg-green-50 border border-green-200 rounded-lg p-4">
													<pre className="text-sm text-green-800">
														<code>{selectedExample.responseExample}</code>
													</pre>
												</div>
											</div>
										)}

										{/* 主要优势 */}
										<div className="mb-6">
											<h5 className="font-medium text-gray-900 mb-2">
												主要优势
											</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="p-6 bg-green-50 border-t border-green-200">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="w-5 h-5" />
												<span className="font-medium">
													该 API 功能已完成并可用
												</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
									<Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										选择一个 API 示例
									</h3>
									<p className="text-gray-600">
										点击左侧的示例查看详细信息和代码实现
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
