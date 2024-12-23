import { getAllPost, getPost } from '@/libs/blog/Post';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { useMDXComponents } from '../../../../mdx-components';
import CategoryTree from '@/components/post/CategoryTree';
import PostTitle from '@/components/post/PostTitle';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import { Metadata } from 'next/types';
import remarkGfm from 'remark-gfm';

interface PostParams {
  slug: string
}

interface PostProps {
  params: Promise<PostParams>;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: decodeURIComponent(slug),
    description: decodeURIComponent(slug),
  };
}

export async function generateStaticParams(): Promise<PostParams[]> {
  const paths: PostParams[] = [];
  const allPosts = getAllPost();

  allPosts.forEach(({ slug }) => {
    paths.push({
      slug: process.env.NODE_ENV === 'development' ? encodeURIComponent(slug) : slug,
    });
  });

  return paths;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = getPost(decodeURIComponent(slug));

  if (!post)
    notFound();

  return (
    <>
      {/* 카테고리 트리 */}
      <CategoryTree
        title={post.title}
        category={post.category}
      />
      {/* 게시글 헤더 (제목 및 사진 포스트 날짜) */}
      <PostTitle
        title={post.title}
        thumbnail={post.thumbnail}
        date={post.date}
        category={post.category}
      />
      <main className="p-8 max-w-full">
        <MDXRemote
          source={post.content}
          components={useMDXComponents()}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkBreaks, remarkGfm],
              rehypePlugins: [rehypeSlug]
            }
          }}
        />
      </main>
    </>
  );
}