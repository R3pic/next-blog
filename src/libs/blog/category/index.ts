import { globSync } from 'fast-glob';
import fs from 'node:fs';
import Path from 'node:path';
import { CategoryParser } from './CategoryParser';
import { getSlug, removeSlug } from '../utils';

export class BlogCategory {
  private map: Map<CategoryPath, Category>;
  private POST_DIR: string;
  constructor(base_url = '_posts') {
    this.POST_DIR = Path.join(process.cwd(), base_url);
    this.map = new Map<CategoryPath, Category>();
    const matterParser = new CategoryParser();
    const categoryIndexPaths = globSync(['**/_index.md'], { onlyFiles: true, cwd: this.POST_DIR }).reverse();

    categoryIndexPaths.forEach((indexPath) => {
      const filePath = Path.join(this.POST_DIR, indexPath);
      const source = fs.readFileSync(filePath, 'utf-8');

      const frontmatter = matterParser.parse(source);
      
      const path = removeSlug(indexPath).toLowerCase();
      const splitedPath = path.split('/');
      const level = splitedPath.length;
      const slug = getSlug(path);
      const subCategories: Category[] = [];

      globSync(['*/_index.md'], { onlyFiles: true, cwd: Path.join(this.POST_DIR, path) }).forEach((subCategoryIndex) => {
        const categoryPath = `${path}/${removeSlug(subCategoryIndex)}`;
        const category = this.getCategory(categoryPath);
          
        if (category)
          subCategories.push(category);
      });
  
      subCategories.sort((a, b) => a.order - b.order);

      const category: Category = {
        ...frontmatter,
        level,
        slug,
        subCategories,
        path,
      };
      this.map.set(category.path, category);
    });
  }

  getCategory(categoryPath: CategoryPath) {
    return this.map.get(categoryPath);
  }

  getAllCategory() {
    return Array.from(this.map.values());
  }

  getAllCategoryPath() {
    return Array.from(this.map.keys());
  }
}
