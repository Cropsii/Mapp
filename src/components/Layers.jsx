import React from "react";
import { Layer, Source } from "react-map-gl/maplibre";

export const Layers = ({ data }) => {
  const heatMap = {
    "heatmap-radius": 5,
    "heatmap-opacity": 0.8,
  };
  const Circles = { "circle-radius": 3, "circle-color": "orange" };
  return (
    <>
      {data.map((item, index) => {
        const type = item?.type;
        const dataSource = item?.dataSource;
        return (
          <Source key={index} type="geojson" data={dataSource}>
            <Layer
              type={type}
              paint={type == "heatmap" ? heatMap : Circles}
            ></Layer>
          </Source>
        );
      })}
    </>
  );
};
