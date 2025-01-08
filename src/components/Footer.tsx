import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-6 bg-gray-900 px-4 py-10 text-white md:px-8 lg:px-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-bold">TicketerHH</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Concert Ticketing
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Account Support
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Terms of Us
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Acceptable
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>@2025 NOT FULLTIME PVT.LTD.</p>
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
