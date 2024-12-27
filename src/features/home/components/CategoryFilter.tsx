// components/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalEvents?: number; // Tambahkan prop untuk total events
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  totalEvents = 0, // Default value 0
}) => {
  return (
    <>
      <div className="flex gap-3 my-4">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white transition duration-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All types
        </button>
        <button
          onClick={() => onCategoryChange('musik')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === 'musik'
              ? 'bg-indigo-600 text-white transition duration-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Musik
        </button>
        <button
          onClick={() => onCategoryChange('concert')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === 'concert'
              ? 'bg-indigo-600 text-white transition duration-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Concert
        </button>
      </div>

      {/* Tampilkan pesan jika tidak ada event */}
      {totalEvents === 0 && selectedCategory !== 'all' && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No events found for category "{selectedCategory}"
          </p>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;