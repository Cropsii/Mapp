import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { ClusterComponent } from "./components/ClusterComponent";
import { ModalAddNote } from "./components/modal/ModalAddNote";
import { useCollection } from "./hooks/useCollection";
import {
  GeolocateControl,
  Layer,
  MapProvider,
  Source,
} from "react-map-gl/maplibre";
import { PopUpInfo } from "./components/PopUpInfo";
import { MapMain } from "./components/MapMain";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { Layout, Spin } from "antd";
function App() {
  const mapRef = useRef(null);

  const { collection, collectionData } = useCollection("notes");
  const [popUpData, setPopUpData] = useState({
    lng: null,
    lat: null,
    popUpData: null,
  });

  return (
    <MapProvider>
      <Layout>
        <Spin spinning={collectionData?.isLoading} delay={10}>
          <MapMain mapRef={mapRef}>
            <Source
              type="geojson"
              data={
                "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
              }
            >
              <Layer
                id="heatmap"
                type="heatmap"
                maxzoom={18}
                minzoom={0}
                paint={{
                  "heatmap-radius": 7,
                  "heatmap-opacity": 0.8,
                }}
              />
            </Source>
            <GeolocateControl></GeolocateControl>
            <ModalAddNote></ModalAddNote>
            <PopUpInfo
              data={popUpData?.popUpData}
              lat={popUpData?.lat}
              lng={popUpData?.lng}
              setPopUpData={setPopUpData}
            ></PopUpInfo>
            <ClusterComponent
              data={collection}
              setPopUpData={setPopUpData}
            ></ClusterComponent>
            <FloatButtonGroupComponent></FloatButtonGroupComponent>
          </MapMain>
        </Spin>
      </Layout>
    </MapProvider>
  );
}

export default App;
