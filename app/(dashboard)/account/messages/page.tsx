import CompleteProfileBanner from "@/components/CompleteProfileBanner";
import Container from "@/components/Container";
import MessagesHeader from "@/components/MessagesHeader";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  return (
    <Container className="!p-10">
      <CompleteProfileBanner />
      <MessagesHeader params={searchParamsValues} />
    </Container>
  );
}
