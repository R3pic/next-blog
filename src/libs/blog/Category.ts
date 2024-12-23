import { globSync } from 'fast-glob';
import matter from 'gray-matter';
import fs from 'node:fs';
import { POST_DIR } from '../const';
import Path from 'node:path';
import { AbstractPost, getAllPost, getAllPostFromCategory } from './Post';

class Category {
  constructor(
    public level: number,
    public path: string,
    public slug: string,
    public display: string,
    public order: number,
    public posts: AbstractPost[],
    public subCategories?: Category[],
  ) { }
}

interface CategoryFrontMatter {
  display: string,
  order: number,
}

const categoryMap: Map<string, Category> = new Map();

getAllCategory();

export function getAllCategory() {
  if (categoryMap.size > 0) {
    return Array.from(categoryMap.values());
  }
  getAllPost();
  const result = globSync(['**/_index.md'], { onlyFiles: true, cwd: POST_DIR });

  result.forEach((v) => {
    const category = parseCategoryIndex(v);
    categoryMap.set(category.path, category);
  });

  if (categoryMap.size <= 0)
    throw new Error('블로그 카테고리가 존재하지 않습니다.');

  return Array.from(categoryMap.values());
}

export function getCategory(categoryPath: string): Category | undefined {
  return categoryMap.get(categoryPath);
}

function parseCategoryIndex(_path: string): Category {
  const actualPath = Path.join(POST_DIR, _path);
  const source = fs.readFileSync(actualPath, 'utf-8');
  const { data } = matter(source);
  const frontmatter = data as CategoryFrontMatter;

  const path = _path.replace('/_index.md', '');
  const splitedPath = path.split('/');
  const level = splitedPath.length;
  const slug = splitedPath.at(-1) as string;
  const { order, display } = frontmatter;
  const posts = getAllPostFromCategory(path);

  const category: Category = {
    level,
    display,
    path,
    slug,
    order,
    posts,
  };

  return category;
}

export interface CategoryTreeNode {
  display: string;
  path: string;
  slug: string;
  order: number;
  children: CategoryTreeNode[];
}

export function getCategoryTree(): CategoryTreeNode[] {
  const categories = getAllCategory();

  categories.sort((a, b) => a.level - b.level || a.order - b.order);

  const pathToNodeMap: Map<string, CategoryTreeNode> = new Map();
  const rootNodes: CategoryTreeNode[] = [];

  categories.forEach(category => {
    const node: CategoryTreeNode = {
      display: category.display,
      path: category.path,
      slug: category.slug,
      order: category.order,
      children: [],
    };

    pathToNodeMap.set(category.path, node);

    if (category.level === 1) {
      rootNodes.push(node);
    } else {
      const parentPath = category.path.substring(0, category.path.lastIndexOf('/'));
      const parentNode = pathToNodeMap.get(parentPath);

      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });

  return rootNodes;
}