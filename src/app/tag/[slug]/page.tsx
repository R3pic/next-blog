import PostList from '@/components/post/PostList';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import { PostService, TagService } from 'r3-blog';

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const tag = decodeURIComponent(slug);
  const title = `Tag: ${tag}`;
  return {
    title,
    description: `${ title }에 대한 게시글 목록입니다.`,
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const paths: Params[] = [];
  const postService = new PostService();
  const tagService = new TagService(postService.getAllPost());
  const allTags = tagService.getAllTag();

  allTags.forEach((tag) => {
    const slug = process.env.NODE_ENV === 'development' ? encodeURIComponent(tag) : tag;
    paths.push({
      slug,
    });
  });

  return paths;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const postService = new PostService();
  const tagService = new TagService(postService.getAllPost());
  const tag = decodeURIComponent(slug);
  const posts = tagService.getAllPost(tag);
  
  if (posts === undefined)
    notFound();

  return (
    <>
      <div className='flex mx-8 my-4 
      text-3xl lg:text-5xl dark:text-[#4DA1A9]
      border-b-2 
      '>
        <p className='mb-6 
        underline underline-offset-[1rem]
        decoration-[#4A628A] '>Tag : { tag }</p>
      </div>
      <main className="flex flex-col grow p-8">
        <PostList
          posts={posts}
        />
      </main>
    </>
  );
}