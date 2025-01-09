'use client';
import { useEffect, useState } from 'react';
import Icon from '../ui/Icon';
import { SearchBar } from '../pagefind/searchBar';

export function SearchButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Search Button */}
      <button
        className={`w-10 h-10 rounded-full
          bg-yellow-400
          flex items-center justify-center
          hover:animate-pulse-scale
          hover:bg-yellow-500
          hover:border-light-foreground
          hover:border-2
          `}
        onClick={openModal}
      >
        <Icon
          className={`absolute stroke-light-foreground
              transition-all duration-300
              `}
          icon="search"
        />
      </button>

      {/* Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-40 flex justify-center z-50
      ${isModalOpen ? 'visible' : 'invisible'}
      duration-700
      `}
      onClick={closeModal}>
        <div className={`flex flex-col p-6 text-light-foreground dark:text-dark-foreground
          w-3/4 h-5/6 overflow-y-scroll
          bg-light-background dark:bg-dark-background 
          rounded-b-3xl shadow-lg
          transition-transform duration-700 ease-in-out
          transform ${isModalOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
        onClick={(e) => e.stopPropagation()}>
          <p className="text-lg font-semibold mb-4 text-center
            ">검색</p>
          <SearchBar isModalOpen={isModalOpen}/>
        </div>
      </div>
    </>
  );
}