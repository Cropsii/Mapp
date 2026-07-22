import { useMemo } from "react";

export function useGeoJSON(data) {
  const geoJSON = useMemo(() => {
    const res = {
      type: "FeatureCollection",
      features: data?.map((item) => {
        const geo = item?.geoPoint;
        return {
          type: "Feature",
          properties: {
            id: item.id,
            title: item.title,
          },
          geometry: {
            type: "Point",
            coordinates: [geo.lon, geo.lat],
          },
        };
      }),
    };
    return res;
  }, [data]);

  return { geoJSON };
}
