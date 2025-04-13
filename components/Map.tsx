// components/Map.tsx
"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

type MapType = {
  lat: number;
  lng: number;
};

export default function Map({ lat, lng }: MapType) {
  return <LeafletMap lat={lat} lng={lng} />;
}
