import CategoryTree from '@/components/post/CategoryTree';
import PostList from '@/components/post/PostList';
import { getAllCategoryPath, getCategory, getPostFromCategory } from '@/libs/blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryParams {
  slug: string[]
}

interface PageProps {
  params: Promise<CategoryParams>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = decodeURIComponent(slug.at(-1) as string);
  const description = `${title}에 대한 게시글 목록입니다.`;
  
  return {
    title,
    description,
  };
}

export async function generateStaticParams(): Promise<CategoryParams[]> {
  const paths: CategoryParams[] = [];
  const allCategoryPath = getAllCategoryPath();

  allCategoryPath.forEach((path) => {
    const slug = process.env.NODE_ENV === 'development' ? path.split('/').map(encodeURIComponent) : path.split('/');
    paths.push({
      slug,
    });
  });

  return paths;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPath = slug.map(decodeURIComponent).join('/');
  const category = getCategory(categoryPath);
  const posts = getPostFromCategory(categoryPath);
  
  if (category === undefined)
    notFound();

  return (
    <>
      <CategoryTree
        categoryPath={category.path}
      />
      <div className='flex mx-8 my-4 
      text-3xl lg:text-5xl dark:text-[#4DA1A9]
      border-b-2 
      '>
        <p className='mb-6 
        underline underline-offset-[1rem]
        decoration-[#4A628A] '>{ category.display }</p>
      </div>
      <main className="flex flex-col grow p-8">
        <PostList
          posts={posts}
        />
      </main>
    </>
  );
}