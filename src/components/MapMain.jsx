import { PopConfirmAddNode } from "./PopConfirmAddNode";
import Map from "react-map-gl/maplibre";
import React, { useState } from "react";

export const MapMain = ({ children, mapRef }) => {
  const mapAtributes = {
    styles: "https://maps.geoapify.com/v1/styles/osm-liberty/style.json?",
    apiKey: `apiKey=${import.meta.env.VITE_APP_MAP_API}`,
  };
  const [cord, setCord] = useState();
  const [isPopOpen, setIsPopOpen] = useState(false);

  return (
    <Map
      maxZoom={20}
      minZoom={1}
      doubleClickZoom={false}
      onDblClick={(e) => {
        const eventCord = e.lngLat;
        setIsPopOpen(true);
        setCord(eventCord);
      }}
      projection={"globe"}
      ref={mapRef}
      style={{ height: "100dvh" }}
      mapStyle={`${mapAtributes.styles}${mapAtributes.apiKey}`}
    >
      <PopConfirmAddNode
        isPopOpen={isPopOpen}
        setIsPopOpen={setIsPopOpen}
        cord={cord}
      ></PopConfirmAddNode>

      {children}
    </Map>
  );
};
