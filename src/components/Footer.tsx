import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-6 py-10 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Ticketer</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Help</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Concert Ticketing</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Account Support</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Terms of Us</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Acceptable</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Join our mailing list</h3>
          <p className="mb-4">to stay in the loop with our...</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>@2024 NOT FULLTIME PVT.LTD.</p>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div>
      <Footer />
    </div>
  );
}