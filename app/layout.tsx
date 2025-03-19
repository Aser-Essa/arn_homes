import type { Metadata } from "next";
import { Exo, League_Spartan } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body
        className={`${exo.variable} ${league_spartan.variable} overflow-x-hidden antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
