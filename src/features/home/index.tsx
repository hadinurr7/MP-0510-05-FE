// features/home/index.tsx
"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import Searchbar from "@/components/SearchBarDummy";
import { useState } from "react";


const NavbarWithSearchBar = dynamic(
  () => import("@/components/NavbarWithSearchBar"),
  {
    ssr: false,
  },
);

const ConcertGrid = dynamic(() => import("./components/ConcertGridWrapper"), {
  ssr: false,
});

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <HeroSection />
      {/* <p>{searchQuery}</p> */}
      <Searchbar 
        onSearch={handleSearch}
        value={searchQuery}
      />
      <ConcertGrid searchQuery={searchQuery} />
      

    </>
  );
};

export default HomePage;