'use client';
import { useState } from 'react';
import type { CategoryTreeNode } from '@/libs/blog/Category';
import Link from 'next/link';
import Icon from '../Icon';

interface RootNavItemProps {
  display: string;
  href: string;
  subCategories: CategoryTreeNode[];
}

function NavItem({ display, href, subCategories }: RootNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li id="nav-child" className="relative">
      <div className="relative p-2">
        <Link href={href} className="relative">
          {/* 글자 */}
          <span className="relative transition-all duration-300 inline-block select-none
                    text-lg 
                    hover:underline
                    hover:scale-90
                    ">
            - {display}
          </span>
        </Link>
      </div>
      {subCategories.length > 0 && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-2.5 right-0"
          >
            <Icon
              icon="expander"
              className={`stroke-light-foreground dark:stroke-dark-foreground 
                          transition-transform duration-300 
                          ${isExpanded ? '' : 'rotate-180'}
                          hover:stroke-blue-500
                          hover:scale-110
                            `}
            />
          </button>
          <ul className={`pl-4 transition-opacity duration-300 ease-in-out overflow-hidden
                        ${isExpanded ? 'opacity-100 visible' : 'opacity-0 max-h-0 invisible'}`}>
            {subCategories.map((subCategory) => (
              <NavItem
                key={subCategory.path}
                display={subCategory.display}
                href={`/category/${subCategory.path}`}
                subCategories={subCategory.children}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

export default function RootNavItem({ display, href, subCategories }: RootNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li id="nav-el" className="relative">
      <Link href={href} className="flex p-4 relative group">
        {/* 노란색 원 */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-12 h-12 rounded-full 
                        bg-yellow-400/50
                        dark:bg-[#464647]/50
                        transition-all duration-300 
                        group-hover:w-[90%] 
                        group-hover:bg-yellow-400
                        dark:group-hover:bg-[#464647]"
        />
        {/* 글자 */}
        <span
          className="relative select-none
                        transition-all duration-300 ease-in-out transform 
                        group-hover:text-lg
                        group-hover:underline"
        >
          {display}
        </span>
      </Link>
      {subCategories.length > 0 && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-[1.125rem] right-0"
          >
            <Icon
              icon="expander"
              className={`stroke-light-foreground dark:stroke-dark-foreground 
                            transition-transform duration-300 
                            ${isExpanded ? '' : 'rotate-180'}
                            hover:stroke-blue-500
                            hover:scale-110`}
            />
          </button>
          <ul className={`pl-4 transition-opacity duration-300 ease-in-out overflow-hidden ${isExpanded ? 'opacity-100 max-h-[500px] visible' : 'opacity-0 max-h-0 invisible'}`}>
            {subCategories.map((subCategory) => (
              <NavItem
                key={subCategory.path}
                display={subCategory.display}
                href={`/category/${subCategory.path}`}
                subCategories={subCategory.children}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  );
}
