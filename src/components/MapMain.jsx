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
        intensity: 0.5,
        "position-transition": { duration: 1000 },
        color: "#ffffff",
      }}
      attributionControl={false}
      sky={{
        "sky-color": "#87CEEB",
        "atmosphere-blend": 0.3,
        "fog-ground-blend": 0.2,
        "sky-horizon-blend": 0.06,
      }}
      id="mainMap"
      maxPitch={75}
      reuseMaps
      zoomSnap={1}
      maxZoom={20}
      minZoom={0}
      onStyleData={(e) => console.log(e)}
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
