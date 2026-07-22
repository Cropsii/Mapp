import { useMemo } from "react";

export function useGeoJSON(data) {
  const geoJSON = useMemo(() => {
    const res = {
      type: "FeatureCollection",
      features: data?.map((item) => ({
        type: "Feature",
        properties: {
          id: crypto.randomUUID(),
        },
        geometry: {
          type: "Point",
          coordinates: [item.lng, item.lat],
        },
      })),
    };
    return res;
  }, [data]);

  return { geoJSON };
}
