import { useControl } from "react-map-gl/maplibre";
import { GlobeControl } from "maplibre-gl";

export const ProjectionControl = () => {
  useControl(() => new GlobeControl());
  return;
};
