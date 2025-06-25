// components/Map.tsx
"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="mt-6 h-[300px] w-full overflow-hidden rounded-[20px]">
      <Skeleton className="h-full w-full" />
    </div>
  ),
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
