import React from "react";
import Globe from "react-globe.gl";
import { useQuery } from "@tanstack/react-query";

export const GlobeTest = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["EarthQuake"],
    queryFn: async () => {
      const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
      );
      const resJSON = await res.json();
      return resJSON;
    },
  });
  const gData =
    data?.features?.map((item) => {
      return {
        lat: item.geometry.coordinates[1],
        lng: item.geometry.coordinates[0],
        mag: item.properties.mag ?? 0,
      };
    }) ?? [];
  return (
    <div>
      {isSuccess && (
        <Globe
          backgroundImageUrl={"space.avif"}
          globeTileEngineUrl={(x, y, z) => {
            return `https://maps.geoapify.com/v1/tile/carto/${z}/${x}/${y}.png?&apiKey=b87e0202ea4e4af0b65f454de592b19c`;
          }}
          heatmapsData={[gData]}
          heatmapPointLat={"lat"}
          heatmapPointLng={"lng"}
          heatmapPointWeight={"mag"}
          heatmapTopAltitude={0.1}
          enablePointerInteraction={false}
        ></Globe>
      )}
    </div>
  );
};
