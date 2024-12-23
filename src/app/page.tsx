import ContentWindow from '@/components/ContentWindow';
import CategoryTree from '@/components/post/CategoryTree';
import PostList from '@/components/post/PostList';
import RightSidebar from '@/components/sidebar/RightSidebar';
import { getAllPost } from '@/libs/blog/Post';
import React from 'react';

export default function Home() {
  const allPosts = getAllPost().map((v) => v.toAbstract());

  return (
    <>
      <ContentWindow>
        <CategoryTree
          category='/'
        />
        <main className="p-8 prose dark:prose-invert max-w-full">
          <PostList 
            posts={allPosts}          
          />
        </main>
      </ContentWindow>
      <RightSidebar />
    </>
  );
}

