"use client";

import Footer from "@/components/Footer";
import NavbarWithSearchBar from "@/components/NavbarWithSearchBar";
import Searchbar from "@/components/SearchBarDummy";
import ConcertGrid from "./components/ConcertGrid";
import HeroSection from "./components/HeroSection";

const HomePage = () => {
  return (
    <>
      <NavbarWithSearchBar />
      <HeroSection />
      {/* <Searchbar /> */}
      <ConcertGrid />
      <Footer />
    </>
  );
};

export default HomePage;
