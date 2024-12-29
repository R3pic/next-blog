'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export type TocData = {
  id: string;
  text: string;
  level: number;
};

interface TocProps {
  headers: Array<TocData>;
}

export default function Toc({ headers }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        const closest = visibleEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
        );
        setActiveId(closest.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -40% 0px',
      threshold: 1.0,
    });

    observerRef.current = observer;

    headers.forEach((header) => {
      const element = document.getElementById(header.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headers]);

  if (!headers || headers.length === 0) {
    return null;
  }

  return (
    <nav className="mt-12 ml-4 w-full" aria-label="Table of Contents">
      <div
        className="flex items-end w-1/6 h-16 gap-2 pb-1
        border-b-2
        dark:border-b-orange-300
        dark:text-yellow-600"
      >
        <Icon
          className="mb-1 fill-light-foreground stroke-light-foreground
          dark:fill-dark-foreground dark:stroke-dark-foreground"
          icon="bookmark"
          size={20}
        />
        <p className="text-lg font-semibold">Contents</p>
      </div>
      <ul className="ml-4 mt-4 space-y-2">
        {headers.map((header) => (
          <li
            key={header.id}
            style={{ marginLeft: `${(header.level - 1) * 16}px` }}
          >
            <Link
              href={`#${header.id}`}
              className={`hover:underline ${activeId === header.id
                ? 'text-blue-600 font-bold' // Highlight the active link
                : ''
              }`}
            >
              {header.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
