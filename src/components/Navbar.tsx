import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 px-6 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          Ticketer
        </a>
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

export default Navbar;
