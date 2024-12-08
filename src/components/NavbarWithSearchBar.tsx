"use client";
import React, { useState } from "react";

const NavbarWithSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <nav className="bg-gray-900 px-6 py-6 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-[248.458px]">
          <a href="/" className="text-2xl font-bold">
            Ticketer
          </a>
        </div>

        <div className="relative ml-10 w-full max-w-lg">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search events..."
            className="w-full h-10 rounded-full border-2 border-gray-300 bg-[#F6F6F6] py-3 pl-4 pr-12 text-md shadow-sm transition duration-300 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 16a6 6 0 100-12 6 6 0 000 12zm0 0l5 5m-5-5h5v5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/concerts" className="hover:text-gray-400">
            Concerts
          </a>
          <a href="/singers" className="hover:text-gray-400">
            Singers
          </a>
          <a
            href="/login"
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            Login/Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarWithSearchBar;
