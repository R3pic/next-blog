import CategoryTree from '@/components/post/CategoryTree';
import PostList from '@/components/post/PostList';
import { getAllCategory, getCategory } from '@/libs/blog/Category';
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
  
  return {
    title: decodeURIComponent(slug.at(-1) as string),
    description: decodeURIComponent(slug.at(-1) as string),
  };
}

export async function generateStaticParams(): Promise<CategoryParams[]> {
  const paths: CategoryParams[] = [];
  const allCategory = getAllCategory().reverse();

  allCategory.forEach(({ path }) => {
    
    const slug = process.env.NODE_ENV === 'development' ? path.split('/').map(encodeURIComponent) : path.split('/');

    paths.push({
      slug,
    });
  });

  return paths;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const _slug = slug.map(decodeURIComponent).join('/');
  const category = getCategory(_slug);
  
  if (category === undefined)
    notFound();

  return (
    <>
      <CategoryTree
        category={category.path}
      />
      <div className='flex mx-8 my-4 
      text-5xl dark:text-[#4DA1A9]
      border-b-2 
      '>
        <p className='mb-6 
        underline underline-offset-[1rem]
        decoration-[#4A628A] '>{ category.display }</p>
      </div>
      <main className="p-8">
        <PostList
          posts={category.posts}
        />
      </main>
    </>
  );
}