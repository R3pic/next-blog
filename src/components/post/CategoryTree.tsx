import Link from 'next/link';
import Icon from '../ui/Icon';
import { CategoryService } from 'r3-blog';

interface PostCategoryTreeProps {
  title?: string;
  categoryPath: string;
}

export default function CategoryTree({ categoryPath, title }: PostCategoryTreeProps) {
  const render = () => {
    if (categoryPath === '/')
      return (
        <Link
          className='text-blue-400 dark:text-yellow-600'
          key={'/'}
          href={'/'}
        >
          홈
        </Link>
      );
    const categoryService = new CategoryService();
    const categoryChain = categoryService.getCategoryChain(categoryPath);
    return categoryChain.map((category) => {
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
      <p className="py-5 mb-0 text-lg flex gap-2 items-center">
        <Icon
          icon="home"
          className="w-5 h-5 fill-light-foreground dark:fill-dark-foreground"
        />
        <span className='mt-1'>
          {render()}
          {title}
        </span>
      </p>
    </div>
  );
}