"use client";

import { ArrowLeft, Bug, CheckCircle, Code, FlaskConical, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";
import { FeatureContainer, FeatureContent } from "@/components/showcase";
import FeatureBackButton from "@/components/showcase/FeatureBackButton";

interface TestingExample {
	id: string;
	title: string;
	description: string;
	category: "Unit" | "Integration" | "E2E" | "Visual" | "Performance" | "Accessibility";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	features: string[];
	performance: {
		executionTime: string;
		coverage: string;
		maintenance: string;
	};
}

const testingExamples: TestingExample[] = [
	{
		id: "jest-testing-library",
		title: "Jest + React Testing Library 单元测试",
		description: "使用 Jest 和 React Testing Library 编写可靠的单元测试",
		category: "Unit",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// __tests__/components/Button.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

// 模拟组件
const Button = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant} \${disabled ? 'disabled' : ''}\`}
      data-testid="button"
    >
      {children}
    </button>
  );
};

describe('Button Component', () => {
  const user = userEvent.setup();

  // 基础渲染测试
  test('renders button with text', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  // 测试点击事件
  test('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 测试禁用状态
  test('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 测试样式类
  test('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByTestId('button');
    expect(button).toHaveClass('btn', 'btn-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByTestId('button');
    expect(button).toHaveClass('btn', 'btn-secondary');
  });

  // 测试可访问性
  test('is accessible', () => {
    const { container } = render(<Button>Submit form</Button>);

    // 检查可访问性违规
    // expect(container).toBeInTheDocument();
    // 实际项目中会使用 axe-core 等工具
  });
});

// __tests__/hooks/useCounter.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter Hook', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  test('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('decrements count', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });

  test('resets count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});

// __tests__/utils/formatDate.test.ts
import { formatDate, formatCurrency } from '../formatDate';

describe('formatDate utility', () => {
  test('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });

  test('formats date with custom format', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
  });

  test('handles invalid date', () => {
    expect(() => formatDate('invalid')).toThrow('Invalid date');
  });
});

// __tests__/pages/index.test.tsx
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';

// 模拟 next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// 模拟 next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('HomePage', () => {
  test('renders welcome message', () => {
    render(<HomePage />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });
});

// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    }],
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};`,
		benefits: ["快速反馈", "单元隔离", "易于调试", "持续集成友好"],
		features: ["快照测试", "模拟函数", "异步测试", "覆盖率报告"],
		performance: {
			executionTime: "秒级",
			coverage: "80%+",
			maintenance: "简单",
		},
	},
	{
		id: "cypress-e2e",
		title: "Cypress 端到端测试",
		description: "使用 Cypress 编写可靠的端到端测试",
		category: "E2E",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>;
      getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;
      checkAccessibility(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});

Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(\`[data-testid="\${selector}"]\`);
});

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe();
  cy.checkAxe();
});

// cypress/e2e/user-journey.cy.ts
describe('User Registration and Login Journey', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow user to register and login', () => {
    // 注册新用户
    cy.getByTestId('register-link').click();

    cy.url().should('include', '/register');

    cy.getByTestId('email-input').type('newuser@example.com');
    cy.getByTestId('password-input').type('SecurePassword123!');
    cy.getByTestId('confirm-password-input').type('SecurePassword123!');
    cy.getByTestId('name-input').type('New User');

    cy.getByTestId('register-button').click();

    // 验证注册成功
    cy.url().should('include', '/dashboard');
    cy.getByTestId('welcome-message').should('contain', 'New User');

    // 验证用户已登录
    cy.window().its('localStorage').should('have.property', 'token');

    // 退出登录
    cy.getByTestId('logout-button').click();

    // 重新登录
    cy.getByTestId('login-link').click();

    cy.getByTestId('email-input').type('newuser@example.com');
    cy.getByTestId('password-input').type('SecurePassword123!');
    cy.getByTestId('login-button').click();

    // 验证登录成功
    cy.url().should('include', '/dashboard');
    cy.getByTestId('welcome-message').should('contain', 'New User');
  });
});

// cypress/e2e/ecommerce.cy.ts
describe('E-commerce Shopping Flow', () => {
  beforeEach(() => {
    cy.login('testuser@example.com', 'password123');
    cy.visit('/products');
  });

  it('should allow user to browse products and add to cart', () => {
    // 浏览产品列表
    cy.getByTestId('product-grid').should('be.visible');
    cy.getByTestId('product-card').should('have.length.greaterThan', 0);

    // 搜索产品
    cy.getByTestId('search-input').type('laptop{enter}');
    cy.url().should('include', 'search=laptop');

    // 筛选产品
    cy.getByTestId('category-filter').select('Electronics');
    cy.getByTestId('price-range').type('1000-2000');
    cy.getByTestId('apply-filters').click();

    // 添加产品到购物车
    cy.getByTestId('product-card').first().within(() => {
      cy.getByTestId('product-name').should('be.visible');
      cy.getByTestId('product-price').should('be.visible');
      cy.getByTestId('add-to-cart-button').click();
    });

    // 验证购物车更新
    cy.getByTestId('cart-count').should('contain', '1');
    cy.getByTestId('cart-sidebar').should('be.visible');
    cy.getByTestId('cart-item').should('have.length', 1);

    // 继续购物
    cy.getByTestId('continue-shopping').click();

    // 添加更多产品
    cy.getByTestId('product-card').eq(1).within(() => {
      cy.getByTestId('add-to-cart-button').click();
    });

    cy.getByTestId('cart-count').should('contain', '2');
  });

  it('should allow user to complete checkout process', () => {
    // 添加产品到购物车
    cy.getByTestId('product-card').first().within(() => {
      cy.getByTestId('add-to-cart-button').click();
    });

    // 进入购物车
    cy.getByTestId('cart-icon').click();
    cy.url().should('include', '/cart');

    // 更新数量
    cy.getByTestId('quantity-input').clear().type('2');
    cy.getByTestId('update-quantity').click();

    // 进入结账
    cy.getByTestId('checkout-button').click();
    cy.url().should('include', '/checkout');

    // 填写配送信息
    cy.getByTestId('shipping-address').type('123 Main St');
    cy.getByTestId('shipping-city').type('New York');
    cy.getByTestId('shipping-zip').type('10001');
    cy.getByTestId('shipping-country').select('US');

    // 选择配送方式
    cy.getByTestId('shipping-standard').check();

    // 填写支付信息
    cy.getByTestId('card-number').type('4242424242424242');
    cy.getByTestId('card-expiry').type('12/25');
    cy.getByTestId('card-cvc').type('123');
    cy.getByTestId('card-name').type('John Doe');

    // 提交订单
    cy.getByTestId('place-order-button').click();

    // 验证订单成功
    cy.url().should('include', '/order-confirmation');
    cy.getByTestId('order-number').should('be.visible');
    cy.getByTestId('thank-you-message').should('be.visible');
  });
});

// cypress/e2e/accessibility.cy.ts
describe('Accessibility Tests', () => {
  it('should be accessible on homepage', () => {
    cy.visit('/');
    cy.checkAccessibility();
  });

  it('should be accessible on product page', () => {
    cy.visit('/products/1');
    cy.checkAccessibility();
  });

  it('should be keyboard navigable', () => {
    cy.visit('/');

    // 测试键盘导航
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-testid', 'skip-link');

    cy.focused().tab();
    cy.focused().should('have.attr', 'data-testid', 'main-nav');

    // 测试菜单键盘导航
    cy.focused().type('{enter}');
    cy.getByTestId('mobile-menu').should('be.visible');
  });
});

// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/commands.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      username: 'testuser@example.com',
      password: 'password123'
    },
    setupNodeEvents(on, config) {
      // 任务和插件配置
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    }
  }
});`,
		benefits: ["真实用户场景", "跨浏览器测试", "可视化调试", "并行执行"],
		features: ["时间旅行", "实时预览", "网络控制", "API 测试"],
		performance: {
			executionTime: "分钟级",
			coverage: "端到端",
			maintenance: "中等",
		},
	},
	{
		id: "storybook-visual",
		title: "Storybook 视觉测试",
		description: "使用 Storybook 和 Chromatic 进行视觉回归测试",
		category: "Visual",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and states.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Button visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state'
    },
    children: {
      control: 'text',
      description: 'Button content'
    },
    onClick: { action: 'clicked' }
  },
  args: {
    onClick: fn()
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础故事
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'primary',
    size: 'md'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
};

// 不同尺寸
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg'
  }
};

// 状态变体
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true
  }
};

// 交互故事
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="download" className="mr-2" />
        Download
      </>
    )
  }
};

// 测试故事
export const Interactive: Story = {
  args: {
    children: 'Interactive Button'
  },
  play: async ({ canvasElement, args }) => {
    const button = await canvasElement.querySelector('button');

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();

    await userEvent.hover(button);
    await expect(button).toHaveStyle('cursor: pointer');
  }
};

// .storybook/test.tsx
import type { StorybookConfig } from '@storybook/nextjs';
import { addMatchMediaSnapshotConfig } from '@storybook/addon-matchmedia-snapshot';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/testing-library',
    'storybook-addon-mock',
    '@chromatic-com/storybook',
    addMatchMediaSnapshotConfig
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;

// tests/visual/Button.test.ts
import { composeStory } from '@storybook/react';
import Meta, { Default, Disabled, Loading } from '../../stories/Button.stories';

// 组合故事用于测试
const DefaultStory = composeStory(Default, Meta);
const DisabledStory = composeStory(Disabled, Meta);
const LoadingStory = composeStory(Loading, Meta);

describe('Button Visual Tests', () => {
  it('matches default button snapshot', () => {
    const { asFragment } = render(<DefaultStory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches disabled button snapshot', () => {
    const { asFragment } = render(<DisabledStory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches loading button snapshot', () => {
    const { asFragment } = render(<LoadingStory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles hover state correctly', async () => {
    render(<DefaultStory />);

    const button = screen.getByRole('button');
    await userEvent.hover(button);

    expect(button).toHaveClass('hover:bg-blue-700');
  });

  it('handles focus state correctly', async () => {
    render(<DefaultStory />);

    const button = screen.getByRole('button');
    await userEvent.tab();

    expect(button).toHaveFocus();
    expect(button).toHaveClass('focus:ring-2');
  });
});

// chromatic.config.js
module.exports = {
  // 仅在 PR 上运行视觉测试
  ignoreLastBuildOnBranch: ['main'],
  // 构建参数
  buildScriptName: 'build-storybook',
  // 视觉回归测试设置
  patchBuildDir: true,
  // 故障排除设置
  debug: false,
  // 保留构建
  retainBuilds: true
};`,
		benefits: ["组件隔离", "设计一致性", "视觉回归", "文档驱动"],
		features: ["交互式开发", "多种视图", "可访问性测试", "自动化视觉测试"],
		performance: {
			executionTime: "分钟级",
			coverage: "组件级",
			maintenance: "中等",
		},
	},
	{
		id: "playwright-testing",
		title: "Playwright 现代化测试",
		description: "使用 Playwright 进行跨浏览器端到端测试",
		category: "E2E",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});

// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can login and logout', async ({ page }) => {
    await page.goto('/login');

    // 填写登录表单
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // 验证登录成功
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

    // 退出登录
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');

    // 验证退出成功
    await expect(page).toHaveURL('/');
  });
});`,
		benefits: ["多浏览器支持", "并行执行", "强大调试", "CI/CD 友好"],
		features: ["自动等待", "网络拦截", "移动端测试", "可访问性"],
		performance: {
			executionTime: "分钟级",
			coverage: "端到端",
			maintenance: "简单",
		},
	},
	{
		id: "performance-testing",
		title: "性能测试策略",
		description: "使用 Lighthouse 和 Web Vitals 进行性能测试",
		category: "Performance",
		difficulty: "高级",
		status: "planned",
		codeSnippet: `// tests/performance/lighthouse.test.ts
import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance Tests', () => {
  test('homepage performance audit', async ({ page }) => {
    await page.goto('/');

    await playAudit({
      page,
      thresholds: {
        performance: 80,
        accessibility: 90,
        'best-practices': 80,
        seo: 80
      },
      port: 9222
    });
  });

  test('core web vitals', async ({ page }) => {
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {};

        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          vitals.lcp = entries[entries.length - 1].startTime;
          resolve(vitals);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          vitals.fid = entries[0].processingStart - entries[0].startTime;
        }).observe({ entryTypes: ['first-input'] });

        // CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
      });
    });

    expect(vitals.lcp).toBeLessThan(2500);
    expect(vitals.fid).toBeLessThan(100);
    expect(vitals.cls).toBeLessThan(0.1);
  });
});`,
		benefits: ["性能监控", "用户体验", "SEO 优化", "持续改进"],
		features: ["Web Vitals", "Lighthouse", "真实用户监控", "性能预算"],
		performance: {
			executionTime: "分钟级",
			coverage: "性能指标",
			maintenance: "复杂",
		},
	},
	{
		id: "testing-library-component",
		title: "React Testing Library 组件测试",
		description: "使用 RTL 专注于用户行为的组件测试",
		category: "Integration",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// __tests__/components/UserProfile.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '../UserProfile';
import { ThemeProvider } from '../ThemeProvider';
import { AuthProvider } from '../AuthProvider';

// 模拟数据
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'avatar.jpg',
  bio: 'Software developer'
};

// 测试工具函数
const renderWithProviders = (ui, { initialAuthState = {}, initialTheme = 'light' } = {}) => {
  return render(
    <AuthProvider initialAuthState={initialAuthState}>
      <ThemeProvider initialTheme={initialTheme}>
        {ui}
      </ThemeProvider>
    </AuthProvider>
  );
};

// 模拟 API 调用
jest.mock('../api/user', () => ({
  getUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
}));

import { getUser, updateUser } from '../api/user';

describe('UserProfile Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays user information correctly', async () => {
    getUser.mockResolvedValue(mockUser);

    renderWithProviders(<UserProfile userId={1} />);

    // 等待数据加载
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Software developer')).toBeInTheDocument();

    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toHaveAttribute('src', 'avatar.jpg');
  });

  test('allows user to edit profile', async () => {
    getUser.mockResolvedValue(mockUser);
    updateUser.mockResolvedValue({ ...mockUser, name: 'Jane Doe' });

    renderWithProviders(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // 进入编辑模式
    await user.click(screen.getByRole('button', { name: /edit profile/i }));

    // 修改姓名
    const nameInput = screen.getByDisplayValue('John Doe');
    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Doe');

    // 保存修改
    await user.click(screen.getByRole('button', { name: /save/i }));

    // 验证 API 被调用
    expect(updateUser).toHaveBeenCalledWith(1, {
      ...mockUser,
      name: 'Jane Doe'
    });

    // 验证 UI 更新
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('validates form inputs', async () => {
    getUser.mockResolvedValue(mockUser);

    renderWithProviders(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // 进入编辑模式
    await user.click(screen.getByRole('button', { name: /edit profile/i }));

    // 清空姓名（必填字段）
    const nameInput = screen.getByDisplayValue('John Doe');
    await user.clear(nameInput);

    // 尝试保存
    await user.click(screen.getByRole('button', { name: /save/i }));

    // 验证错误信息
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();

    // 验证保存按钮被禁用
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  test('handles loading state', async () => {
    // 模拟慢速 API
    getUser.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockUser), 1000)));

    renderWithProviders(<UserProfile userId={1} />);

    // 验证加载状态
    expect(screen.getByTestId('profile-loading')).toBeInTheDocument();
    expect(screen.getByText('Loading profile...')).toBeInTheDocument();

    // 等待加载完成
    await waitFor(() => {
      expect(screen.queryByTestId('profile-loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    getUser.mockRejectedValue(new Error('User not found'));

    renderWithProviders(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load profile/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  test('is accessible', async () => {
    getUser.mockResolvedValue(mockUser);

    const { container } = renderWithProviders(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // 验证 ARIA 标签
    expect(screen.getByRole('button', { name: /edit profile/i })).toHaveAttribute('aria-label');

    // 验证键盘导航
    await user.tab();
    expect(screen.getByRole('button', { name: /edit profile/i })).toHaveFocus();

    // 验证屏幕阅读器支持
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toHaveAttribute('aria-label', 'John Doe avatar');
  });

  test('confirms destructive actions', async () => {
    getUser.mockResolvedValue(mockUser);

    renderWithProviders(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // 点击删除按钮
    await user.click(screen.getByRole('button', { name: /delete profile/i }));

    // 验证确认对话框
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();

    // 取消删除
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    // 验证对话框关闭
    expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});`,
		benefits: ["用户行为测试", "可访问性友好", "重构安全", "维护简单"],
		features: ["查询方法", "用户事件", "异步处理", "模拟工具"],
		performance: {
			executionTime: "秒级",
			coverage: "组件级",
			maintenance: "简单",
		},
	},
];

export default function TestingFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<TestingExample | null>(null);

	const getCategoryColor = (category: TestingExample["category"]) => {
		switch (category) {
			case "Unit":
				return "text-blue-600 bg-blue-100";
			case "Integration":
				return "text-green-600 bg-green-100";
			case "E2E":
				return "text-purple-600 bg-purple-100";
			case "Visual":
				return "text-cyan-600 bg-cyan-100";
			case "Performance":
				return "text-orange-600 bg-orange-100";
			case "Accessibility":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: TestingExample["difficulty"]) => {
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

	const getStatusColor = (status: TestingExample["status"]) => {
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

	const getStatusText = (status: TestingExample["status"]) => {
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
								<FlaskConical className="h-8 w-8 text-purple-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">测试策略特性</h1>
									<p className="text-gray-600">Next.js 完整测试方案：单元测试、集成测试、E2E 测试、视觉测试</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 测试方案对比 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">测试方案对比</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Code className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="mb-2 font-semibold text-blue-900">单元测试</h3>
								<p className="text-blue-700 text-sm">组件/函数</p>
								<div className="mt-2 text-blue-600 text-xs">
									<div>⚡ 快速反馈</div>
									<div>🎯 单元隔离</div>
									<div>🔧 易于调试</div>
								</div>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Bug className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="mb-2 font-semibold text-green-900">集成测试</h3>
								<p className="text-green-700 text-sm">组件交互</p>
								<div className="mt-2 text-green-600 text-xs">
									<div>🔗 交互测试</div>
									<div>👤 用户行为</div>
									<div>♿ 可访问性</div>
								</div>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Shield className="h-6 w-6 text-purple-600" />
								</div>
								<h3 className="mb-2 font-semibold text-purple-900">E2E 测试</h3>
								<p className="text-purple-700 text-sm">完整流程</p>
								<div className="mt-2 text-purple-600 text-xs">
									<div>🌐 真实场景</div>
									<div>📱 跨浏览器</div>
									<div>🎮 可视调试</div>
								</div>
							</div>
							<div className="rounded-lg bg-cyan-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Zap className="h-6 w-6 text-cyan-600" />
								</div>
								<h3 className="mb-2 font-semibold text-cyan-900">视觉测试</h3>
								<p className="text-cyan-700 text-sm">UI 回归</p>
								<div className="mt-2 text-cyan-600 text-xs">
									<div>🎨 设计一致</div>
									<div>📸 快照对比</div>
									<div>📖 文档驱动</div>
								</div>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<FlaskConical className="h-6 w-6 text-orange-600" />
								</div>
								<h3 className="mb-2 font-semibold text-orange-900">性能测试</h3>
								<p className="text-orange-700 text-sm">Web Vitals</p>
								<div className="mt-2 text-orange-600 text-xs">
									<div>📊 性能监控</div>
									<div>🚀 用户体验</div>
									<div>📈 持续优化</div>
								</div>
							</div>
							<div className="rounded-lg bg-red-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Shield className="h-6 w-6 text-red-600" />
								</div>
								<h3 className="mb-2 font-semibold text-red-900">可访问性</h3>
								<p className="text-red-700 text-sm">A11y 测试</p>
								<div className="mt-2 text-red-600 text-xs">
									<div>♿ WCAG 标准</div>
									<div>🎤 屏幕阅读器</div>
									<div>⌨️ 键盘导航</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 测试示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">实现示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{testingExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-purple-500" : ""
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
												<span>⏱️ {example.performance.executionTime}</span>
												<span>📊 {example.performance.coverage}</span>
											</div>
											<span>🔧 {example.performance.maintenance}</span>
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
												<div className="font-medium text-gray-900">执行时间</div>
												<div className="text-gray-600">{selectedExample.performance.executionTime}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">覆盖范围</div>
												<div className="text-gray-600">{selectedExample.performance.coverage}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">维护成本</div>
												<div className="text-gray-600">{selectedExample.performance.maintenance}</div>
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
												<span className="font-medium">该测试方案已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<FlaskConical className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个测试方案</h3>
									<p className="text-gray-600">点击左侧的测试方案查看详细信息和代码示例</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
