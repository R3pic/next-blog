import { globSync } from 'fast-glob';
import { POST_DIR } from '../const';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export class Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: Date;
  category: string;
  thumbnail?: string;
  tags?: string[];
  constructor({
    slug,
    title,
    description,
    content,
    date,
    category,
    thumbnail,
    tags,
  }: {
    slug: string;
    title: string;
    description: string;
    content: string;
    date: Date;
    category: string;
    thumbnail?: string;
    tags?: string[];
  }) {
    this.slug = slug;
    this.title = title;
    this.description = description;
    this.content = content;
    this.date = date;
    this.category = category;
    this.thumbnail = thumbnail;
    this.tags = tags;
  }

  toAbstract(): AbstractPost {
    return {
      title: this.title,
      category: this.category,
      date: this.date,
      thumbnail: this.thumbnail,
      previewText: this.description,
      slug: this.slug,
    };
  }
}

interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
}

export interface AbstractPost extends Pick<Post, 'title' | 'thumbnail' | 'date' | 'category' | 'slug'> {
  previewText?: string;
}

const postMap: Map<string, Post> = new Map();
const categoryPostMap: Map<string, AbstractPost[]> = new Map();

export function getAllPost() {
  if (postMap.size > 0) {
    return Array.from(postMap.values());
  }

  const result = globSync(['**/*.mdx'], { onlyFiles: true, cwd: POST_DIR });

  result.forEach((v) => {
    const post = parsePost(v);
    postMap.set(post.slug, post);

    if (categoryPostMap.get(post.category) === undefined) {
      categoryPostMap.set(post.category, []);
    }

    categoryPostMap.get(post.category)!.push(post.toAbstract());
  });

  return Array.from(postMap.values());
}

export function getAllPostFromCategory(category: string): AbstractPost[] {
  return categoryPostMap.get(category)!;
}

export function getPost(slug: string): Post | undefined {
  return postMap.get(slug);
}

function parsePost(_path: string): Post {
  const postPath = path.join(POST_DIR, _path);
  const file = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(file);

  const frontmatter = data as FrontMatter;

  const { title, description, date, thumbnail } = frontmatter;
  const tags = frontmatter.tags?.map((v) => String(v));
  const category = _path.split('/').slice(0, -1).join('/');
  const slug = (postPath.split('/').at(-1) as string).replace('.mdx', '');
  const post = new Post({
    title,
    description,
    category,
    content,
    date: new Date(date),
    slug,
    tags,
    thumbnail
  });

  return post;
}