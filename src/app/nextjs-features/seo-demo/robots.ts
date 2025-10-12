import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://your-domain.com/sitemap.xml',
  };
}