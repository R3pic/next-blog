'use client';
import { useState } from 'react';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[] | undefined;
}

export default function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const maxPageBtnCount = 5;

  if (!posts || posts.length === 0) {
    return (
      <div className="grow flex items-center justify-center">
        <p className='text-xl'>게시글이 존재하지 않습니다.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {currentPosts.map((post, index) => (
        <PostCard
          key={index}
          thumbnail={post.thumbnail}
          title={post.title}
          date={post.date}
          category={post.category}
          description={post.description}
          slug={post.slug}
        />
      ))}

      <div className="flex justify-center items-center mt-8">
        <button
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {Array.from(
          { length: Math.min(maxPageBtnCount, totalPages) }, 
          (_, i) => {
            // 버튼의 시작 페이지를 계산
            const startPage = Math.max(1, currentPage - Math.floor(maxPageBtnCount / 2));
            return startPage + i;
          }
        ).map((page) => (
          <button
            key={page}
            className={`mx-1 px-2 ${page === currentPage&& 'text-yellow-700 font-bold text-sm pointer-events-none'}
            `}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}