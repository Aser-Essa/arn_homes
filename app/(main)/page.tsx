import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import FeaturedProperties from "@/components/FeaturedProperties";
import HomeHeroSection from "@/components/HomeHeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import SearchBar from "@/components/SearchBar";
import WhyUs from "@/components/WhyUs";
import Title from "@/components/Title";
import { getProperties } from "@/lib/queries/properties";
import { getReviews } from "@/lib/queries/reviews";
import { params } from "@/types/types";

export const revalidate = 0;

type Params = Promise<params>;

export default async function Home({ searchParams }: { searchParams: Params }) {
  const { category } = await searchParams;

  const { data: unFilteredData } = await getProperties({});
  const stateAddressArray = unFilteredData
    ?.filter((property) => property?.category === (category || "sale"))
    .map((el) => el.address);

  const { reviews } = await getReviews({});

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
      <ReviewsSection reviews={reviews} />
    </>
  );
}
