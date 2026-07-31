import { GlobeControl } from "maplibre-gl";
import React from "react";
import { useControl } from "react-map-gl/maplibre";

export const ProjectionControl = () => {
  useControl(() => new GlobeControl());
  return;
};
