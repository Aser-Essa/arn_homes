import type { Metadata } from "next";
import { Exo, League_Spartan } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import CompleteProfileBanner from "@/components/CompleteProfileBanner";

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
          <Toaster position="top-center" reverseOrder={false} />
          <Header className="lg:px-10" />
          <div className="block sm:hidden">
            <CompleteProfileBanner />
          </div>
          <div className="flex">
            <SideBar />
            <div className="hidden w-[76vw] p-10 sm:block">{children}</div>
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
