import React from 'react';
import { Search, X } from 'lucide-react';

interface CommunitySearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const CommunitySearch: React.FC<CommunitySearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full mb-4">
      <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search questions, topics, tags (e.g. LeetCode, React, #internship)..."
        className="w-full bg-white border border-[#e5e0d5] rounded-2xl pl-11 pr-10 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#ff5500] transition shadow-xs"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 text-xs p-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
