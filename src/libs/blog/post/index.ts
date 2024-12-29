import { globSync } from 'fast-glob';
import fs from 'fs';
import Path from 'path';
import matter from 'gray-matter';
import type { BlogCategory } from '../category';
import { getSlug, removeSlug } from '../utils';

export class BlogPost {
  private blogCategory: BlogCategory;
  private map: Map<Slug, Post>;
  private categoryMap: Map<CategoryPath, Post[]>;
  private tagMap: Map<Tag, Post[]>;
  private POST_DIR: string;

  constructor(blogCategory: BlogCategory, base_url = '_posts') {
    this.blogCategory = blogCategory;
    this.map = new Map<Slug, Post>();
    this.categoryMap = new Map<CategoryPath, Post[]>();
    this.tagMap = new Map<Tag, Post[]>();
    this.POST_DIR = Path.join(process.cwd(), base_url);
    const postPaths = globSync(['**/*.mdx'], { onlyFiles: true, cwd: this.POST_DIR });

    postPaths.forEach((postPath) => {
      const post = this.parsePost(postPath);
      this.map.set(post.slug, post);

      this.updateCategoryMap(post);
      this.updateTagMap(post);
    });
  }

  getAllTag() {
    return Array.from(this.tagMap.keys());
  }

  getAllPost() {
    return Array.from(this.map.values());
  }

  getPost(slug: Slug) {
    return this.map.get(slug);
  }

  getPostFromCategory(categoryPath: CategoryPath) {
    return this.categoryMap.get(categoryPath);
  }

  getPostFromTag(tag: Tag) {
    return this.tagMap.get(tag);
  }

  private updateCategoryMap(post: Post) {
    const array = post.category.path.split('/');
    let categoryPath = '';
    array.forEach((slug) => {
      categoryPath = categoryPath ? `${categoryPath}/${slug}` : slug;
      const categoryPosts = this.categoryMap.get(categoryPath);
      if (categoryPosts) {
        categoryPosts.push(post);
      } else {
        this.categoryMap.set(categoryPath, [post]);
      }
    });
  }

  private updateTagMap(post: Post) {
    post.tags.forEach((tag) => {
      const tagPosts = this.tagMap.get(tag);
      if (tagPosts) {
        tagPosts.push(post);
      } else {
        this.tagMap.set(tag, [post]);
      }
    });
  }

  private parsePost(_path: string): Post {
    try {
      const postPath = Path.join(this.POST_DIR, _path);
      const file = fs.readFileSync(postPath, 'utf-8');
      const { data, content } = matter(file);

      const frontmatter = parsePostFrontMatter(data);
    
      const categoryPath = removeSlug(_path);
      const category = this.blogCategory.getCategory(categoryPath);
  
      if (category === undefined) {
        throw new Error(`"${category}" 존재하지 않는 카테고리입니다.`);
      }
  
      const slug = getSlug(postPath).replace('.mdx', '').toLowerCase();
      const post: Post = {
        ...frontmatter,
        category,
        content,
        slug,
      };
    
      return post;
    }
    catch (e) {
      if (e instanceof Error) {
        console.error(`블로그 포스트 파싱 중 에러 발생 경로 : ${_path}`);
      }
      throw e;
    }
  }
}

function parsePostFrontMatter(data: { [key: string]: string | number | Array<unknown>; }): PostFrontMatter {
  const { title, description, date, tags, thumbnail } = data;
  if (!title) throw new PostFrontMatterParseError('title');
  if (!description) throw new PostFrontMatterParseError('description');
  if (!date || (!(date instanceof Date) && typeof date !== 'string')) throw new PostFrontMatterParseError('date');

  return {
    title: String(title),
    description: String(description),
    date: new Date(date),
    tags: Array.isArray(tags) ? tags.map((tag) => String(tag)) : [],
    thumbnail: thumbnail ? String(thumbnail) : null,
  };
}

class PostFrontMatterParseError extends Error {
  constructor(attributeName: string) {
    super(`FrontMatter에 ${attributeName}이(가) 존재하지 않습니다.`);
  }
}