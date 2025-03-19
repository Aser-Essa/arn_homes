import React from "react";
import Container from "./Container";
import Feature from "./Feature";
import Title from "./Title";

export default function WhyUs() {
  return (
    <>
      <Container className="mt-14 space-y-10 bg-scooter-50 py-10 font-exo">
        <Title>Why Choose Us</Title>
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
          <Feature />
          <Feature />
          <Feature />
          <Feature />
          <Feature />
          <Feature />
        </div>
      </Container>
    </>
  );
}
