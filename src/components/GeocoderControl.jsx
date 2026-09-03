import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import { useControl } from "react-map-gl/maplibre";
import useApp from "antd/es/app/useApp";

export const GeocoderControl = () => {
  const { message } = useApp();
  useControl(
    ({ mapLib }) =>
      new MaplibreGeocoder(
        {
          forwardGeocode: async (config) => {
            try {
              const params = new URLSearchParams({
                text: config.query,
                limit: config.limit ?? 10,
                format: "geojson",
                apiKey: import.meta.env.VITE_APP_MAP_API?.trim(),
              });

              const response = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?${params}`,
              );
              const geojson = await response.json();
              const features = geojson.features.map((item) => ({
                ...item,
                place_name: item.properties?.formatted,
                text: item.properties?.name ?? item.properties?.formatted,
                place_type: ["place"],
              }));

              return {
                features,
              };
            } catch (e) {
              message.error(`Ошибка геокода: ${e}`);
              console.error(`Failed to forwardGeocode with error: ${e}`);
            }

            return {
              features,
            };
          },
        },
        { maplibregl: mapLib, popup: true, language: "ru", limit: 10 },
      ),
  );

  return null;
};
