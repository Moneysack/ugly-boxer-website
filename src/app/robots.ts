import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/ranking/vote'],
    },
    sitemap: 'https://uglyboxer.com/sitemap.xml',
  };
}
