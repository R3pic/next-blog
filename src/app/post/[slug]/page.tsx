import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import CategoryTree from '@/components/post/CategoryTree';
import PostTitle from '@/components/post/PostTitle';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkgfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import { Metadata } from 'next/types';
import TagBox from '@/components/post/TagBox';
import { components } from '@/components/MDX';
import rehypePrettyCode from 'rehype-pretty-code';
import { CategoryService, PostService } from 'r3-blog';

interface PostParams {
  slug: string
}

interface PostProps {
  params: Promise<PostParams>;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const postService = new PostService();
  const post = postService.getPost(slug);

  return {
    title: post?.title,
    description: post?.description,
  };
}

export async function generateStaticParams(): Promise<PostParams[]> {
  const paths: PostParams[] = [];
  const postService = new PostService();
  const allPosts = postService.getAllPost();

  allPosts.forEach(({ slug }) => {
    paths.push({
      slug: process.env.NODE_ENV === 'development' ? encodeURIComponent(slug) : slug,
    });
  });

  return paths;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const postService = new PostService();
  const categoryService = new CategoryService();
  const post = postService.getPost(decodeURIComponent(slug));
  const category = categoryService.getCategory(post.category);

  if (!post)
    notFound();

  return (
    <>
      {/* 카테고리 트리 */}
      <CategoryTree
        title={post.title}
        categoryPath={category.path}
      />
      {/* 게시글 헤더 (제목 및 사진 포스트 날짜) */}
      <main data-pagefind-body>
        <PostTitle
          title={post.title}
          thumbnail={post.thumbnail}
          date={post.date}
          categoryPath={category.path}
          categoryDisplay={category.display}
        />
        <div className='p-8 flex flex-col grow break-keep'>
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkBreaks],
                rehypePlugins: [rehypeSlug, rehypePrettyCode, remarkgfm, remarkGemoji]
              }
            }}
          />
          <TagBox
            tags={post.tags}
          />
        </div>
      </main>
    </>
  );
}