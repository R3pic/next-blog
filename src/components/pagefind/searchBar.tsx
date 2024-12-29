/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
//https://www.petemillspaugh.com/nextjs-search-with-pagefind
'use client';
import { useEffect, useRef } from 'react';

export const SearchBar = ({ isModalOpen }: { isModalOpen: boolean }) => {
  const pagefindInstance = useRef<PageFindUI>(null);

  useEffect(() => {
    const initializePagefind = () => {
      const PagefindUI = typeof window.PagefindUI !== 'undefined' && window.PagefindUI;
      if (PagefindUI) {
        try {
          pagefindInstance.current = new PagefindUI({
            element: '#search',
            pageSize: 5,
            resetStyles: true,
            showImages: true,
            translations: {
              clear_search: 'X',
            },
          });

          const pagefindDrawer = document.querySelector('.pagefind-ui__drawer');

          if (pagefindDrawer) {
            const observer = new MutationObserver(() => {
              const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.pagefind-ui__result-link');

              for (const link of links) {
                link.href = link.href.replace('.html', '');
              }
            });

            observer.observe(pagefindDrawer, {
              attributes: false,
              childList: true,
              subtree: true,
            });

            return () => observer.disconnect();
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    if (isModalOpen) {
      initializePagefind();
    } else {
      if (pagefindInstance.current) {
        pagefindInstance.current.destroy();
        pagefindInstance.current = null;
      }
    }
    return () => {
      if (pagefindInstance.current) {
        pagefindInstance.current.destroy();
      }
    };
  }, [isModalOpen]);

  return (
    <>
      <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      <script src="/pagefind/pagefind-ui.js" type="text/javascript" />
      <div className="z-50" id="search"></div>
    </>
  );
};