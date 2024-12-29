'use client';
import { useState } from 'react';
import Icon from '../ui/Icon';
import RootNavItem from './RootNavItem';
import Link from 'next/link';

interface Props {
  allCategory: Category[]
}

export default function Navigation({ allCategory }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderCategory = () => {
    return allCategory.map((category) => (
      <RootNavItem
        key={category.path}
        display={category.display}
        href={`/category/${category.path}`}
        subCategories={category.subCategories}
        onClick={() => setIsExpanded(false)}
      />
    ));
  };

  return (
    <>
      {/* 모바일용 열기 버튼 */}
      <button className='block fixed top-4 left-3 lg:hidden' 
        onClick={() => setIsExpanded(!isExpanded)}>
        <Icon icon='menu' className={`absolute size-8 ${isExpanded ? 'invisible' : 'visible'}`}/>
      </button>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-0"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <nav className={`${isExpanded ? 'flex flex-col' : 'hidden'} lg:flex h-full bg-[#EFE3C2] lg:bg-inherit lg:w-72 lg:mt-8 text-xl overflow-auto z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className='px-8'>
          <h1 className='my-4 border-b-4 border-b-[#FFFDEC] lg:hidden'><Link href='/' onClick={() => setIsExpanded(false)}>R3 Blog</Link></h1>
          {renderCategory()}
        </ul>
      </nav>
    </>
  );
}
