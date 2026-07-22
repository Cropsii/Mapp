import { Layer, Source } from "react-map-gl/maplibre";

export const ClusterComponent = ({ geoJSON }) => {
  const clusterLayer = {
    id: "clusters",
    type: "circle",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  };

  const clusterCountLayer = {
    id: "cluster-count",
    type: "symbol",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-size": 12,
    },
  };

  const unclusteredPointLayer = {
    id: "unclustered-point",
    type: "circle",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  };

  return (
    <Source
      id="cluster"
      type="geojson"
      data={geoJSON}
      cluster={true}
      clusterMaxZoom={14}
      clusterRadius={50}
    >
      <Layer id="clusters" {...clusterLayer}></Layer>
      <Layer {...clusterCountLayer}></Layer>
      <Layer {...unclusteredPointLayer}></Layer>
    </Source>
  );
};
