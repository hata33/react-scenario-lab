"use client";

import { AlertCircle, Code, Target, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { copyWithFeedback } from "@/utils";
import {
	FeatureContainer,
	FeatureContent,
	FeatureHeader,
	FeatureOverview,
	FeatureThreeWRule,
	FeatureExampleSelector,
	FeatureExampleDetail,
	FeatureOfficialExamples,
	type Example,
	type ExampleDetail,
	type OfficialExample,
} from "@/components/showcase";
import { AsyncOperationsDemo, ClosureTrapDemo, EventHandlersDemo, TimersDemo } from "./(components)";

const useEffectEventExamples: Example[] = [
	{
		id: "closure-trap",
		title: "闭包陷阱解决",
		icon: <Target className="h-5 w-5" />,
		difficulty: "中级",
	},
	{
		id: "event-handlers",
		title: "事件处理器优化",
		icon: <Zap className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "timers",
		title: "定时器和间隔器",
		icon: <AlertCircle className="h-5 w-5" />,
		difficulty: "中级",
	},
	{
		id: "async-operations",
		title: "异步操作处理",
		icon: <Code className="h-5 w-5" />,
		difficulty: "高级",
	},
];

const exampleDetails: Record<string, ExampleDetail> = {
	"closure-trap": {
		title: "闭包陷阱解决",
		icon: <Target className="h-5 w-5" />,
		description: "解决 useEffect 中的闭包陷阱问题，访问最新的 props 和 state",
		codeSnippet: `import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // ✅ 使用 useEffectEvent 访问最新值
  const onMessage = useEffectEvent((msg) => {
    // 总是能访问到最新的 message 值
    console.log('收到消息:', msg, '当前输入:', message);
  });

  useEffect(() => {
    const ws = new WebSocket(\`ws://chat.com/\${roomId}\`);

    ws.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => ws.close();
  }, [roomId, onMessage]); // 不依赖 message

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}`,
		benefits: ["解决闭包陷阱", "访问最新值", "避免依赖循环", "性能优化"],
		useCases: ["WebSocket 连接", "事件监听器", "定时器回调", "异步操作"],
		problemsSolved: [
			{
				problem: "闭包捕获过期值",
				description: "useEffect 回调函数会捕获创建时的 props 和 state，导致访问不到最新值",
				solution: "useEffectEvent 创建稳定的回调函数，总是能访问到最新的 props 和 state",
			},
		],
		status: "completed",
	},
	"event-handlers": {
		title: "事件处理器优化",
		icon: <Zap className="h-5 w-5" />,
		description: "在事件处理器中访问最新状态，避免不必要的重新创建",
		codeSnippet: `import { useEffectEvent } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');

  // ✅ 稳定的事件处理器
  const handleSubmit = useEffectEvent((e) => {
    e.preventDefault();
    // 总是能访问到最新的 query 值
    search(query);
  });

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button type="submit">搜索</button>
    </form>
  );
}`,
		benefits: ["稳定的回调函数", "避免重新渲染", "优化性能", "简化依赖管理"],
		useCases: ["表单提交", "按钮点击", "键盘事件", "自定义事件"],
		problemsSolved: [
			{
				problem: "事件处理器不稳定",
				description: "传统事件处理器依赖 props/state，每次变化都会重新创建，影响性能",
				solution: "useEffectEvent 创建稳定的处理器，避免不必要的重新创建和重新渲染",
			},
		],
		status: "completed",
	},
	timers: {
		title: "定时器和间隔器",
		icon: <AlertCircle className="h-5 w-5" />,
		description: "在定时器回调中访问最新状态，避免闭包陷阱",
		codeSnippet: `import { useEffect, useEffectEvent } from 'react';

function Timer({ duration }) {
  const [elapsed, setElapsed] = useState(0);

  // ✅ 定时器中访问最新值
  const onTick = useEffectEvent(() => {
    setElapsed(prev => prev + 1);

    // 可以访问最新的 duration
    if (elapsed >= duration) {
      clearInterval(intervalId);
    }
  });

  useEffect(() => {
    const intervalId = setInterval(onTick, 1000);
    return () => clearInterval(intervalId);
  }, [onTick]);

  return <div>已运行: {elapsed} 秒</div>;
}`,
		benefits: ["定时器稳定性", "访问最新状态", "避免内存泄漏", "精确的时间控制"],
		useCases: ["倒计时器", "定时刷新", "轮询机制", "心跳检测"],
		problemsSolved: [
			{
				problem: "定时器闭包问题",
				description: "setInterval/setTimeout 回调会捕获初始状态，无法访问最新值",
				solution: "useEffectEvent 让定时器回调访问最新状态，避免重新创建定时器",
			},
		],
		status: "completed",
	},
	"async-operations": {
		title: "异步操作处理",
		icon: <Code className="h-5 w-5" />,
		description: "在异步操作中处理最新状态，实现防抖和节流",
		codeSnippet: `import { useEffect, useEffectEvent } from 'react';

function AutoSave({ content }) {
  const [status, setStatus] = useState('saved');

  // ✅ 防抖保存，访问最新内容
  const saveContent = useEffectEvent(async () => {
    setStatus('saving...');

    // 总是访问到最新的 content
    await api.save(content);
    setStatus('saved');
  });

  useEffect(() => {
    const timeoutId = setTimeout(saveContent, 1000);
    return () => clearTimeout(timeoutId);
  }, [saveContent]);

  return <div>状态: {status}</div>;
}`,
		benefits: ["防抖节流", "状态同步", "性能优化", "用户体验提升"],
		useCases: ["自动保存", "搜索防抖", "API 请求", "数据同步"],
		problemsSolved: [
			{
				problem: "异步操作状态不同步",
				description: "异步操作期间状态可能已经改变，导致操作基于过期状态",
				solution: "useEffectEvent 确保异步操作访问最新状态，实现准确的数据处理",
			},
		],
		status: "completed",
	},
};

const architectureFeatures = [
	{
		icon: <Target className="h-6 w-6 text-blue-600" />,
		title: "闭包陷阱解决",
		description: "访问最新的状态值",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
		titleColor: "text-blue-900",
		descriptionColor: "text-blue-700",
	},
	{
		icon: <Zap className="h-6 w-6 text-green-600" />,
		title: "事件优化",
		description: "稳定的回调函数",
		bgColor: "bg-green-50",
		iconColor: "text-green-600",
		titleColor: "text-green-900",
		descriptionColor: "text-green-700",
	},
	{
		icon: <AlertCircle className="h-6 w-6 text-purple-600" />,
		title: "定时器管理",
		description: "精确的时间控制",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
		titleColor: "text-purple-900",
		descriptionColor: "text-purple-700",
	},
	{
		icon: <Code className="h-6 w-6 text-orange-600" />,
		title: "异步处理",
		description: "防抖和节流优化",
		bgColor: "bg-orange-50",
		iconColor: "text-orange-600",
		titleColor: "text-orange-900",
		descriptionColor: "text-orange-700",
	},
];

const threeWSections = [
	{
		description:
			"useEffectEvent 是 React 19 中用于解决闭包陷阱问题的新 Hook，允许在 effect 和事件处理器中访问最新的 props 和 state。",
		features: ["解决闭包陷阱", "访问最新值", "稳定回调函数", "性能优化"],
	},
	{
		description:
			"解决传统 useEffect 中的闭包陷阱问题，避免因依赖项变化导致的无限循环、过期闭包和性能问题。通过提供稳定的回调函数，简化依赖管理。",
		features: ["避免无限循环", "简化依赖管理", "提升性能", "减少样板代码"],
	},
	{
		description: "适用于 useEffect 回调、事件处理器、定时器回调、异步操作等需要访问最新值但不想触发重新执行的场景。",
		features: ["WebSocket 连接", "事件监听", "定时器操作", "防抖节流"],
	},
];

const getOfficialExamples = (exampleId: string): OfficialExample[] => {
	const examples: Record<string, OfficialExample[]> = {
		"closure-trap": [
			{
				title: "🔄 WebSocket 连接",
				code: `function ChatApp({ roomId }) {
  const [message, setMessage] = useState('');

  const onMessage = useEffectEvent((data) => {
    // 访问最新的 message 值
    addMessage(data, message);
  });

  useEffect(() => {
    const ws = new WebSocket(\`ws://chat.com/\${roomId}\`);
    ws.onmessage = (event) => onMessage(JSON.parse(event.data));
    return () => ws.close();
  }, [roomId, onMessage]);

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}`,
				description: "WebSocket 连接中使用 useEffectEvent 访问最新状态",
			},
		],
		"event-handlers": [
			{
				title: "📝 表单处理",
				code: `function FormComponent() {
  const [values, setValues] = useState({});

  const handleSubmit = useEffectEvent((e) => {
    e.preventDefault();
    // 访问最新的表单值
    submitForm(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <button type="submit">提交</button>
    </form>
  );
}`,
				description: "表单提交处理器访问最新表单数据",
			},
		],
		timers: [
			{
				title: "⏰ 倒计时器",
				code: `function Countdown({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  const onTick = useEffectEvent(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  });

  useEffect(() => {
    const interval = setInterval(onTick, 1000);
    return () => clearInterval(interval);
  }, [onTick]);

  return <div>剩余时间: {timeLeft} 秒</div>;
}`,
				description: "倒计时器中使用稳定的回调函数",
			},
		],
		"async-operations": [
			{
				title: "💾 自动保存",
				code: `function AutoSaveEditor() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('saved');

  const saveContent = useEffectEvent(async () => {
    setStatus('saving...');
    await save(content);
    setStatus('saved');
  });

  useEffect(() => {
    const timeout = setTimeout(saveContent, 2000);
    return () => clearTimeout(timeout);
  }, [saveContent]);

  return <textarea onChange={e => setContent(e.target.value)} />;
}`,
				description: "防抖自动保存，访问最新内容",
			},
		],
	};

	return examples[exampleId] || [];
};

const getDemoComponents = (exampleId: string): React.ReactNode[] => {
	switch (exampleId) {
		case "closure-trap":
			return [<ClosureTrapDemo key="closure-trap" />];
		case "event-handlers":
			return [<EventHandlersDemo key="event-handlers" />];
		case "timers":
			return [<TimersDemo key="timers" />];
		case "async-operations":
			return [<AsyncOperationsDemo key="async-operations" />];
		default:
			return [];
	}
};

export default function UseEffectEventPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExampleId, setSelectedExampleId] = useState(useEffectEventExamples[0].id);

	const selectedExample = exampleDetails[selectedExampleId];

	const handleCopyCode = (code: string) => {
		copyWithFeedback(code, setCopiedCode);
	};

	return (
		<Layout>
			<FeatureContainer>
				<FeatureHeader
					icon={<Target className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
					title="React 19 useEffectEvent"
					subtitle="解决闭包陷阱的优雅方案"
				/>
				<FeatureContent className="space-y-4">
					<FeatureOverview title="useEffectEvent 生态系统" features={architectureFeatures} />
					<FeatureThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />
				</FeatureContent>
				<FeatureExampleSelector
					label="选择功能:"
					examples={useEffectEventExamples}
					selectedId={selectedExampleId}
					onSelect={setSelectedExampleId}
				/>
				<FeatureContent>
					<FeatureExampleDetail
						example={selectedExample}
						demoComponents={getDemoComponents(selectedExampleId)}
						onCopyCode={handleCopyCode}
						copiedCode={copiedCode}
					/>
				</FeatureContent>
				<FeatureContent>
					<FeatureOfficialExamples
						title={`📚 ${selectedExample?.title} 官方示例`}
						description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
						examples={getOfficialExamples(selectedExampleId)}
					/>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}
