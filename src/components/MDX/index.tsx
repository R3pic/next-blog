import Youtube from '@/components/MDX/Youtube';
import BlogImage from './BlogImage';
import type { BlogImageProps } from './BlogImage';
import Pre from './Pre';

export const components = {
  img: (props: BlogImageProps) => <BlogImage {...props} />,
  pre: (props: Record<string, unknown>) => <Pre {...props} />,
  Youtube,
};