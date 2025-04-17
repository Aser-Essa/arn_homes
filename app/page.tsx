import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import FeaturedProperties from "@/components/FeaturedProperties";
import HomeHeroSection from "@/components/HomeHeroSection";
import Reviews from "@/components/Reviews";
import SearchBar from "@/components/SearchBar";
import WhyUs from "@/components/WhyUs";
import Title from "@/components/Title";
import { getPropertiesForSales } from "@/lib/data-service";

export const revalidate = 0;

export default async function Home() {
  const { data: unFilteredData } = await getPropertiesForSales({});
  const stateAddressArray = unFilteredData.map((el) => el.state_address);

  return (
    <>
      <HomeHeroSection />
      <SearchBar items={stateAddressArray} />
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
