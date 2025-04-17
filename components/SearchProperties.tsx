import React, { Fragment } from "react";
import HorizontalHomeCard from "./HorizontalHomeCard";
import { Property } from "@/types/types";
import Container from "./Container";
import Pagenation from "./Pagenation";
import HomeCard from "./HomeCard";

type SearchPropertiesType = {
  properties: Property[];
  count: number | null;
};

export default function SearchProperties({
  count,
  properties,
}: SearchPropertiesType) {
  return (
    <Container className="mb-[200px] mt-10 space-y-10">
      {properties.map((property) => (
        <Fragment key={property?.id}>
          <div className="hidden sm:block">
            <HorizontalHomeCard property={property} />
          </div>
          <div className="block sm:hidden">
            <HomeCard property={property} />
          </div>
        </Fragment>
      ))}
      <Pagenation count={count} perPage={3} />
    </Container>
  );
}
