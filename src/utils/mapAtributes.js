export const mapAtributes = {
  geApify: {
    light: "https://maps.geoapify.com/v1/styles/osm-liberty/style.json?",
    dark: "https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json?",
    standart: "https://maps.geoapify.com/v1/styles/osm-carto/style.json?",
    apiKey: `apiKey=${import.meta.env.VITE_APP_MAP_API}`,
  },
  mapTiler: {
    satellite:
      "https://api.maptiler.com/maps/019fce77-aa22-7f7d-923a-691e2491e4dd/style.json?",
    satelliteBlank: "https://api.maptiler.com/maps/satellite-v4/style.json?",
    ocean:
      "https://api.maptiler.com/maps/01a020b1-1fe2-74b0-8350-37892d58432f/style.json?",

    apiKey: `key=${import.meta.env.VITE_APP_MAPTILER_API}`,
  },
};

export const mapStyles = [
  {
    name: "Спутниковые снимки RU",
    img: "satellitePreviewMap.png",
    style: `${mapAtributes.mapTiler.satellite}${mapAtributes.mapTiler.apiKey}`,
  },
  {
    name: "Спутник пустой",
    img: "satelliteBlankPreviewMap.png",
    style: `${mapAtributes.mapTiler.satelliteBlank}${mapAtributes.mapTiler.apiKey}`,
  },

  {
    name: "Океан RU",
    img: "ocean.png",
    style: `${mapAtributes.mapTiler.ocean}${mapAtributes.mapTiler.apiKey}`,
  },
  {
    name: "Светлая 3д карта",
    img: "lightPreviewMap.png",
    style: `${mapAtributes.geApify.light}${mapAtributes.geApify.apiKey}`,
  },
  {
    name: "Темная тема",
    img: "darkPreviewMap.png",
    style: `${mapAtributes.geApify.dark}${mapAtributes.geApify.apiKey}`,
  },
  {
    name: "Базовая карта RU",
    img: "standart.png",
    style: `${mapAtributes.geApify.standart}${mapAtributes.geApify.apiKey}`,
  },
];
