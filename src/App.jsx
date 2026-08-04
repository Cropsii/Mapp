import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import {
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
  TerrainControl,
} from "react-map-gl/maplibre";
import { ProjectionControl } from "./components/ProjectionControl";
import { ClusterComponent } from "./components/ClusterComponent";
import { TabsComponent } from "./components/TabsComponent";
import { LayoutSider } from "./components/LayoutSider";
import { useCollection } from "./hooks/useCollection";
import { mapAtributes } from "./utils/mapAtributes";
import { PopUpInfo } from "./components/PopUpInfo";
import LayoutWrap from "./components/LayoutWrap";
import { MapMain } from "./components/MapMain";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { Layout, Spin } from "antd";
import React from "react";

function App() {
  const mapRef = useRef(null);

  const { collection, collectionData } = useCollection("notes");

  const [popUpData, setPopUpData] = useState({
    lng: null,
    lat: null,
    popUpData: null,
  });

  return (
    <LayoutWrap>
      <LayoutSider>
        <TabsComponent></TabsComponent>
      </LayoutSider>
      <Layout.Content>
        <Spin spinning={collectionData?.isLoading} delay={10}>
          <MapMain mapRef={mapRef}>
            <Source
              id="terrain"
              type="raster-dem"
              url={`https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?${mapAtributes.mapTiler.apiKey}`}
              volatile
            >
              <Layer
                type="hillshade"
                id="hailside"
                source="terrain"
                paint={{
                  "hillshade-exaggeration": 0.1,
                }}
                layout={{ visibility: "none" }}
              ></Layer>
            </Source>
            {/* <Layers
              data={[
                {
                  type: "heatmap",
                  dataSource:
                    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
                },
              ]}
            ></Layers> */}
            <NavigationControl visualizePitch visualizeRoll></NavigationControl>
            <GeolocateControl></GeolocateControl>
            <TerrainControl source="terrain"></TerrainControl>
            <ProjectionControl></ProjectionControl>
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
      </Layout.Content>
    </LayoutWrap>
  );
}

export default App;
