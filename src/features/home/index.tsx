// features/home/index.tsx
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";

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
  return (
    <>
      <HeroSection />
      <ConcertGrid />
    </>
  );
};

export default HomePage;
