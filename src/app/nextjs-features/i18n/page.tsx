"use client";

import React, { useState } from "react";
import {
	ArrowLeft,
	Globe,
	CheckCircle,
	Languages,
	Settings,
	BookOpen,
	Code,
} from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";

interface I18nExample {
	id: string;
	title: string;
	description: string;
	framework:
		| "next-intl"
		| "react-i18next"
		| "next-i18next"
		| "Custom"
		| "FormatJS";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	features: string[];
	performance: {
		bundleSize: string;
		runtime: string;
		seoSupport: string;
	};
}

const i18nExamples: I18nExample[] = [
	{
		id: "next-intl",
		title: "next-intl App Router 国际化",
		description: "专为 Next.js App Router 设计的现代化国际化解决方案",
		framework: "next-intl",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// i18n.ts
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'zh', 'ja', 'ko'] as const;
export const defaultLocale = 'en' as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh', 'ja', 'ko'],
  defaultLocale: 'en',
  localePrefix: 'always' // Always show locale in URL
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\\\.png|.*\\\\.jpg).*)']
};

// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js config
};

module.exports = withNextIntl(nextConfig);

// messages/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "cancel": "Cancel",
    "confirm": "Confirm"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog"
  },
  "homepage": {
    "title": "Welcome to Our Platform",
    "subtitle": "Building amazing experiences with Next.js",
    "description": "Discover the power of modern web development with our comprehensive solutions.",
    "cta": "Get Started"
  }
}

// messages/zh.json
{
  "common": {
    "loading": "加载中...",
    "error": "错误",
    "success": "成功",
    "cancel": "取消",
    "confirm": "确认"
  },
  "navigation": {
    "home": "首页",
    "about": "关于",
    "contact": "联系",
    "blog": "博客"
  },
  "homepage": {
    "title": "欢迎来到我们的平台",
    "subtitle": "使用 Next.js 构建卓越体验",
    "description": "通过我们的综合解决方案，发现现代 Web 开发的力量。",
    "cta": "开始使用"
  }
}

// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function HomePage() {
  const t = await getTranslations('homepage');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <p>{t('description')}</p>
      <button>{t('cta')}</button>
    </main>
  );
}

// components/Navigation.tsx
'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from 'next-intl/navigation';

export function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
      <Link href="/contact">{t('contact')}</Link>
      <Link href="/blog">{t('blog')}</Link>

      {/* Language switcher */}
      <div className="language-switcher">
        {['en', 'zh', 'ja', 'ko'].map((lang) => (
          <Link
            key={lang}
            href={pathname}
            locale={lang}
            className={locale === lang ? 'active' : ''}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// 带参数的翻译
// messages/en.json
{
  "user": {
    "greeting": "Hello, {name}!",
    "messageCount": {
      "zero": "No messages",
      "one": "One message",
      "other": "{count} messages"
    }
  }
}

// components/UserProfile.tsx
import { useTranslations } from 'next-intl';

function UserProfile({ name, messageCount }: {
  name: string;
  messageCount: number;
}) {
  const t = useTranslations('user');

  return (
    <div>
      <h2>{t('greeting', { name })}</h2>
      <p>{t('messageCount', { count: messageCount })}</p>
    </div>
  );
}`,
		benefits: [
			"App Router 原生支持",
			"TypeScript 优秀",
			"SEO 友好",
			"性能优秀",
		],
		features: ["自动路由本地化", "复数形式支持", "动态导入", "服务端渲染"],
		performance: {
			bundleSize: "15KB",
			runtime: "优秀",
			seoSupport: "完美",
		},
	},
	{
		id: "react-i18next",
		title: "react-i18next 灵活国际化",
		description: "成熟的 React 国际化库，功能强大且灵活",
		framework: "react-i18next",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译文件
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';
import jaTranslations from './locales/ja.json';

i18n
  .use(Backend) // 懒加载翻译文件
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false // React 已经默认转义
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    resources: {
      en: { translation: enTranslations },
      zh: { translation: zhTranslations },
      ja: { translation: jaTranslations }
    }
  });

export default i18n;

// i18n/locales/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "retry": "Retry"
  },
  "components": {
    "header": {
      "title": "My App",
      "navigation": {
        "home": "Home",
        "about": "About",
        "products": "Products",
        "contact": "Contact"
      }
    },
    "footer": {
      "copyright": "© {{year}} My Company. All rights reserved.",
      "privacy": "Privacy Policy",
      "terms": "Terms of Service"
    }
  },
  "pages": {
    "home": {
      "hero": {
        "title": "Welcome to Our Platform",
        "subtitle": "Building amazing digital experiences",
        "description": "We create innovative solutions that help businesses grow and succeed in the digital age.",
        "cta": "Get Started"
      },
      "features": {
        "title": "Our Features",
        "items": [
          {
            "title": "Fast Performance",
            "description": "Lightning-fast loading times and smooth interactions"
          },
          {
            "title": "Secure",
            "description": "Enterprise-grade security for your peace of mind"
          }
        ]
      }
    }
  },
  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "minLength": "Must be at least {{count}} characters",
    "maxLength": "Must be no more than {{count}} characters"
  }
}

// components/Header.tsx
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <h1>{t('components.header.title')}</h1>

      <nav>
        <a href="/">{t('components.header.navigation.home')}</a>
        <a href="/about">{t('components.header.navigation.about')}</a>
        <a href="/products">{t('components.header.navigation.products')}</a>
        <a href="/contact">{t('components.header.navigation.contact')}</a>
      </nav>

      <div className="language-switcher">
        <button
          onClick={() => changeLanguage('en')}
          className={i18n.language === 'en' ? 'active' : ''}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage('zh')}
          className={i18n.language === 'zh' ? 'active' : ''}
        >
          中文
        </button>
        <button
          onClick={() => changeLanguage('ja')}
          className={i18n.language === 'ja' ? 'active' : ''}
        >
          日本語
        </button>
      </div>
    </header>
  );
}

// hooks/useTranslation.ts
import { useTranslation as useReactI18n } from 'react-i18next';

export function useTranslation(namespace?: string) {
  const { t, i18n, ...rest } = useReactI18n(namespace);

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
    isRTL: ['ar', 'he', 'fa'].includes(i18n.language),
    ...rest
  };
}

// components/HomePage.tsx
import { useTranslation } from '../hooks/useTranslation';

export function HomePage() {
  const { t, currentLanguage } = useTranslation();

  return (
    <div className="homepage">
      <section className="hero">
        <h1>{t('pages.home.hero.title')}</h1>
        <h2>{t('pages.home.hero.subtitle')}</h2>
        <p>{t('pages.home.hero.description')}</p>
        <button>{t('pages.home.hero.cta')}</button>
      </section>

      <section className="features">
        <h2>{t('pages.home.features.title')}</h2>
        {t('pages.home.features.items', { returnObjects: true }).map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// 使用复数形式和插值
// components/UserStats.tsx
import { useTranslation } from 'react-i18next';

interface UserStatsProps {
  userName: string;
  postsCount: number;
  followersCount: number;
  lastLogin: Date;
}

export function UserStats({
  userName,
  postsCount,
  followersCount,
  lastLogin
}: UserStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="user-stats">
      <h2>{t('user.greeting', { name: userName })}</h2>

      <div className="stats">
        <div className="stat">
          <span className="count">{postsCount}</span>
          <span className="label">
            {t('user.posts', { count: postsCount })}
          </span>
        </div>

        <div className="stat">
          <span className="count">{followersCount}</span>
          <span className="label">
            {t('user.followers', { count: followersCount })}
          </span>
        </div>
      </div>

      <p className="last-login">
        {t('user.lastLogin', {
          date: new Intl.DateTimeFormat(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(lastLogin)
        })}
      </p>
    </div>
  );
}

// 对应的翻译文件内容
// "user": {
//   "greeting": "Hello, {{name}}!",
//   "posts": "{{count}} post",
//   "posts_plural": "{{count}} posts",
//   "followers": "{{count}} follower",
//   "followers_plural": "{{count}} followers",
//   "lastLogin": "Last login: {{date}}"
// }`,
		benefits: ["功能丰富", "生态系统成熟", "灵活配置", "社区活跃"],
		features: ["自动语言检测", "懒加载翻译", "命名空间", "复数形式"],
		performance: {
			bundleSize: "20KB",
			runtime: "良好",
			seoSupport: "良好",
		},
	},
	{
		id: "custom-i18n",
		title: "自定义国际化解决方案",
		description: "构建轻量级的自定义国际化系统",
		framework: "Custom",
		difficulty: "高级",
		status: "in-progress",
		codeSnippet: `// lib/i18n.ts
interface TranslationNamespace {
  [key: string]: string | TranslationNamespace;
}

interface Translations {
  [locale: string]: TranslationNamespace;
}

class I18nManager {
  private static instance: I18nManager;
  private translations: Translations = {};
  private currentLocale: string = 'en';
  private fallbackLocale: string = 'en';

  static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  async loadTranslations(locale: string): Promise<void> {
    if (!this.translations[locale]) {
      try {
        const translations = await import(\`../translations/\${locale}.json\`);
        this.translations[locale] = translations.default;
      } catch (error) {
        console.warn(\`Failed to load translations for \${locale}\`);
        if (locale !== this.fallbackLocale) {
          await this.loadTranslations(this.fallbackLocale);
        }
      }
    }
  }

  setLocale(locale: string): void {
    this.currentLocale = locale;
    localStorage.setItem('locale', locale);
  }

  getLocale(): string {
    return this.currentLocale;
  }

  t(key: string, params?: Record<string, any>): string {
    const translation = this.getTranslation(key, this.currentLocale);

    if (!translation) {
      const fallback = this.getTranslation(key, this.fallbackLocale);
      return fallback || key;
    }

    return this.interpolate(translation, params);
  }

  private getTranslation(key: string, locale: string): string | null {
    const keys = key.split('.');
    let translation: any = this.translations[locale];

    for (const k of keys) {
      if (translation && typeof translation === 'object') {
        translation = translation[k];
      } else {
        return null;
      }
    }

    return typeof translation === 'string' ? translation : null;
  }

  private interpolate(text: string, params?: Record<string, any>): string {
    if (!params) return text;

    return text.replace(/\\{\\{(\\w+)\\}\\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }

  // 支持复数形式
  pluralize(key: string, count: number, params?: Record<string, any>): string {
    const pluralKey = count === 1 ? key : \`\${key}_plural\`;
    const translation = this.t(pluralKey, { ...params, count });
    return translation || this.t(key, params);
  }

  // 支持日期本地化
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }

  // 支持数字本地化
  formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLocale, options).format(number);
  }
}

export const i18n = I18nManager.getInstance();

// translations/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  },
  "products": {
    "title": "Products",
    "item": "{{count}} product",
    "item_plural": "{{count}} products",
    "empty": "No products found"
  },
  "user": {
    "greeting": "Hello, {{name}}!",
    "profile": {
      "title": "Profile",
      "name": "Name",
      "email": "Email"
    }
  }
}

// translations/zh.json
{
  "common": {
    "loading": "加载中...",
    "error": "错误",
    "success": "成功"
  },
  "products": {
    "title": "产品",
    "item": "{{count}} 个产品",
    "empty": "未找到产品"
  },
  "user": {
    "greeting": "你好，{{name}}！",
    "profile": {
      "title": "个人资料",
      "name": "姓名",
      "email": "邮箱"
    }
  }
}

// hooks/useI18n.ts
import { useEffect, useState } from 'react';
import { i18n } from '../lib/i18n';

export function useI18n() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    // 监听语言变化事件
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  return {
    t: i18n.t.bind(i18n),
    pluralize: i18n.pluralize.bind(i18n),
    formatDate: i18n.formatDate.bind(i18n),
    formatNumber: i18n.formatNumber.bind(i18n),
    locale: i18n.getLocale(),
    setLocale: (locale: string) => {
      i18n.setLocale(locale);
      i18n.loadTranslations(locale);
    }
  };
}

// components/ProductList.tsx
import { useI18n } from '../hooks/useI18n';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { t, pluralize, formatNumber, formatDate } = useI18n();

  return (
    <div className="product-list">
      <h2>{t('products.title')}</h2>

      {products.length === 0 ? (
        <p>{t('products.empty')}</p>
      ) : (
        <>
          <p className="count">
            {pluralize('products.item', products.length)}
          </p>

          <div className="grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="price">
                  {formatNumber(product.price, {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </div>
                <small className="updated-at">
                  {formatDate(new Date(), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// providers/I18nProvider.tsx
import { useEffect, useState } from 'react';
import { i18n } from '../lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      // 从 localStorage 获取保存的语言
      const savedLocale = locale || localStorage.getItem('locale') || 'en';

      // 检测浏览器语言
      const browserLocale = navigator.language.split('-')[0];
      const supportedLocales = ['en', 'zh', 'ja'];
      const detectedLocale = supportedLocales.includes(browserLocale)
        ? browserLocale
        : 'en';

      const finalLocale = savedLocale || detectedLocale;

      i18n.setLocale(finalLocale);
      await i18n.loadTranslations(finalLocale);
      setIsLoaded(true);
    };

    initI18n();
  }, [locale]);

  if (!isLoaded) {
    return <div>{i18n.t('common.loading')}</div>;
  }

  return <>{children}</>;
}`,
		benefits: ["完全可控", "零依赖", "轻量级", "定制化"],
		features: ["简单 API", "懒加载", "缓存机制", "类型安全"],
		performance: {
			bundleSize: "< 5KB",
			runtime: "优秀",
			seoSupport: "自定义",
		},
	},
	{
		id: "next-i18next",
		title: "next-i18next Pages Router 国际化",
		description: "专为 Next.js Pages Router 设计的国际化解决方案",
		framework: "next-i18next",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja', 'ko'],
    localeDetection: true,
    localePath: './public/locales',
    fallbackLng: {
      'zh-HK': ['zh'],
      'zh-TW': ['zh'],
      default: ['en']
    }
  }
};

// pages/_app.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);

// pages/index.tsx
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'homepage'])),
    },
  };
}

export default function HomePage() {
  const { t } = useTranslation('homepage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}`,
		benefits: ["Pages Router 原生支持", "SSR 友好", "自动路由", "SEO 优秀"],
		features: ["静态生成", "服务端渲染", "路由重写", "中间件支持"],
		performance: {
			bundleSize: "25KB",
			runtime: "优秀",
			seoSupport: "完美",
		},
	},
	{
		id: "formatjs",
		title: "FormatJS ICU 国际化",
		description: "基于 ICU MessageFormat 的强大国际化库",
		framework: "FormatJS",
		difficulty: "高级",
		status: "planned",
		codeSnippet: `// 使用 FormatJS React Intl
import { IntlProvider, FormattedMessage, useIntl } from 'react-intl';

const messages = {
  'en': {
    'welcome': 'Hello, {name}!',
    'unread': 'You have {count, plural, =0 {no messages} one {# message} other {# messages}}.',
    'date': 'Today is {date, date, long}'
  },
  'zh': {
    'welcome': '你好，{name}！',
    'unread': '您有 {count, plural, =0 {没有消息} other {# 条消息}}。',
    'date': '今天是 {date, date, long}'
  }
};

function App() {
  return (
    <IntlProvider locale="zh" messages={messages['zh']}>
      <WelcomeMessage name="张三" count={5} />
    </IntlProvider>
  );
}

function WelcomeMessage({ name, count }: { name: string; count: number }) {
  return (
    <div>
      <p>
        <FormattedMessage
          id="welcome"
          values={{ name: <strong>{name}</strong> }}
        />
      </p>
      <p>
        <FormattedMessage
          id="unread"
          values={{ count }}
        />
      </p>
      <p>
        <FormattedMessage
          id="date"
          values={{ date: new Date() }}
        />
      </p>
    </div>
  );
}`,
		benefits: ["ICU 标准", "强大格式化", "复数规则", "性别支持"],
		features: ["日期格式化", "数字格式化", "复数形式", "选择格式"],
		performance: {
			bundleSize: "35KB",
			runtime: "良好",
			seoSupport: "良好",
		},
	},
];

export default function I18nFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<I18nExample | null>(
		null,
	);

	const getFrameworkColor = (framework: I18nExample["framework"]) => {
		switch (framework) {
			case "next-intl":
				return "text-blue-600 bg-blue-100";
			case "react-i18next":
				return "text-green-600 bg-green-100";
			case "next-i18next":
				return "text-purple-600 bg-purple-100";
			case "Custom":
				return "text-orange-600 bg-orange-100";
			case "FormatJS":
				return "text-cyan-600 bg-cyan-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: I18nExample["difficulty"]) => {
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

	const getStatusColor = (status: I18nExample["status"]) => {
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

	const getStatusText = (status: I18nExample["status"]) => {
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
								<Globe className="w-8 h-8 text-blue-600" />
								<div>
									<h1 className="text-3xl font-bold text-gray-900">
										国际化特性
									</h1>
									<p className="text-gray-600">
										Next.js
										完整国际化方案：next-intl、react-i18next、自定义解决方案
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 国际化方案对比 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							国际化方案对比
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Languages className="w-6 h-6 text-blue-600" />
								</div>
								<h3 className="font-semibold text-blue-900 mb-2">next-intl</h3>
								<p className="text-sm text-blue-700">App Router</p>
								<div className="mt-2 text-xs text-blue-600">
									<div>🚀 原生支持</div>
									<div>📱 SEO 优秀</div>
									<div>⚡ 性能最佳</div>
								</div>
							</div>
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<BookOpen className="w-6 h-6 text-green-600" />
								</div>
								<h3 className="font-semibold text-green-900 mb-2">
									react-i18next
								</h3>
								<p className="text-sm text-green-700">通用方案</p>
								<div className="mt-2 text-xs text-green-600">
									<div>🛠️ 功能丰富</div>
									<div>🌐 社区成熟</div>
									<div>🔧 灵活配置</div>
								</div>
							</div>
							<div className="text-center p-4 bg-purple-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Settings className="w-6 h-6 text-purple-600" />
								</div>
								<h3 className="font-semibold text-purple-900 mb-2">
									next-i18next
								</h3>
								<p className="text-sm text-purple-700">Pages Router</p>
								<div className="mt-2 text-xs text-purple-600">
									<div>📄 SSR 友好</div>
									<div>🔄 自动路由</div>
									<div>📊 SEO 优秀</div>
								</div>
							</div>
							<div className="text-center p-4 bg-orange-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Code className="w-6 h-6 text-orange-600" />
								</div>
								<h3 className="font-semibold text-orange-900 mb-2">自定义</h3>
								<p className="text-sm text-orange-700">轻量级</p>
								<div className="mt-2 text-xs text-orange-600">
									<div>📦 零依赖</div>
									<div>🎯 完全可控</div>
									<div>⚡ 性能优秀</div>
								</div>
							</div>
							<div className="text-center p-4 bg-cyan-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Globe className="w-6 h-6 text-cyan-600" />
								</div>
								<h3 className="font-semibold text-cyan-900 mb-2">FormatJS</h3>
								<p className="text-sm text-cyan-700">ICU 标准</p>
								<div className="mt-2 text-xs text-cyan-600">
									<div>📐 ICU 标准</div>
									<div>🎨 强大格式化</div>
									<div>🔢 复数规则</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 国际化示例 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">实现示例</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{i18nExamples.map((example) => (
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
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFrameworkColor(
															example.framework,
														)}`}
													>
														{example.framework}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
															example.difficulty,
														)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
															example.status,
														)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="text-gray-600 mb-4">{example.description}</p>
										<div className="flex items-center justify-between text-sm text-gray-500">
											<div className="flex space-x-4">
												<span>📦 {example.performance.bundleSize}</span>
												<span>⚡ {example.performance.runtime}</span>
											</div>
											<span>🔍 {example.performance.seoSupport}</span>
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
													className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getFrameworkColor(
														selectedExample.framework,
													)}`}
												>
													{selectedExample.framework}
												</span>
											</div>
										</div>
										<p className="text-gray-600 mb-4">
											{selectedExample.description}
										</p>
										<div className="grid grid-cols-3 gap-4 text-sm">
											<div className="text-center p-2 bg-gray-50 rounded">
												<div className="font-medium text-gray-900">包体积</div>
												<div className="text-gray-600">
													{selectedExample.performance.bundleSize}
												</div>
											</div>
											<div className="text-center p-2 bg-gray-50 rounded">
												<div className="font-medium text-gray-900">运行时</div>
												<div className="text-gray-600">
													{selectedExample.performance.runtime}
												</div>
											</div>
											<div className="text-center p-2 bg-gray-50 rounded">
												<div className="font-medium text-gray-900">
													SEO 支持
												</div>
												<div className="text-gray-600">
													{selectedExample.performance.seoSupport}
												</div>
											</div>
										</div>
									</div>

									<div className="p-6">
										<h4 className="font-semibold text-gray-900 mb-3">
											代码示例
										</h4>
										<div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6">
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

										<div className="mt-4">
											<h5 className="font-medium text-gray-900 mb-2">
												核心功能
											</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.features.map((feature, index) => (
													<span
														key={index}
														className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
													>
														{feature}
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
													该国际化方案已完成并可用
												</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
									<Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										选择一个国际化方案
									</h3>
									<p className="text-gray-600">
										点击左侧的国际化方案查看详细信息和代码示例
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
