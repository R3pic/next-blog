import type { MDXComponents } from 'mdx/types';
import Youtube from '@/components/MDX/Youtube';

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...components,
    Youtube,
  };
}