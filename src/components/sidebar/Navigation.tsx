import React, { ReactElement } from 'react';
import { getCategoryTree } from '@/libs/blog/Category';
import RootNavItem from './RootNavItem';

export default function Navigation() {
  const renderCategory = (): ReactElement[] => {
    const categoryTree = getCategoryTree();

    return categoryTree.map((category) => (
      <RootNavItem
        key={category.path}
        display={category.display}
        href={`/category/${category.path}`}
        subCategories={category.children}
      />
    ));
  };

  return (
    <nav className="w-72 px-8 mt-8 text-xl overflow-auto">
      <ul>
        {renderCategory()}
      </ul>
    </nav>
  );
}
