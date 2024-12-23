'use client';

import Icon from '../Icon';

export function SearchButton() {
  const onClick = () => {
    alert('검색버튼 클릭');
  };

  return (
    <button
      className={`w-10 h-10 rounded-full
        bg-yellow-400
        flex items-center justify-center
        hover:animate-pulse-scale
        hover:bg-yellow-500
        hover:border-light-foreground
        hover:border-2
        `}
      onClick={onClick}
    >
      <Icon
        className={`absolute stroke-light-foreground
            transition-all duration-300
            `}
        icon='search'
      />
    </button>
  );
}