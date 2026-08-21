import { PopConfirmAddNode } from "./PopConfirmAddNode";
import { mapStyles } from "../utils/mapAtributes";
import Map from "react-map-gl/maplibre";
import React, { useState } from "react";

export const MapMain = ({ children, mapRef }) => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [cord, setCord] = useState();

  return (
    <Map
      styleDiffing
      hash
      keyboard
      light={{
        anchor: "viewport",
        "position-transition": { duration: 1000 },
        color: "#FFD38A",
      }}
      attributionControl={false}
      sky={{
        "sky-color": "#88C6FC",
      }}
      id="mainMap"
      maxPitch={75}
      reuseMaps
      zoomSnap={1}
      maxZoom={20}
      minZoom={0}
      doubleClickZoom={false}
      onClick={(e) => setCord(e?.lngLat)}
      onDblClick={(e) => {
        const eventCord = e.lngLat;
        setIsPopOpen(true);
        setCord(eventCord);
      }}
      projection={"globe"}
      ref={mapRef}
      style={{ height: "100dvh" }}
      mapStyle={mapStyles[localStorage.getItem("selectedIndex") || 0]?.style}
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
