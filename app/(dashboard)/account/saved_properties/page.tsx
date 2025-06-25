import MyPropertiesHeader from "@/components/MyPropertiesHeader";
import MyPropertiesSection from "@/components/MyPropertiesSection";
import Container from "@/components/Container";
import { getSavedProperties } from "@/lib/queries/favorites";
import { params } from "@/types/types";

type SearchParams = Promise<params>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  return (
    <Container className="w-full space-y-7 !px-4 !py-6 md:h-[946px] md:w-[76vw] md:overflow-y-scroll md:!p-10">
      <MyPropertiesHeader
        params={searchParamsValues}
        propertyAction={getSavedProperties}
        title={"Saved Properties"}
      />
      <MyPropertiesSection
        params={searchParamsValues}
        propertyAction={getSavedProperties}
        type="saved_properties"
      />
    </Container>
  );
}
