import { FormatDate } from '@/libs/date';
import React from 'react';
import Icon from '../Icon';
import Link from 'next/link';

interface PostTitleProps {
  title: string;
  category: string;
  date: Date;
  thumbnail?: string;
}

export default function PostTitle({ title, category, date, thumbnail }: PostTitleProps) {
  const categorySlug = category.split('/').at(-1) as string;

  return (
    <div
      style={{ '--image-url': `url(${thumbnail})` } as React.CSSProperties}
      className={`
        px-6 py-16 aspect-thumbnail
        bg-[image:var(--image-url)]
        bg-cover bg-center
    `}
    >
      <div
        className="flex flex-col h-full items-center
            justify-center
            bg-white/50 backdrop-blur-sm
            dark:bg-zinc-700/50
        "
      >
        {/* 반투명 */}
        <div className="flex flex-col items-center gap-16">
          <p className="px-32 font-bold text-3xl text-center whitespace-normal break-keep
                dark:text-[#ddd]
                transition-colors duration-300
            ">
            {title}
          </p>
          <div className="flex gap-4">
            <Link
              className="relative px-4 py-2
              text-light-foreground
              bg-transparent rounded-lg dark:text-[#ddd] 
              hover:shadow-xl transition duration-300 
              group"
              href={`/category/${category}`}
            >
              <Icon icon='folder' className="inline-block mr-1" />
              {categorySlug}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#A1D6CB]">
                <div className="h-full origin-left scale-x-0 
                        bg-gradient-to-r from-red-300 to-blue-300
                        transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Link>
            <button
              className="relative px-4 py-2 bg-transparent rounded-lg dark:text-[#ddd] hover:shadow-xl transition duration-300 group"
            >
              <Icon icon='calendar' className="inline-block mr-1" />
              {FormatDate(date)}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#A1D6CB]">
                <div className="h-full origin-left scale-x-0 
                        bg-gradient-to-r from-red-300 to-blue-300
                        transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}