import { AbstractPost } from '@/libs/blog/Post';
import PostCard from './PostCard';

interface PostListProps {
  posts: AbstractPost[] | undefined;
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className='text-center my-20'>
        <p>
          게시글이 존재하지 않습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          thumbnail={post.thumbnail}
          title={post.title}
          date={post.date}
          category={post.category}
          previewText={post.previewText}
          slug={post.slug}
        />
      ))}
    </div>
  );
}
