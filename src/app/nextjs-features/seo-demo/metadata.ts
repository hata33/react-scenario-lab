import { Metadata } from 'next';

// 动态生成面包屑结构化数据
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// 生成FAQ结构化数据
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// 生成产品/服务结构化数据
export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "SEO 优化服务",
    "name": "Next.js SEO 优化咨询",
    "description": "专业的 Next.js SEO 优化服务，提升网站搜索排名和用户体验",
    "provider": {
      "@type": "Organization",
      "name": "Next.js 实验室",
      "url": "https://your-domain.com"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO 服务目录",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO 审计",
            "description": "全面的网站 SEO 状况分析"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "技术 SEO 优化",
            "description": "网站结构和性能优化"
          }
        }
      ]
    }
  };
}

// 生成视频结构化数据（如果有视频内容）
export function generateVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Next.js SEO 优化教程视频",
    "description": "详细讲解 Next.js 相比 React SPA 的 SEO 优势",
    "thumbnailUrl": "https://your-domain.com/video-thumbnail.jpg",
    "uploadDate": "2024-01-15T00:00:00+00:00",
    "duration": "PT5M30S",
    "contentUrl": "https://your-domain.com/video.mp4",
    "embedUrl": "https://your-domain.com/video-embed",
    "publisher": {
      "@type": "Organization",
      "name": "Next.js 实验室"
    }
  };
}

// 生成How-To结构化数据
export function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "如何实现 Next.js SEO 优化",
    "description": "分步骤指导您实现 Next.js 应用的 SEO 优化",
    "image": "https://your-domain.com/how-to-image.jpg",
    "totalTime": "PT30M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Next.js 项目"
      },
      {
        "@type": "HowToSupply",
        "name": "文本编辑器"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "配置元数据",
        "text": "在页面组件中添加 metadata 配置",
        "image": "https://your-domain.com/step1.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "添加结构化数据",
        "text": "使用 JSON-LD 格式添加结构化数据",
        "image": "https://your-domain.com/step2.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "生成 sitemap",
        "text": "创建动态 sitemap.xml 文件",
        "image": "https://your-domain.com/step3.jpg"
      }
    ]
  };
}

// 生成事件结构化数据（如果有活动）
export function generateEventSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Next.js SEO 优化技术分享会",
    "description": "深入探讨 Next.js SEO 最佳实践和案例分析",
    "startDate": "2024-02-15T19:00:00+08:00",
    "endDate": "2024-02-15T21:00:00+08:00",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://your-domain.com/event-stream"
    },
    "image": [
      "https://your-domain.com/event-banner.jpg"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-15T00:00:00+00:00"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Next.js 实验室",
      "url": "https://your-domain.com"
    }
  };
}