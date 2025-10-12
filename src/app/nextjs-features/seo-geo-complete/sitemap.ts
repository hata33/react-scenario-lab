import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com';
  const currentDate = new Date();

  // 主要页面
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nextjs-features`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nextjs-features/seo-geo-complete`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ];

  // Next.js 特性页面
  const featurePages = [
    {
      url: `${baseUrl}/nextjs-features/seo-demo`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nextjs-features/routing`,
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nextjs-features/server-components`,
      lastModified: new Date('2024-01-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nextjs-features/data-fetching`,
      lastModified: new Date('2024-01-05'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ];

  // 博客文章（SEO相关内容）
  const blogPosts = [
    {
      url: `${baseUrl}/blog/complete-seo-geo-guide`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/nextjs-seo-best-practices`,
      lastModified: new Date('2024-01-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/e-e-a-t-content-strategy`,
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/structured-data-implementation`,
      lastModified: new Date('2024-01-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/local-seo-optimization`,
      lastModified: new Date('2024-01-05'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // 服务和产品页面
  const servicePages = [
    {
      url: `${baseUrl}/services/technical-seo`,
      lastModified: new Date('2024-01-14'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/geo-optimization`,
      lastModified: new Date('2024-01-13'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/content-authority`,
      lastModified: new Date('2024-01-11'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/local-seo`,
      lastModified: new Date('2024-01-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // 资源和文档页面
  const resourcePages = [
    {
      url: `${baseUrl}/resources/seo-tools`,
      lastModified: new Date('2024-01-13'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/geo-strategies`,
      lastModified: new Date('2024-01-12'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/whitepapers`,
      lastModified: new Date('2024-01-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  ];

  // 分类页面
  const categoryPages = [
    {
      url: `${baseUrl}/blog/category/seo`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/category/geo`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/category/nextjs`,
      lastModified: new Date('2024-01-14'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/category/performance`,
      lastModified: new Date('2024-01-13'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ];

  // 作者页面（E-E-A-T 优化）
  const authorPages = [
    {
      url: `${baseUrl}/author/seo-expert`,
      lastModified: new Date('2024-01-14'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/author/technical-consultant`,
      lastModified: new Date('2024-01-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/author/content-strategist`,
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ];

  // 标签页面
  const tagPages = [
    {
      url: `${baseUrl}/tags/seo-optimization`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tags/geo-strategy`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tags/structured-data`,
      lastModified: new Date('2024-01-14'),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tags/core-web-vitals`,
      lastModified: new Date('2024-01-13'),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tags/e-e-a-t`,
      lastModified: new Date('2024-01-12'),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tags/local-seo`,
      lastModified: new Date('2024-01-11'),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    }
  ];

  // 合并所有页面
  return [
    ...mainPages,
    ...featurePages,
    ...blogPosts,
    ...servicePages,
    ...resourcePages,
    ...categoryPages,
    ...authorPages,
    ...tagPages
  ];
}