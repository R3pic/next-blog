import { BlogCategory } from './category';
import { BlogPost } from './post';
import { getRoot, removeSlug } from './utils';

const blogCategory = new BlogCategory();
const blogPost = new BlogPost(blogCategory);

/* 게시글 */
export function getPost(slug: string) {
  return blogPost.getPost(slug);
}

export function getAllPost() {
  return blogPost.getAllPost();
}

export function getPostFromCategory(categoryPath: CategoryPath) {
  return blogPost.getPostFromCategory(categoryPath);
}

export function getAllPostFromTag(tag: Tag) {
  return blogPost.getPostFromTag(tag);
}

/* 카테고리 */
export function getCategory(categoryPath: CategoryPath) {
  return blogCategory.getCategory(categoryPath);
}

export function getAllCategoryPath() {
  return blogCategory.getAllCategoryPath();
}

export function getAllCategory() {
  return blogCategory.getAllCategory();
}

export function getAllRootCategory() {
  return blogCategory.getAllCategory().filter(({ level }) => level === 1).sort((a, b) => a.order - b.order);
}

export function getRootCategory(categoryPath: CategoryPath) {
  return blogCategory.getCategory(getRoot(categoryPath));
}

export function getParentCategory(categoryPath: CategoryPath) {
  return blogCategory.getCategory(removeSlug(categoryPath));
}

export function getCategoryChain(categoryPath: CategoryPath) {
  const splitedPath = categoryPath.split('/');
  let basePath = '';
  const chain: Category[] = [];
  splitedPath.forEach((slug) => {
    basePath = basePath ? `${basePath}/${slug}` : slug;
    const category = getCategory(basePath);
    if (category)
      chain.push(category);
  });
  return chain;
}

/* 태그 */
export function getAllTag() {
  return blogPost.getAllTag();
}