import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { ChangeStyleComponent } from "./components/ChangeStyleComponent";
import {
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
  TerrainControl,
} from "react-map-gl/maplibre";
import { ClusterComponent } from "./components/ClusterComponent";
import { LayoutSider } from "./components/LayoutSider";
import { useCollection } from "./hooks/useCollection";
import { mapAtributes, mapStyles } from "./utils/mapAtributes";
import { PopUpInfo } from "./components/PopUpInfo";
import LayoutWrap from "./components/LayoutWrap";
import { MapMain } from "./components/MapMain";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { Button, Layout, Spin } from "antd";
import { ProjectionControl } from "./components/ProjectionControl";
import React from "react";

function App() {
  console.log(mapStyles[localStorage.getItem("selectedIndex") || 0].style);

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
        <ChangeStyleComponent></ChangeStyleComponent>
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
                  "hillshade-method": "igor",
                  "hillshade-exaggeration": 0.05,
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
            <Button
              onClick={() => {
                const map = mapRef.current.getMap();
                map.setLayoutProperty("hailside", "visibility", "visible");
              }}
            >
              Hello
            </Button>
          </MapMain>
        </Spin>
      </Layout.Content>
    </LayoutWrap>
  );
}

export default App;
