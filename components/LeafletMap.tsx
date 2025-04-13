"use client";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import toast from "react-hot-toast";
import MapController from "./MapController";

type LeafletMapType = {
  lat: number;
  lng: number;
};

export default function LeafletMap({ lat, lng }: LeafletMapType) {
  const [userLocation, setUserLocation] = useState({ lat, lng });
  const [, setLocationPermissionDenied] = useState(false);
  const [locationError, setLocationError] = useState("");

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermissionDenied(false);
          setLocationError("");
        },
        (error) => {
          toast.dismiss();
          toast.error(error?.message);
          setLocationError(
            "Failed to get your location. Please check your permissions.",
          );
          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermissionDenied(true);
          }
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  const userCoords: [number, number] | null = userLocation
    ? [userLocation.lat, userLocation.lng]
    : null;
  const destinationCoords: [number, number] = [lat, lng];

  const polyline: [number, number][][] = userCoords
    ? [[userCoords, destinationCoords]]
    : [];

  return (
    <div className="relative max-h-[444px] overflow-hidden rounded-[20px]">
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        style={{ height: "444px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>Property Coords</Popup>
        </Marker>

        {userCoords && (
          <>
            <Marker position={userCoords}>
              <Popup>Your Location</Popup>
            </Marker>
            <Polyline positions={polyline} color="blue" />
          </>
        )}

        <MapController
          userCoords={userCoords}
          destinationCoords={destinationCoords}
          getMyLocation={getMyLocation}
        />
      </MapContainer>

      {locationError && (
        <div className="absolute bottom-12 left-3 font-semibold text-red-500">
          {locationError}
        </div>
      )}
    </div>
  );
}
