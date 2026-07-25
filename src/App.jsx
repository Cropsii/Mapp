import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { ClusterComponent } from "./components/ClusterComponent";
import { ModalAddNote } from "./components/modal/ModalAddNote";
import { useCollection } from "./hooks/useCollection";
import { MapProvider } from "react-map-gl/maplibre";
import { PopUpInfo } from "./components/PopUpInfo";
import { MapMain } from "./components/MapMain";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { Spin } from "antd";

function App() {
  const mapRef = useRef(null);

  const { collection, collectionData } = useCollection("notes");
  const [popUpData, setPopUpData] = useState({
    lng: null,
    lat: null,
    popUpData: null,
  });
  console.log(collection);

  return (
    <MapProvider>
      <Spin spinning={collectionData?.isLoading} delay={10}>
        <MapMain mapRef={mapRef}>
          <ModalAddNote></ModalAddNote>
          <PopUpInfo
            data={popUpData?.popUpData}
            lat={popUpData?.lat}
            lng={popUpData?.lng}
            onClose={() => setPopUpData(null)}
          ></PopUpInfo>
          <ClusterComponent
            data={collection}
            setPopUpData={setPopUpData}
          ></ClusterComponent>
          <FloatButtonGroupComponent></FloatButtonGroupComponent>
        </MapMain>
      </Spin>
    </MapProvider>
  );
}

export default App;
