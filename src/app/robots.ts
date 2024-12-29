import { BASE_URL } from '@/libs/const';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: 'Googlebot',
      allow: ['/'],
      disallow: '/private/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}