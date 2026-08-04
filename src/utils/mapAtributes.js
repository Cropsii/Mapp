export const mapAtributes = {
  geApify: {
    light: "https://maps.geoapify.com/v1/styles/osm-liberty/style.json?",
    dark: "https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json?",
    apiKey: `apiKey=${import.meta.env.VITE_APP_MAP_API}`,
  },
  mapTiler: {
    satellite:
      "https://api.maptiler.com/maps/019fce77-aa22-7f7d-923a-691e2491e4dd/style.json?",
    satelliteBlank: "https://api.maptiler.com/maps/satellite-v4/style.json?",
    apiKey: `key=${import.meta.env.VITE_APP_MAPTILER_API}`,
  },
};

export const mapStyles = [
  {
    name: "Светлая 3д карта",
    img: "/lightPreviewMap.png",
    style: `${mapAtributes.geApify.light}${mapAtributes.geApify.apiKey}`,
  },
  {
    name: "Спутниковые снимки",
    img: "/satellitePreviewMap.png",
    style: `${mapAtributes.mapTiler.satellite}${mapAtributes.mapTiler.apiKey}`,
  },
  {
    name: "Спутник пустой",
    img: "/satelliteBlankPreviewMap.png",
    style: `${mapAtributes.mapTiler.satelliteBlank}${mapAtributes.mapTiler.apiKey}`,
  },
  {
    name: "Темная тема",
    img: "/darkPreviewMap.png",
    style: `${mapAtributes.geApify.dark}${mapAtributes.geApify.apiKey}`,
  },
];
