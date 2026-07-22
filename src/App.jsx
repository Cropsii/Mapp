import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { Map, MapProvider } from "react-map-gl/maplibre";
import { ClusterComponent } from "./components/ClusterComponent";
import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { useGeoJSON } from "./hooks/useGeoJSON";

function App() {
  const mapRef = useRef(null);

  const mapAtributes = {
    styles: "https://maps.geoapify.com/v1/styles/osm-liberty/style.json?",
    apiKey: `apiKey=${import.meta.env.VITE_APP_MAP_API}`,
  };

  const [data, setData] = useState([]);
  
  const { geoJSON } = useGeoJSON(data);
  return (
    <MapProvider>
      <Map
        maxZoom={10}
        minZoom={0}
        doubleClickZoom={false}
        onDblClick={(e) => {
          setData((prev) => [...prev, e.lngLat]);
        }}
        interactiveLayerIds={["clusters"]}
        projection={"globe"}
        ref={mapRef}
        style={{ height: "100dvh" }}
        mapStyle={`${mapAtributes.styles}${mapAtributes.apiKey}`}
      >
        {geoJSON && (
          <ClusterComponent features={geoJSON.features}></ClusterComponent>
        )}
        <FloatButtonGroupComponent></FloatButtonGroupComponent>
      </Map>
    </MapProvider>
  );
}

export default App;
