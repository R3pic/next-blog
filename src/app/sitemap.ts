import { getAllCategoryPath, getAllPost } from '@/libs/blog';
import { BASE_URL } from '@/libs/const';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BasePostURL = `${BASE_URL}/post`;
const BaseCategoryURL = `${BASE_URL}/category`;
 
export default function sitemap(): MetadataRoute.Sitemap {
  const allPostSlug = getAllPost().map((post) => post.slug);
  const allCategoryPath = getAllCategoryPath();

  return [
    ...allPostSlug.map((slug) => postToSitemap(slug)),
    ...allCategoryPath.map((slug) => categoryToSitemap(slug))
  ];
}

function postToSitemap(slug: string) {
  return {
    url: `${BasePostURL}/${slug}`
  };
}

function categoryToSitemap(slug: string) {
  return {
    url: `${BaseCategoryURL}/${slug}`
  };
}