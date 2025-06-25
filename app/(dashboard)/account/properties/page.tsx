import MyPropertiesHeader from "@/components/MyPropertiesHeader";
import MyPropertiesSection from "@/components/MyPropertiesSection";
import Container from "@/components/Container";
import { getMyProperties } from "@/lib/queries/properties";
import { params } from "@/types/types";

type SearchParams = Promise<params>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  return (
    <Container className="w-full !px-4 !py-6 md:w-[76vw] md:!p-10">
      <MyPropertiesHeader
        params={searchParamsValues}
        propertyAction={getMyProperties}
        title={"My Properties"}
        showAllCounts={false}
      />
      <MyPropertiesSection
        params={searchParamsValues}
        propertyAction={getMyProperties}
        type="my_properties"
      />
    </Container>
  );
}
