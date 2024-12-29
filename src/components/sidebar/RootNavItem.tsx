'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '../ui/Icon';

interface RootNavItemProps {
  display: string;
  href: string;
  subCategories: Category[];
  onClick: () => void;
}

function NavItem({ display, href, subCategories, onClick }: RootNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const ExpanderStyle = `stroke-light-foreground dark:stroke-dark-foreground 
                          transition-transform duration-300 
                          ${isExpanded ? '' : 'rotate-180'}
                          hover:stroke-blue-500
                          hover:scale-110`;

  return (
    <li id="nav-child" className="px-4">
      <div className='py-2 flex justify-between'>
        <Link href={href} className="transition-all duration-300
                    text-lg 
                    hover:underline
                    hover:scale-90 ">
          - {display}
        </Link>
        {subCategories.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon
              icon="expander"
              className={ExpanderStyle}
            />
          </button>
        )}
      </div>
      {subCategories.length > 0 && (
        <ul className={`transition-all duration-300 ease-in-out overflow-hidden
                        ${isExpanded ? 'opacity-100 max-h-[30rem]' : 'opacity-0 max-h-0'}`}>
          {subCategories.map((subCategory) => (
            <NavItem
              key={subCategory.path}
              display={subCategory.display}
              href={`/category/${subCategory.path}`}
              subCategories={subCategory.subCategories}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function RootNavItem({ display, href, subCategories, onClick }: RootNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li id="nav-el">
      <div className="flex lg:p-4 justify-between gap-4">
        <button className='grow relative group' onClick={onClick}>
          {/* 노란색 원 */}
          <span
            className="absolute hidden lg:inline top-1/2 -left-2.5 -translate-y-1/2 w-12 h-12 rounded-full 
                    bg-yellow-400/50
                    dark:bg-[#464647]/50
                    transition-all duration-300 
                    group-hover:w-48
                    group-hover:bg-yellow-400
                    dark:group-hover:bg-[#464647]
                    group-hover:translate-x-2
                    group-hover:scale-y-90
                    ">
            <Icon icon='hash' size={20} className='absolute -left-2 top-3.5 transition-transform transform-origin'/>
          </span>
          {/* 글자 */}
          <Link className="block pl-2
                    border-b-2
                    border-b-[#FFFDEC]
                    mb-4
                    lg:mb-0
                    lg:border-b-0
                    text-left
                    transition-transform duration-300 ease-in-out transform 
                    group-hover:scale-95
                    group-hover:underline
                    group-hover:underline-offset-4
                    group-hover:font-semibold" href={href} >{display}</Link>
        </button>
        {subCategories.length > 0 && 
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <Icon icon="expander"
              className={`stroke-light-foreground dark:stroke-dark-foreground 
                ${isExpanded ? '' : 'rotate-180'}
                hover:stroke-blue-500
                transition-transform duration-300 
                hover:scale-110`}
            />
          </button>}
      </div>

      {subCategories.length > 0 && (
        <>
          <ul className={`flex flex-col overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-[30rem] h-auto opacity-100' : 'max-h-[0rem] opacity-0'
          }`}
          style={{
            transformOrigin: 'top',
          }}>
            {subCategories.map((subCategory) => (
              <NavItem
                key={subCategory.path}
                display={subCategory.display}
                href={`/category/${subCategory.path}`}
                subCategories={subCategory.subCategories}
                onClick={onClick}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  );
}
