"use client";

import { ArrowLeft, CheckCircle, Database, Edit3, FileText, Shield, Upload } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "@/components/Layout";

interface FormExample {
	id: string;
	title: string;
	description: string;
	category: "Controlled" | "Uncontrolled" | "React Hook Form" | "Zod" | "File Upload" | "Multi-step";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	features: string[];
	performance: {
		bundleSize: string;
		renderCount: string;
		userExperience: string;
	};
}

const formExamples: FormExample[] = [
	{
		id: "controlled-components",
		title: "受控组件表单",
		description: "使用 React state 管理表单输入值的经典方式",
		category: "Controlled",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // 清除错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!formData.message.trim()) {
      newErrors.message = '消息不能为空';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // 成功处理
        alert('表单提交成功！');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('提交失败');
      }
    } catch (error) {
      console.error('表单提交错误:', error);
      alert('表单提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          姓名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.name ? 'border-red-500' : ''
          }\`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          邮箱
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.email ? 'border-red-500' : ''
          }\`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          主题
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">请选择主题</option>
          <option value="general">一般咨询</option>
          <option value="support">技术支持</option>
          <option value="feedback">意见反馈</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          消息
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.message ? 'border-red-500' : ''
          }\`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  );
}`,
		benefits: ["React 原生支持", "状态可控", "实时验证", "简单易懂"],
		features: ["实时验证", "错误处理", "加载状态", "类型安全"],
		performance: {
			bundleSize: "0KB",
			renderCount: "适中",
			userExperience: "良好",
		},
	},
	{
		id: "react-hook-form",
		title: "React Hook Form 高性能表单",
		description: "使用 React Hook Form 构建高性能表单",
		category: "React Hook Form",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 定义验证模式
const schema = yup.object({
  name: yup.string().required('姓名不能为空').min(2, '姓名至少2个字符'),
  email: yup.string().email('邮箱格式不正确').required('邮箱不能为空'),
  password: yup.string()
    .required('密码不能为空')
    .min(8, '密码至少8位')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, '密码必须包含大小写字母和数字'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], '密码不匹配')
    .required('请确认密码'),
  preferences: yup.object({
    newsletter: yup.boolean(),
    notifications: yup.boolean()
  })
});

function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    setValue,
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // 实时验证
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      preferences: {
        newsletter: false,
        notifications: true
      }
    }
  });

  const watchedPassword = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('注册成功！');
        reset();
      } else {
        throw new Error('注册失败');
      }
    } catch (error) {
      console.error('注册错误:', error);
    }
  };

  // 字段级验证
  const validateEmail = async (value) => {
    const result = await trigger('email');
    return result;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          姓名
        </label>
        <input
          {...register('name')}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.name ? 'border-red-500' : ''
          }\`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          邮箱
        </label>
        <input
          {...register('email', {
            onBlur: (e) => validateEmail(e.target.value)
          })}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.email ? 'border-red-500' : ''
          }\`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          密码
        </label>
        <input
          type="password"
          {...register('password')}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.password ? 'border-red-500' : ''
          }\`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          确认密码
        </label>
        <input
          type="password"
          {...register('confirmPassword')}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.confirmPassword ? 'border-red-500' : ''
          }\`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* 复杂字段使用 Controller */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          偏好设置
        </label>
        <div className="space-y-2">
          <Controller
            name="preferences.newsletter"
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="mr-2"
                />
                订阅新闻通讯
              </label>
            )}
          />
          <Controller
            name="preferences.notifications"
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="mr-2"
                />
                接收通知
              </label>
            )}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '注册中...' : '注册'}
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          重置
        </button>
      </div>
    </form>
  );
}`,
		benefits: ["高性能", "少重渲染", "内置验证", "优秀 DX"],
		features: ["表单状态管理", "字段验证", "错误处理", "TypeScript 支持"],
		performance: {
			bundleSize: "27KB",
			renderCount: "最少",
			userExperience: "优秀",
		},
	},
	{
		id: "zod-validation",
		title: "Zod 类型安全验证",
		description: "使用 Zod 进行类型安全的表单验证",
		category: "Zod",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 定义 Zod 模式
const userSchema = z.object({
  name: z.string()
    .min(1, '姓名不能为空')
    .min(2, '姓名至少2个字符')
    .max(50, '姓名最多50个字符'),

  email: z.string()
    .min(1, '邮箱不能为空')
    .email('邮箱格式不正确'),

  age: z.number()
    .min(18, '年龄必须至少18岁')
    .max(100, '年龄不能超过100岁'),

  bio: z.string()
    .max(500, '个人简介最多500个字符')
    .optional(),

  website: z.string()
    .url('网站URL格式不正确')
    .optional()
    .or(z.literal('')),

  skills: z.array(z.string())
    .min(1, '至少选择一项技能')
    .max(10, '最多选择10项技能'),

  experience: z.enum(['beginner', 'intermediate', 'expert'], {
    errorMap: () => ({ message: '请选择经验水平' })
  }),

  availability: z.object({
    weekdays: z.boolean(),
    weekends: z.boolean()
  }).refine(data => data.weekdays || data.weekends, {
    message: '至少选择一个可用时间段'
  })
});

type UserFormData = z.infer<typeof userSchema>;

function UserProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    setValue
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      bio: '',
      website: '',
      skills: [],
      experience: 'beginner',
      availability: {
        weekdays: false,
        weekends: false
      }
    }
  });

  const selectedSkills = watch('skills');
  const allSkills = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python'];

  const onSubmit = async (data: UserFormData) => {
    console.log('提交的数据:', data);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('用户资料已保存！');
      }
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = selectedSkills || [];
    if (currentSkills.includes(skill)) {
      setValue('skills', currentSkills.filter(s => s !== skill));
    } else {
      setValue('skills', [...currentSkills, skill]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 基本信息 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">基本信息</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            姓名
          </label>
          <input
            {...register('name')}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.name ? 'border-red-500' : ''
            }\`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            邮箱
          </label>
          <input
            type="email"
            {...register('email')}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.email ? 'border-red-500' : ''
            }\`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            年龄
          </label>
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.age ? 'border-red-500' : ''
            }\`}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
      </div>

      {/* 技能选择 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">技能</h3>

        <div className="grid grid-cols-2 gap-2">
          {allSkills.map(skill => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedSkills?.includes(skill) || false}
                onChange={() => toggleSkill(skill)}
                className="rounded"
              />
              <span className="text-sm">{skill}</span>
            </label>
          ))}
        </div>

        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>

      {/* 经验水平 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          经验水平
        </label>
        <select
          {...register('experience')}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
            errors.experience ? 'border-red-500' : ''
          }\`}
        >
          <option value="beginner">初学者</option>
          <option value="intermediate">中级</option>
          <option value="expert">专家</option>
        </select>

        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
        )}
      </div>

      {/* 可用时间 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">可用时间</h3>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('availability.weekdays')}
              className="rounded"
            />
            <span>工作日</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('availability.weekends')}
              className="rounded"
            />
            <span>周末</span>
          </label>
        </div>

        {errors.availability && (
          <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? '保存中...' : '保存资料'}
      </button>
    </form>
  );
}`,
		benefits: ["类型安全", "自动推断", "运行时验证", "优秀 DX"],
		features: ["类型推断", "复杂验证", "嵌套对象", "数组验证"],
		performance: {
			bundleSize: "3KB",
			renderCount: "最少",
			userExperience: "优秀",
		},
	},
	{
		id: "file-upload",
		title: "文件上传表单",
		description: "处理各种类型文件上传的表单实现",
		category: "File Upload",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface FileUploadData {
  title: string;
  description: string;
  category: string;
  files: File[];
}

function FileUploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<FileUploadData>();

  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const selectedFiles = watch('files') || [];

  // 处理文件选择
  const handleFileSelect = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      // 检查文件大小 (最大 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(\`文件 \${file.name} 超过 10MB 限制\`);
        return false;
      }
      // 检查文件类型
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        alert(\`文件 \${file.name} 类型不支持\`);
        return false;
      }
      return true;
    });

    setValue('files', [...selectedFiles, ...validFiles]);
  };

  // 拖拽处理
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // 移除文件
  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setValue('files', newFiles);
  };

  // 上传文件
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: progress
          }));
        }
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('文件上传错误:', error);
      throw error;
    }
  };

  // 提交表单
  const onSubmit = async (data: FileUploadData) => {
    try {
      // 上传所有文件
      const fileUrls = await Promise.all(
        data.files.map(file => uploadFile(file))
      );

      // 提交表单数据
      const submissionData = {
        ...data,
        fileUrls
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        alert('上传成功！');
        // 重置表单
        setValue('files', []);
        setUploadedFiles(fileUrls);
      }
    } catch (error) {
      console.error('提交错误:', error);
      alert('上传失败，请重试');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 基本信息 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            标题
          </label>
          <input
            {...register('title', { required: '标题不能为空' })}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.title ? 'border-red-500' : ''
            }\`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            描述
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            分类
          </label>
          <select
            {...register('category', { required: '请选择分类' })}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.category ? 'border-red-500' : ''
            }\`}
          >
            <option value="">请选择分类</option>
            <option value="document">文档</option>
            <option value="image">图片</option>
            <option value="video">视频</option>
            <option value="other">其他</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* 文件上传区域 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          文件上传
        </label>

        <div
          className={\`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors \${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }\`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            拖拽文件到此处，或
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              点击选择文件
            </button>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            支持 JPG, PNG, GIF, PDF, TXT 格式，最大 10MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            accept="image/jpeg,image/png,image/gif,application/pdf,text/plain"
          />
        </div>

        {/* 已选择的文件列表 */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">已选择的文件：</h4>
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Database className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {uploadProgress[file.name] !== undefined && (
                    <div className="w-20">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: \`\${uploadProgress[file.name]}%\` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {uploadProgress[file.name]}%
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || selectedFiles.length === 0}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '上传中...' : '提交'}
      </button>
    </form>
  );
}`,
		benefits: ["拖拽上传", "进度显示", "文件验证", "批量上传"],
		features: ["多文件支持", "类型验证", "大小限制", "进度追踪"],
		performance: {
			bundleSize: "适中",
			renderCount: "最少",
			userExperience: "优秀",
		},
	},
	{
		id: "multi-step-form",
		title: "多步骤表单",
		description: "复杂表单的分步骤实现，提升用户体验",
		category: "Multi-step",
		difficulty: "高级",
		status: "planned",
		codeSnippet: `import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

interface MultiStepFormData {
  // 步骤 1: 个人信息
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  // 步骤 2: 地址信息
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  // 步骤 3: 偏好设置
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

const steps = [
  { id: 'personal', title: '个人信息', description: '填写您的基本信息' },
  { id: 'address', title: '地址信息', description: '提供您的联系方式' },
  { id: 'preferences', title: '偏好设置', description: '自定义您的体验' }
];

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<MultiStepFormData>({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      preferences: {
        newsletter: false,
        notifications: false,
        theme: 'light',
        language: 'zh'
      }
    },
    mode: 'onChange'
  });

  const { handleSubmit, trigger, formState: { isValid } } = methods;

  // 验证当前步骤
  const validateCurrentStep = useCallback(async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 0:
        fieldsToValidate = [
          'personalInfo.firstName',
          'personalInfo.lastName',
          'personalInfo.email',
          'personalInfo.phone'
        ];
        break;
      case 1:
        fieldsToValidate = [
          'address.street',
          'address.city',
          'address.state',
          'address.zipCode',
          'address.country'
        ];
        break;
      case 2:
        fieldsToValidate = [
          'preferences.theme',
          'preferences.language'
        ];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    return isStepValid;
  }, [currentStep, trigger]);

  // 下一步
  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  // 上一步
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // 提交表单
  const onSubmit = async (data: MultiStepFormData) => {
    console.log('表单数据:', data);
    try {
      const response = await fetch('/api/multi-step-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('表单提交成功！');
      }
    } catch (error) {
      console.error('提交错误:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto">
        {/* 步骤指示器 */}
        <div className="mb-8">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => (
              <li key={step.id} className={\`flex items-center \${
                index < steps.length - 1 ? 'flex-1' : ''
              }\`}>
                <div className={\`flex items-center justify-center w-10 h-10 rounded-full border-2 \${
                  index <= currentStep
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }\`}>
                  {index < currentStep ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="ml-4 hidden sm:block">
                  <p className={\`text-sm font-medium \${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }\`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={\`flex-1 h-px mx-4 \${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }\`} />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* 表单内容 */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && <PersonalInfoStep />}
            {currentStep === 1 && <AddressStep />}
            {currentStep === 2 && <PreferencesStep />}

            {/* 导航按钮 */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一步
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  下一步
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  提交
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

// 个人信息步骤组件
function PersonalInfoStep() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">个人信息</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            名字
          </label>
          <input
            {...register('personalInfo.firstName', { required: '名字不能为空' })}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.personalInfo?.firstName ? 'border-red-500' : ''
            }\`}
          />
          {errors.personalInfo?.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalInfo.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            姓氏
          </label>
          <input
            {...register('personalInfo.lastName', { required: '姓氏不能为空' })}
            className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${
              errors.personalInfo?.lastName ? 'border-red-500' : ''
            }\`}
          />
          {errors.personalInfo?.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalInfo.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* ... 其他字段 */}
    </div>
  );
}`,
		benefits: ["复杂表单分解", "用户体验优秀", "进度可视化", "逐步验证"],
		features: ["步骤指示器", "表单验证", "数据持久化", "导航控制"],
		performance: {
			bundleSize: "适中",
			renderCount: "最少",
			userExperience: "优秀",
		},
	},
];

export default function FormsFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<FormExample | null>(null);

	const getCategoryColor = (category: FormExample["category"]) => {
		switch (category) {
			case "Controlled":
				return "text-blue-600 bg-blue-100";
			case "Uncontrolled":
				return "text-green-600 bg-green-100";
			case "React Hook Form":
				return "text-purple-600 bg-purple-100";
			case "Zod":
				return "text-cyan-600 bg-cyan-100";
			case "File Upload":
				return "text-orange-600 bg-orange-100";
			case "Multi-step":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: FormExample["difficulty"]) => {
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

	const getStatusColor = (status: FormExample["status"]) => {
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

	const getStatusText = (status: FormExample["status"]) => {
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
								<FileText className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">表单处理特性</h1>
									<p className="text-gray-600">Next.js 完整表单解决方案：受控组件、React Hook Form、Zod 验证</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 表单方案对比 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">表单方案对比</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Edit3 className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="mb-2 font-semibold text-blue-900">受控组件</h3>
								<p className="text-blue-700 text-sm">React 原生</p>
								<div className="mt-2 text-blue-600 text-xs">
									<div>⚡ 简单直接</div>
									<div>🎯 状态可控</div>
									<div>📝 实时验证</div>
								</div>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Database className="h-6 w-6 text-purple-600" />
								</div>
								<h3 className="mb-2 font-semibold text-purple-900">Hook Form</h3>
								<p className="text-purple-700 text-sm">高性能</p>
								<div className="mt-2 text-purple-600 text-xs">
									<div>🚀 性能优秀</div>
									<div>🔄 少重渲染</div>
									<div>🛠️ 功能丰富</div>
								</div>
							</div>
							<div className="rounded-lg bg-cyan-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Shield className="h-6 w-6 text-cyan-600" />
								</div>
								<h3 className="mb-2 font-semibold text-cyan-900">Zod</h3>
								<p className="text-cyan-700 text-sm">类型安全</p>
								<div className="mt-2 text-cyan-600 text-xs">
									<div>🔒 类型安全</div>
									<div>⚡ 运行时验证</div>
									<div>🎯 自动推断</div>
								</div>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Upload className="h-6 w-6 text-orange-600" />
								</div>
								<h3 className="mb-2 font-semibold text-orange-900">文件上传</h3>
								<p className="text-orange-700 text-sm">多媒体</p>
								<div className="mt-2 text-orange-600 text-xs">
									<div>📁 拖拽上传</div>
									<div>📊 进度显示</div>
									<div>🔍 文件验证</div>
								</div>
							</div>
							<div className="rounded-lg bg-red-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Edit3 className="h-6 w-6 text-red-600" />
								</div>
								<h3 className="mb-2 font-semibold text-red-900">多步骤</h3>
								<p className="text-red-700 text-sm">复杂表单</p>
								<div className="mt-2 text-red-600 text-xs">
									<div>📋 分步填写</div>
									<div>📈 进度可视</div>
									<div>✅ 逐步验证</div>
								</div>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<FileText className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="mb-2 font-semibold text-green-900">非受控</h3>
								<p className="text-green-700 text-sm">简单表单</p>
								<div className="mt-2 text-green-600 text-xs">
									<div>⚡ 性能最佳</div>
									<div>📝 代码简洁</div>
									<div>🎯 适合简单场景</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 表单示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">实现示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{formExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-blue-500" : ""
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
												<span>📦 {example.performance.bundleSize}</span>
												<span>🔄 {example.performance.renderCount}</span>
											</div>
											<span>🎯 {example.performance.userExperience}</span>
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
												<div className="font-medium text-gray-900">包体积</div>
												<div className="text-gray-600">{selectedExample.performance.bundleSize}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">重渲染</div>
												<div className="text-gray-600">{selectedExample.performance.renderCount}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">用户体验</div>
												<div className="text-gray-600">{selectedExample.performance.userExperience}</div>
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
												<span className="font-medium">该表单方案已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个表单方案</h3>
									<p className="text-gray-600">点击左侧的表单方案查看详细信息和代码示例</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
