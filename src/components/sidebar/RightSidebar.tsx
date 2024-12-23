'use client';
import { useEffect, useState } from 'react';
import { SearchButton } from './SearchButton';
import { ThemeToggle } from './ThemeToggle';
import Toc, { TocData } from './Toc';

export default function RightSidebar() {
  const [tocList, setTocList] = useState<TocData[]>([]);

  useEffect(() => {
    const $postBody = document.querySelector('main');
    if ($postBody) {
      const hTagList = $postBody.querySelectorAll('h1, h2, h3');
      const _tocList: TocData[] = [];
      hTagList.forEach((hTagItem) => {
        if (hTagItem.id) {
          const { id, nodeName, textContent } = hTagItem;
          const level = Number(nodeName.replace('H', ''));
          const text = textContent || '비어있는 H';
          _tocList.push({
            id,
            text,
            level,
          });
        }
      });

      setTocList(_tocList);
    }
  }, []);

  return (
    <>
      {/* 우측 사이드바 */}
      <div className="fixed top-0 w-pagewidth h-16
        items-end
        bg-transparent
        ml-sidebar-min
        desktop:ml-right-sidebar
        desktop:h-full
        ">
        {/* 도구버튼 모음 */}
        <div className="flex items-center p-2 h-16 gap-x-4 
        place-self-end
        desktop:place-self-auto
          ">
          <ThemeToggle />
          <SearchButton />
        </div>
        {/* Toc */}
        <div className='
            h-full
            overflow-hidden
          '>
          {/* Toc */}
          <div className='
              -translate-x-full
              desktop:translate-x-0
              transition-transform duration-500
            '>
            <Toc headers={tocList} />
          </div>
        </div>
      </div>
    </>
  );
}

