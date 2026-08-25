import React from 'react';
import { CommunityCategory } from '../types/community.types';

interface CategoryFilterProps {
  categories: CommunityCategory[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 mb-4">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
          selectedCategoryId === null
            ? 'bg-[#0a0a0a] text-white shadow-xs'
            : 'bg-white text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
        }`}
      >
        All Categories
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id === selectedCategoryId ? null : cat.id)}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
            selectedCategoryId === cat.id
              ? 'bg-[#ff5500] text-white shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
