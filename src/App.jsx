import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { NasaEarthdataControlReact } from "maplibre-gl-nasa-earthdata/react";
import {
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
  TerrainControl,
} from "react-map-gl/maplibre";
import { ProjectionControl } from "./components/ProjectionControl";
import { ClusterComponent } from "./components/ClusterComponent";
import { LayoutSider } from "./components/layout/LayoutSider";
import { TabsComponent } from "./components/TabsComponent";
import LayoutWrap from "./components/layout/LayoutWrap";
import { useCollection } from "./hooks/useCollection";
import { mapAtributes } from "./utils/mapAtributes";
import { PopUpInfo } from "./components/PopUpInfo";
import { MapMain } from "./components/MapMain";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { Layout, Spin } from "antd";

import React from "react";
import { GeocoderControl } from "./components/GeocoderControl";

function App() {
  const mapRef = useRef(null);
  const { collection, collectionData } = useCollection("notes");
  const [popUpData, setPopUpData] = useState({
    lng: null,
    lat: null,
    popUpData: null,
  });

  return (
    <Spin spinning={collectionData?.isLoading} delay={10}>
      <MapMain mapRef={mapRef}>
        <LayoutWrap>
          <LayoutSider>
            <TabsComponent></TabsComponent>
          </LayoutSider>
          <Layout.Content>
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
                  "hillshade-illumination-anchor": "map",
                  "hillshade-exaggeration": 0.15,
                }}
                layout={{ visibility: "none" }}
              ></Layer>
            </Source>
            {/* Слой землятресений */}
            {/* <Layers
              data={[
                {
                  type: "heatmap",
                  dataSource:
                    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
                },
              ]}
              
            ></Layers> */}
            {/* Данные NASA GIBS */}
            <NasaEarthdataControlReact
              map={mapRef.current}
              includeVector={true}
              position="bottom-left"
              theme="light"
            ></NasaEarthdataControlReact>
            <GeocoderControl></GeocoderControl>
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
          </Layout.Content>
        </LayoutWrap>
      </MapMain>
    </Spin>
  );
}

export default App;
