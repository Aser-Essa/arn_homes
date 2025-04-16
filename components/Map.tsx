// components/Map.tsx
"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

type MapType = {
  lat: number | undefined;
  lng: number | undefined;
  containerClassName?: string;
  controllerClassName?: string;
};

export default function Map({
  lat,
  lng,
  containerClassName,
  controllerClassName,
}: MapType) {
  return (
    <LeafletMap
      lat={lat}
      lng={lng}
      containerClassName={containerClassName}
      controllerClassName={controllerClassName}
    />
  );
}
