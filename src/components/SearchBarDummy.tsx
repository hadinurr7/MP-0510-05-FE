'use client'
import { useState } from 'react';

const Searchbar = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto -my-7">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search events..."
        className="w-full py-3 pl-4 pr-12 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg bg-[#F6F6F6] shadow-sm transition duration-300 ease-in-out"
      />
      <button className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm3.707-3.707l3.507 3.507"
          />
        </svg>
      </button>
    </div>
  );
};

export default Searchbar;
