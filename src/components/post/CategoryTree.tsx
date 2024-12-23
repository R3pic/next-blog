import { getCategory } from '@/libs/blog/Category';
import Link from 'next/link';
import Icon from '../Icon';

interface PostCategoryTreeProps {
  title?: string;
  category: string;
}

export default function CategoryTree({ category, title }: PostCategoryTreeProps) {
  const render = () => {
    if (category === '/')
      return (
        <Link
          className='text-blue-400 dark:text-yellow-600'
          key={'/'}
          href={'/'}
        >
          홈
        </Link>
      );
    // 카테고리가 있다면
    const splitedCategory = category.split('/');
    let categoryPath = '';

    return splitedCategory.map((categorySlug) => {
      categoryPath = categoryPath ? `${categoryPath}/${categorySlug}` : categorySlug;
      const category = getCategory(categoryPath);
      if (category)
        return [
          <Link
            className='text-blue-400 dark:text-yellow-600'
            key={category.slug}
            href={`/category/${category.path}`}
          >
            {category.display}
          </Link>,
          ' > ',
        ];
    });
  };

  return (
    <div className="mx-8">
      <p className="py-5 text-lg flex items-center">
        <Icon
          icon="home"
          className="inline-block w-5 h-5 mr-2
                    fill-light-foreground 
                    dark:fill-dark-foreground"
        />
        <span>
          {render()}
          {title}
        </span>
      </p>
    </div>
  );
}