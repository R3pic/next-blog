import { getCategory } from '@/libs/blog/Category';
import { FormatDate } from '@/libs/date';
import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  slug: string
  thumbnail?: string;
  title: string;
  date: Date;
  category: string;
  previewText?: string;
}

export default function PostCard({ thumbnail, title, date, category, previewText, slug }: PostCardProps) {
  const href = `/post/${slug}`;

  const renderCategorytree = () => {
    const splitedCategory = category.split('/');
    const displayCategory = splitedCategory.slice(-2);
    let categoryPath = splitedCategory.slice(0, splitedCategory.length - 2).join('/');

    return (displayCategory.map((slug, i) => {
      categoryPath = categoryPath ? `${categoryPath}/${slug}` : slug;
      const category = getCategory(categoryPath);
      if (category) {
        return [
          <Link
            className='text-green-600'
            key={category.slug}
            href={`/category/${category.path}`}
          >
            {category.display}
          </Link>,
          (i + 1 !== splitedCategory.length ? ' / ' : '')
        ];
      }
    }));
  };

  return (
    <div
      className="relative max-h-80 
      border-b-2 dark:border-b-dark-foreground
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
      ">
      {/* 실제 썸네일 */}
      <Link href={href}>
        <Image
          className="m-0 h-60 w-80 object-cover hover:brightness-105"
          src={thumbnail ? thumbnail : '/img/empty.jpg'}
          alt={`${title} thumbnail`}
          width={320}
          height={240}
        />
      </Link>
      {/* 정보 */}
      <div className="absolute flex flex-col w-3/4 h-3/4 left-1/4 top-1/2 p-6 aspect-square
      transform -translate-y-1/2
      bg-white bg-opacity-90
      dark:bg-dark-background dark:bg-opacity-90
      bg-[url('/img/tile.png')]
      rounded-l-lg
      ">
        <Link className="text-2xl text-yellow-500 hover:text-red-400 line-clamp-1"
          href={href}
        >
          <p>{title}</p>
        </Link>
        <Link
          className="m-2 h-14 line-clamp-2 text-light-foreground dark:text-dark-foreground"
          href={href}
        >
          <p>{previewText}</p>
        </Link>
        <p>
          {renderCategorytree()} · {FormatDate(date)}
        </p>
      </div>
    </div>
  );
}