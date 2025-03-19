import React from "react";
import Container from "./Container";
import Feature from "./Feature";
import Title from "./Title";

export default function WhyUs() {
  const whyChooseUsCards = [
    {
      icon: "/icons/Hassle_Free_Searching.svg",
      title: "Hassle-Free Searching",
      description:
        "Say goodbye to tedious property searches. Our intuitive platform allows effortless filtering for hassle-free results.",
    },
    {
      icon: "/icons/Communication.svg",
      title: "Direct Communication",
      description:
        "Linked Bricks enables direct communication with landlords for questions, negotiations, and transparent experiences.",
    },
    {
      icon: "/icons/listing.svg",
      title: "Verified Listings",
      description:
        "Browse with confidence – Linked Bricks verifies listings for your safety and quality assurance.",
    },
    {
      icon: "/icons/Market_Insights.svg",
      title: "Local Market Insights",
      description:
        "Get informed with local market insights on property trends, prices, and neighborhoods for confident decisions.",
    },
    {
      icon: "/icons/no-middlemen.svg",
      title: "No Middlemen",
      description:
        "Linked Bricks eliminates intermediaries, granting you more control for faster, direct real estate interactions and decisions.",
    },
    {
      icon: "/icons/customer_support.svg",
      title: "Dedicated Customer Support",
      description:
        "Our dedicated customer support team is ready to assist you at every step of your property search journey.",
    },
  ];

  return (
    <>
      <Container className="mt-14 space-y-5 bg-scooter-50 py-10 font-exo sm:space-y-10">
        <Title>Why Choose Us</Title>
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
          {whyChooseUsCards.map(({ title, icon, description }) => (
            <Feature
              key={title}
              icon={icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
