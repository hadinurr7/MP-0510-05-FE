import Footer from '@/components/Footer';
import NavbarWithSearchBar from '@/components/NavbarWithSearchBar';
import Searchbar from '@/components/SearchBarDummy';
import HomePage from '@/features/home';
import ConcertGrid from '@/features/home/components/ConcertGrid';

import React from 'react';
const Home: React.FC = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;