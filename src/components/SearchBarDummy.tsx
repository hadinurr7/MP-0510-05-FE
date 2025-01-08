// components/Searchbar.tsx
"use client";

interface SearchbarProps {
  onSearch: (query: string) => void;
  value: string;
}

const Searchbar = ({ onSearch, value }: SearchbarProps) => {
  return (
    <div className="relative -my-7 mx-auto w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search events..."
        className="w-full rounded-full border-2 border-gray-300 bg-[#F6F6F6] py-3 pl-4 pr-12 text-lg shadow-sm transition duration-300 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 transform rounded-full bg-indigo-500 p-2 text-white transition duration-300 hover:bg-indigo-600">
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