import matter from 'gray-matter';

export class CategoryParser {  
  constructor() {}

  parse(source: string): CategoryFrontMatter {
    const { data } = matter(source);
    const frontmatter: Partial<CategoryFrontMatter> = data;

    if (frontmatter.display === undefined)
      throw new Error(`올바르지 않은 카테고리 index 파일입니다. \n올바른 파일 형식 : \n${CATEGORY_INDEX_TEMPLATE}`);
    if (frontmatter.order === undefined)
      frontmatter.order = 0;

    return frontmatter as CategoryFrontMatter;
  }
}

const CATEGORY_INDEX_TEMPLATE = `---
display: 보여질 카테고리 이름
order: 0 (정렬 강도 작을수록 위에 위치함)
---`;