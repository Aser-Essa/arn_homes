import FilterBar from "@/components/FilterBar";
import { getCoordinates } from "@/lib/queries/utils";
import { params } from "@/types/types";
import Container from "./Container";
import Map from "./Map";
import SearchBreadcrumb from "./SearchBreadcrumb";

type SearchHeroSectionType = {
  params: params;
  stateAddressArray: string[];
  category?: string | string[] | undefined;
};

export default async function SearchHeroSection({
  params,
  stateAddressArray,
  category,
}: SearchHeroSectionType) {
  const state_address = params?.state_address || "";
  const coordinates = await getCoordinates(`${state_address}`);

  return (
    <Container>
      <SearchBreadcrumb category={category} />
      <div className="h-[368px] overflow-hidden rounded-[20px] sm:h-[468px] sm:max-h-[468px]">
        <Map
          lat={coordinates?.lat}
          lng={coordinates?.lng}
          containerClassName={"mt-6"}
          controllerClassName={"lg:bottom-[53px] bottom-3"}
        />
      </div>
      <FilterBar
        params={params}
        stateAddressArray={stateAddressArray}
        className="mb-10 mt-4 lg:mb-0 lg:mt-0"
        category={category}
      />
    </Container>
  );
}
