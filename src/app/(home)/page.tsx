import Footer from '@/components/Footer';
import NavbarWithSearchBar from '@/components/NavbarWithSearchBar';
import Searchbar from '@/components/SearchBarDummy';
import ConcertGrid from '@/features/home/ConcertGrid';
import HeroSection from '@/features/home/HeroSection';
import React from 'react';
const Home: React.FC = () => {
  return (
    <div>
      <NavbarWithSearchBar/>
      <HeroSection />
      <Searchbar />
      <ConcertGrid />
      <Footer/>
    </div>
  );
};

export default Home;