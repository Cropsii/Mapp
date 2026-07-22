import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import { ClusterComponent } from "./components/ClusterComponent";
import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { useGeoJSON } from "./hooks/useGeoJSON";
import { MapMain } from "./components/MapMain";
import { ModalAddNote } from "./components/modal/ModalAddNote";
import { useCollection } from "./hooks/useCollectionManipulation";
import { Spin } from "antd";

function App() {
  const mapRef = useRef(null);

  const { collection, collectionData } = useCollection("notes");
  const { geoJSON } = useGeoJSON(collection);

  if (collection) {
    console.log(collection);
  }

  return (
    <MapProvider>
      <ModalAddNote></ModalAddNote>
      <Spin spinning={collectionData?.isLoading} delay={10}>
        <MapMain mapRef={mapRef}>
          {geoJSON && (
            <ClusterComponent features={geoJSON.features}></ClusterComponent>
          )}

          <FloatButtonGroupComponent></FloatButtonGroupComponent>
        </MapMain>
      </Spin>
    </MapProvider>
  );
}

export default App;
