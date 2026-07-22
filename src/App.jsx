import {
  AimOutlined,
  LogoutOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMemo, useRef, useState } from "react";
import { Map, MapProvider } from "react-map-gl/maplibre";
import { useAuth } from "./hooks/useAuth";
import { ClusterComponent } from "./components/ClusterComponent";

function App() {
  const { logOut } = useAuth();
  const mapRef = useRef(null);

  const mapAtributes = {
    styles: "https://maps.geoapify.com/v1/styles/osm-liberty/style.json?",
    apiKey: `apiKey=${import.meta.env.VITE_APP_MAP_API}`,
  };
  const [data, setData] = useState([]);

  const geoJSON = useMemo(() => {
    const geoJSON = {
      type: "FeatureCollection",
      features: data.map((item) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.lng, item.lat],
        },
      })),
    };

    return geoJSON;
  }, [data]);

  const handleClusterClick = async (e) => {
    const feature = e.features?.[0];

    if (!feature) return;

    const clusterId = feature.properties.cluster_id;
    const source = mapRef.current.getSource("cluster");
    const zoom = await source.getClusterExpansionZoom(clusterId);
    mapRef.current.flyTo({
      center: feature.geometry.coordinates,
      zoom,
      // duration: 500,
    });
  };
  return (
    <MapProvider>
      <Map
        onDblClick={(e) => setData((prev) => [...prev, e.lngLat])}
        onClick={handleClusterClick}
        interactiveLayerIds={["clusters"]}
        projection={"globe"}
        ref={mapRef}
        style={{ height: "100dvh" }}
        mapStyle={`${mapAtributes.styles}${mapAtributes.apiKey}`}
      >
        <ClusterComponent geoJSON={geoJSON}></ClusterComponent>

        <FloatButtonGroup
          trigger="click"
          icon={<SettingOutlined></SettingOutlined>}
        >
          <FloatButton
            icon={<AimOutlined></AimOutlined>}
            onClick={() =>
              mapRef.current?.flyTo({
                center: [-122.4193, 37.8],
                zoom: 12,
                duration: 1000,
                bearing: 0,
              })
            }
          ></FloatButton>
          <FloatButton
            icon={<ReloadOutlined></ReloadOutlined>}
            onClick={() =>
              mapRef.current?.flyTo({
                center: [37.62, 55.75],
                pitch: 0,
                bearing: 0,
                zoom: 5,
              })
            }
          ></FloatButton>
          <FloatButton
            icon={<LogoutOutlined></LogoutOutlined>}
            onClick={logOut}
          ></FloatButton>
        </FloatButtonGroup>
      </Map>
    </MapProvider>
  );
}

export default App;
