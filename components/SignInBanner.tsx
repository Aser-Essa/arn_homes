import { GoPlus } from "react-icons/go";
import Container from "./Container";
import Title from "./Title";
import Link from "next/link";

export default function SignInBanner() {
  return (
    <>
      <Container className="mt-14 h-[450px] w-full space-y-5 bg-scooter-50 py-10 font-exo">
        <Title>Sign in to enjoy much more</Title>
        <p className="text-lg sm:text-2xl">
          Tired of endless tabs cluttering your browser while you search for
          your ideal property? We&apos;ve got the solution for you! Say farewell
          to the tab chaos and hello to organization with our cutting-edge
          platform.
        </p>
        <Link
          href={"/sign-in"}
          className="flex h-[50px] w-[120px] items-center justify-center rounded-xl bg-scooter-600 text-lg font-medium transition-all hover:bg-scooter-500"
        >
          <GoPlus className="!h-6 !w-6" />
          <p>Sign in</p>
        </Link>
      </Container>
    </>
  );
}
