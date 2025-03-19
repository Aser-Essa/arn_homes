import Achivements from "@/components/Achivements";
import Blog from "@/components/Blog";
import FeaturedProperties from "@/components/FeaturedProperties";
import HeroSection from "@/components/HeroSection";
import Reviews from "@/components/Reviews";
import SearchBar from "@/components/SearchBar";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <WhyUs />
      <Blog />
      <Achivements />
      <Reviews />
    </>
  );
}
