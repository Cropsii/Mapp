import { PopConfirmAddNode } from "./PopConfirmAddNode";
import { ModalContext } from "../context/ModalContext";
import { ModalAddNote } from "./modal/ModalAddNote";
import React, { useContext, useState } from "react";
import { mapStyles } from "../utils/mapAtributes";
import Map from "react-map-gl/maplibre";

export const MapMain = ({ children, mapRef }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const { cord, setCord } = useContext(ModalContext);
  return (
    <Map
      hash
      keyboard
      sky={{
        "sky-color": "#87CEEB",
        "atmosphere-blend": 0.1,
        "fog-ground-blend": 0.02,
        "sky-horizon-blend": 0.06,
      }}
      id="mainMap"
      maxPitch={80}
      reuseMaps
      onClick={(e) => setCord(e?.lngLat)}
      zoomSnap={1}
      maxZoom={20}
      minZoom={1}
      onLoad={() => {
        const map = mapRef.current.getMap();

        console.log(map);
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
      mapStyle={mapStyles[localStorage.getItem("selectedIndex") || 0]?.style}
    >
      <ModalAddNote
        isAddModalOpen={isAddModalOpen}
        cord={cord}
        setIsAddModalOpen={setIsAddModalOpen}
      ></ModalAddNote>
      <PopConfirmAddNode
        isPopOpen={isPopOpen}
        setCord={setCord}
        setIsAddModalOpen={setIsAddModalOpen}
        setIsPopOpen={setIsPopOpen}
        cord={cord}
      ></PopConfirmAddNode>
      {children}
    </Map>
  );
};
