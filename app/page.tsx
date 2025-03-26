import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import FeaturedProperties from "@/components/FeaturedProperties";
import HeroSection from "@/components/HeroSection";
import Reviews from "@/components/Reviews";
import SearchBar from "@/components/SearchBar";
import WhyUs from "@/components/WhyUs";

// const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationInput)}&format=json&limit=1`;

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <WhyUs />
      <Blog />
      <Stats />
      <Reviews />
    </>
  );
}
