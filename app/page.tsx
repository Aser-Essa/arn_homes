import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import FeaturedProperties from "@/components/FeaturedProperties";
import HeroSection from "@/components/HeroSection";
import Reviews from "@/components/Reviews";
import SearchBar from "@/components/SearchBar";
import WhyUs from "@/components/WhyUs";
import Title from "@/components/Title";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <FeaturedProperties
        className="mt-[14px] space-y-5 font-exo sm:space-y-10"
        title={<Title>Featured Properties</Title>}
      />
      <WhyUs />
      <Blog />
      <Stats />
      <Reviews />
    </>
  );
}
