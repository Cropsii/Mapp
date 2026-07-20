import {
  AimOutlined,
  LogoutOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  FullscreenControl,
  Map,
  MapProvider,
  Marker,
} from "react-map-gl/maplibre";
import { useAuth } from "./hooks/useAuth";
function App() {
  const { logOut } = useAuth();
  const mapRef = useRef(null);

  const mapAtributes = {
    styles: "https://maps.geoapify.com/v1/styles/osm-liberty/style.json?",
    apiKey: `apiKey=${import.meta.env.VITE_APP_MAP_API}`,
  };

  return (
    <MapProvider>
      <Map
        onClick={(e) => console.log(e)}
        onLoad={() => {
          const map = mapRef.current?.getMap();
          map?.setProjection({
            type: "globe",
          });
        }}
        ref={mapRef}
        style={{ height: "100dvh" }}
        mapStyle={`${mapAtributes.styles}${mapAtributes.apiKey}`}
      >
        <Marker
          opacityWhenCovered={0.1}
          longitude={-100}
          latitude={40}
          anchor="bottom"
          onClick={(e) =>
            e.target._map.easeTo({
              center: e.target.getLngLat(),
              pitch: 0,
              zoom: 4,
              duration: 2000,
            })
          }
        ></Marker>
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
              console.log(
                mapRef.current?.flyTo({
                  center: [37.62, 55.75],
                  pitch: 0,
                  bearing: 0,
                  zoom: 5,
                }),
              )
            }
          ></FloatButton>
          <FloatButton
            icon={<LogoutOutlined></LogoutOutlined>}
            onClick={logOut}
          ></FloatButton>
        </FloatButtonGroup>
        <FullscreenControl />
      </Map>
    </MapProvider>
  );
}

export default App;
