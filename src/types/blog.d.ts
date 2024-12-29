type Slug = string;
type CategoryPath = string;
type Tag = string;

type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: Date;
  category: Category;
  thumbnail: string | null;
  tags: string[];
};

type PostFrontMatter = {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  thumbnail: string | null;
};

type Category = {
  level: number;
  slug: string;
  path: string;
  display: string;
  order: number;
  subCategories: Category[]
};

type CategoryFrontMatter = {
  display: string,
  order: number,
};