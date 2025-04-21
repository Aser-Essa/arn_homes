import MyPropertiesHeader from "@/components/MyPropertiesHeader";
import MyPropertiesSection from "@/components/MyPropertiesSection";
import Container from "@/components/Container";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  return (
    <Container className="w-full !px-4 !py-6 md:h-[946px] md:w-[76vw] md:overflow-y-scroll md:!p-10">
      <MyPropertiesHeader params={searchParamsValues} />
      <MyPropertiesSection params={searchParamsValues} />
    </Container>
  );
}
