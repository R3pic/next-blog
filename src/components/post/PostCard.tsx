'use client';
import { formatDateString } from '@/libs/date';
import Image from 'next-export-optimize-images/image';
import Link from 'next/link';

interface PostCardProps {
  slug: string
  thumbnail: string | null;
  title: string;
  date: Date;
  category: Category;
  description?: string;
}

export default function PostCard({ thumbnail, title, date, category, description, slug }: PostCardProps) {
  const href = `/post/${slug}`;
  return (
    <div
      className="relative
      border-b-2 dark:border-b-dark-foreground
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
      ">
      {/* 실제 썸네일 */}
      <Link href={href}>
        <Image
          className="w-36 h-24 object-cover
          lg:m-0 lg:h-60 lg:w-80
          hover:brightness-105"
          src={thumbnail ? thumbnail : '/img/empty.jpg'}
          alt={`${title} thumbnail`}
          width={320}
          height={240}
        />
      </Link>
      {/* 정보 */}
      <div className="absolute flex flex-col w-[80%] left-[20%] lg:w-3/4 h-3/4 lg:left-1/4 top-1/2 p-4 lg:p-6
      text-sm
      transform -translate-y-1/2
      bg-white bg-opacity-90
      dark:bg-dark-background dark:bg-opacity-90
      bg-[url('/img/tile.png')]
      rounded-l-lg
      ">
        <p className="lg:text-2xl line-clamp-1 mb-0">
          <Link className="text-yellow-500 lg:text-yellow-500 hover:text-red-400" href={href}>{title}</Link> 
        </p>
        <p className='mb-0 h-14 lg:m-2 line-clamp-2'>
          <Link className="text-light-foreground lg:text-light-foreground dark:text-dark-foreground hover:no-underline"href={href}>{description}</Link>
        </p>
        <p className='mt-auto mb-0 whitespace-nowrap'>
          <Link className='text-green-600 lg:text-green-600' href={`/category/${category.path}`}>{ category.display }</Link> · { formatDateString(date) }
        </p>
      </div>
    </div>
  );
}