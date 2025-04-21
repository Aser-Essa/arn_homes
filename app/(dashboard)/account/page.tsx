import CompleteProfileBanner from "@/components/CompleteProfileBanner";
import Container from "@/components/Container";
import MyPropertiesSelection from "@/components/MyPropertiesSelection";
import SideBar from "@/components/SideBar";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  return (
    <Container className="mb-[150px] w-full overflow-y-scroll !p-0 md:w-[76vw] md:!p-10">
      <div className="block md:hidden">
        <CompleteProfileBanner />
      </div>
      <div className="hidden md:block">
        <CompleteProfileBanner />
        <MyPropertiesSelection params={searchParamsValues} />
      </div>
      <div className="block h-full md:hidden">
        <SideBar />
      </div>
    </Container>
  );
}
