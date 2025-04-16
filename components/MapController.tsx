import { cn } from "@/lib/utils";
import React from "react";

import { useMap } from "react-leaflet";

type MapControllerType = {
  userCoords: [number, number] | null;
  destinationCoords: [number, number];
  getMyLocation: () => void;
  controllerClassName?: string;
};

export default function MapController({
  userCoords,
  destinationCoords,
  getMyLocation,
  controllerClassName,
}: MapControllerType) {
  const map = useMap();

  function moveToUserLocation() {
    if (userCoords) {
      map.setView(userCoords, 10);
    }
  }

  function moveToDestinationLocation() {
    map.setView(destinationCoords, 10);
  }

  return (
    <div
      className={cn(
        "absolute left-3 z-[1000] space-x-2 font-exo",
        controllerClassName,
      )}
    >
      {userCoords ? (
        <button
          onClick={moveToUserLocation}
          className="rounded-md bg-scooter-600 px-4 py-2 font-semibold text-black"
        >
          Go to My Location
        </button>
      ) : (
        <button
          onClick={getMyLocation}
          className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-black"
        >
          Get My Location
        </button>
      )}
      <button
        onClick={moveToDestinationLocation}
        className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-black"
      >
        Go to Destination
      </button>
    </div>
  );
}
