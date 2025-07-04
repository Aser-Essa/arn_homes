import type { Metadata } from "next";
import { Exo, League_Spartan } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import NewNotificationToast from "@/components/NewNotificationToast";

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
          <NewNotificationToast />
          <Header className="lg:px-10" />
          <div className="mt-[98px] flex">
            <div className="hidden md:block">
              <SideBar />
            </div>
            <div className="mb-[200px] w-full md:flex-1">{children}</div>
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
