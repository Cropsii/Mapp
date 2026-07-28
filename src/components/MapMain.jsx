import { PopConfirmAddNode } from "./PopConfirmAddNode";
import { GlobeControl } from "maplibre-gl";
import Map from "react-map-gl/maplibre";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { mapAtributes } from "../utils/mapStyles";

export const MapMain = ({ children, mapRef }) => {
  const { mode } = useContext(ThemeContext);
  const [cord, setCord] = useState();
  const [isPopOpen, setIsPopOpen] = useState(false);

  return (
    <Map
      styleDiffing
      zoomSnap={1}
      maxZoom={20}
      minZoom={1}
      onLoad={() => {
        mapRef.current.addControl(new GlobeControl(), "top-right");
        mapRef.current.setPaintProperty("water", "fill-color", "#5982da");
      }}
      doubleClickZoom={false}
      onDblClick={(e) => {
        const eventCord = e.lngLat;
        setIsPopOpen(true);
        setCord(eventCord);
      }}
      projection={"globe"}
      ref={mapRef}
      style={{ height: "100dvh" }}
      mapStyle={`${mapAtributes[mode]}${mapAtributes.apiKey}`}
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
