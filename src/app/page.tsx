import ContentWindow from '@/components/ContentWindow';
import CategoryTree from '@/components/post/CategoryTree';
import PostList from '@/components/post/PostList';
import RightSidebar from '@/components/sidebar/RightSidebar';
import { CategoryService, PostService } from 'r3-blog';

export default async function Home() {
  const allPosts = new PostService().getAllPost(new CategoryService());
  return (
    <>
      <ContentWindow>
        <CategoryTree
          categoryPath='/'
        />
        <main className="p-8">
          <PostList 
            posts={allPosts}          
          />
        </main>
      </ContentWindow>
      <RightSidebar />
    </>
  );
}

