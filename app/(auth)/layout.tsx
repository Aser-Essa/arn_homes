import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Exo, League_Spartan } from "next/font/google";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  display: "swap",
});

const league_spartan = League_Spartan({
  variable: "--font-league_spartan",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arn Homes",
  description: "Discover Your Dream Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${exo.variable} ${league_spartan.variable} overflow-x-hidden font-exo antialiased`}
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
              zIndex: "200000000000",
              top: "24px",
              fontWeight: "600",
              color: "#0d0e0f",
            }}
          />
          <div className="flex h-screen justify-center max-lg:items-center">
            <div className="hidden w-[47vw] items-center justify-center bg-shades-black lg:flex">
              <Image src={"/Logo.svg"} width={144} height={144} alt="Logo" />
            </div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
