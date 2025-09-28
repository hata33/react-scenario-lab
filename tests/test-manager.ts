/**
 * 测试管理器 - 统一管理所有测试
 */
import { spawn } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface TestSuite {
  name: string;
  description: string;
  command: string;
  category: 'integration' | 'e2e' | 'unit' | 'performance';
}

class TestManager {
  public testSuites: TestSuite[] = [
    {
      name: '扫码登录基础测试',
      description: '测试扫码登录的核心功能流程',
      command: 'npx ts-node tests/run-qr-login-test.ts',
      category: 'integration',
    },
    {
      name: 'Jest集成测试',
      description: '使用Jest框架的完整测试套件',
      command: 'npm test -- --testPathPattern=qr-login.test.ts',
      category: 'integration',
    },
    {
      name: '大文件上传测试',
      description: '测试大文件上传功能',
      command: 'npm run test:file-upload',
      category: 'integration',
    },
    {
      name: '性能测试',
      description: '性能基准测试',
      command: 'npx ts-node tests/run-performance-test.ts',
      category: 'performance',
    },
    {
      name: 'E2E测试',
      description: '端到端用户界面测试',
      command: 'npx playwright test tests/e2e/',
      category: 'e2e',
    },
  ];

  private colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    bright: '\x1b[1m',
  };

  log(message: string, color: keyof typeof this.colors = 'reset') {
    console.log(`${this.colors[color]}${message}${this.colors.reset}`);
  }

  listTests() {
    this.log('📋 可用的测试套件:', 'blue');
    this.log('=====================================', 'cyan');

    const categories = Array.from(new Set(this.testSuites.map(t => t.category)));

    categories.forEach(category => {
      this.log(`\n${this.colors.bright}${category.toUpperCase()}${this.colors.reset}`, 'yellow');
      this.log('─'.repeat(50), 'cyan');

      this.testSuites
        .filter(suite => suite.category === category)
        .forEach((suite, index) => {
          this.log(`${index + 1}. ${suite.name}`, 'green');
          this.log(`   ${suite.description}`, 'cyan');
          this.log(`   命令: ${suite.command}`, 'blue');
          this.log('');
        });
    });
  }

  async runTest(testName: string) {
    const suite = this.testSuites.find(t => t.name.includes(testName) || t.name === testName);

    if (!suite) {
      this.log(`❌ 找不到测试: ${testName}`, 'red');
      this.log('使用 "npm run test:manager list" 查看所有可用测试', 'yellow');
      return false;
    }

    this.log(`🚀 运行测试: ${suite.name}`, 'blue');
    this.log(`📝 ${suite.description}`, 'cyan');
    this.log('⏳ 开始执行...', 'yellow');
    this.log('=====================================', 'magenta');

    return new Promise<boolean>((resolve) => {
      const [command, ...args] = suite.command.split(' ');
      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          this.log('✅ 测试通过!', 'green');
          resolve(true);
        } else {
          this.log(`❌ 测试失败，退出码: ${code}`, 'red');
          resolve(false);
        }
      });

      child.on('error', (error) => {
        this.log(`💥 测试执行出错: ${error.message}`, 'red');
        resolve(false);
      });
    });
  }

  async runAllTests() {
    this.log('🧪 运行所有测试套件', 'magenta');
    this.log('=====================================', 'cyan');

    const results: boolean[] = [];

    for (const suite of this.testSuites) {
      this.log(`\n📋 运行: ${suite.name}`, 'blue');
      const result = await this.runTest(suite.name);
      results.push(result);
    }

    this.log('\n=====================================', 'magenta');
    this.log('📊 测试结果总结:', 'blue');

    const passedCount = results.filter(r => r).length;
    const totalCount = results.length;

    this.log(`通过: ${passedCount}/${totalCount}`, passedCount === totalCount ? 'green' : 'yellow');

    if (passedCount === totalCount) {
      this.log('🎉 所有测试都通过了!', 'magenta');
    } else {
      this.log(`❌ ${totalCount - passedCount} 个测试失败`, 'red');
    }

    return passedCount === totalCount;
  }

  async runTestsByCategory(category: string) {
    const validCategories = Array.from(new Set(this.testSuites.map(t => t.category)));

    if (!validCategories.includes(category as any)) {
      this.log(`❌ 无效的测试类别: ${category}`, 'red');
      this.log(`有效类别: ${validCategories.join(', ')}`, 'yellow');
      return false;
    }

    const categorySuites = this.testSuites.filter(t => t.category === category);

    this.log(`🧪 运行 ${category} 类别的测试`, 'magenta');
    this.log('=====================================', 'cyan');

    const results: boolean[] = [];

    for (const suite of categorySuites) {
      this.log(`\n📋 运行: ${suite.name}`, 'blue');
      const result = await this.runTest(suite.name);
      results.push(result);
    }

    const passedCount = results.filter(r => r).length;
    const totalCount = results.length;

    this.log(`\n${category} 测试结果: ${passedCount}/${passedCount} 通过`,
      passedCount === totalCount ? 'green' : 'yellow');

    return passedCount === totalCount;
  }

  showHelp() {
    this.log('📖 测试管理器使用说明:', 'blue');
    this.log('=====================================', 'cyan');
    this.log('命令:', 'green');
    this.log('  npm run test:manager list          - 列出所有测试', 'yellow');
    this.log('  npm run test:manager all           - 运行所有测试', 'yellow');
    this.log('  npm run test:manager <test-name>  - 运行指定测试', 'yellow');
    this.log('  npm run test:manager <category>   - 运行指定类别测试', 'yellow');
    this.log('');
    this.log('示例:', 'green');
    this.log('  npm run test:manager "扫码登录"', 'yellow');
    this.log('  npm run test:manager integration', 'yellow');
    this.log('  npm run test:manager performance', 'yellow');
    this.log('');
    this.log('测试类别:', 'green');
    const categories = Array.from(new Set(this.testSuites.map(t => t.category)));
    categories.forEach(cat => this.log(`  - ${cat}`, 'yellow'));
  }

  async runTestsByPattern(pattern: string) {
    const matchingSuites = this.testSuites.filter(suite =>
      suite.name.toLowerCase().includes(pattern.toLowerCase()) ||
      suite.description.toLowerCase().includes(pattern.toLowerCase())
    );

    if (matchingSuites.length === 0) {
      this.log(`❌ 找不到匹配 "${pattern}" 的测试`, 'red');
      return false;
    }

    this.log(`🧪 运行匹配 "${pattern}" 的测试`, 'magenta');
    this.log('=====================================', 'cyan');

    const results: boolean[] = [];

    for (const suite of matchingSuites) {
      this.log(`\n📋 运行: ${suite.name}`, 'blue');
      const result = await this.runTest(suite.name);
      results.push(result);
    }

    const passedCount = results.filter(r => r).length;
    const totalCount = results.length;

    this.log(`\n匹配 "${pattern}" 的测试结果: ${passedCount}/${totalCount} 通过`,
      passedCount === totalCount ? 'green' : 'yellow');

    return passedCount === totalCount;
  }
}

// 命令行接口
if (require.main === module) {
  const manager = new TestManager();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    manager.showHelp();
    process.exit(0);
  }

  const command = args[0];

  switch (command) {
    case 'list':
      manager.listTests();
      break;
    case 'all':
      manager.runAllTests().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    case 'help':
    case '--help':
    case '-h':
      manager.showHelp();
      break;
    default:
      // 检查是否是测试类别
      const categories = Array.from(new Set(manager.testSuites.map(t => t.category)));
      if (categories.includes(command as any)) {
        manager.runTestsByCategory(command).then(success => {
          process.exit(success ? 0 : 1);
        });
      } else {
        // 按名称或模式匹配测试
        manager.runTestsByPattern(command).then(success => {
          process.exit(success ? 0 : 1);
        });
      }
      break;
  }
}

export default TestManager;