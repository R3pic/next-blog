import { BASE_URL } from '@/libs/const';
import type { MetadataRoute } from 'next';
import { CategoryService, PostService } from 'r3-blog';

export const dynamic = 'force-static';

const BasePostURL = `${BASE_URL}/post`;
const BaseCategoryURL = `${BASE_URL}/category`;
 
export default function sitemap(): MetadataRoute.Sitemap {
  const categoryService = new CategoryService();
  const postService = new PostService();

  const allPostSlug = postService.getAllPost().map((post) => post.slug);
  const allCategoryPath = categoryService.getAllCategoryPath();

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