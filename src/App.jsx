import { FloatButtonGroupComponent } from "./components/FloatButtonGroupComponent";
import { NasaEarthdataControlReact } from "maplibre-gl-nasa-earthdata/react";
import {
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Source,
  TerrainControl,
} from "react-map-gl/maplibre";
import { ProjectionControl } from "./components/ProjectionControl";
import { ClusterComponent } from "./components/ClusterComponent";
import { GeocoderControl } from "./components/GeocoderControl";
import { LayoutSider } from "./components/layout/LayoutSider";
import { TabsComponent } from "./components/TabsComponent";
import LayoutWrap from "./components/layout/LayoutWrap";
import { useCollection } from "./hooks/useCollection";
import { mapAtributes } from "./utils/mapAtributes";
import { PopUpInfo } from "./components/PopUpInfo";
import { MapMain } from "./components/MapMain";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState, useEffect } from "react";
import { Button, Layout, Spin } from "antd";

function App() {
  const tempData = [
    { name: "Волхов", lat: 59.926900943790656, lng: 32.32768392422997 },
    { name: "Старая Ладога", lng: 32.296309304208705, lat: 59.996963796823195 },
    { name: "Иссад", lng: 32.349184301039315, lat: 60.06060737493439 },
    { name: "Новая Ладога", lng: 32.314716887743515, lat: 60.10507000869836 },
    { name: "Сясьстрой", lng: 32.563797091896134, lat: 60.13945955915233 },
    { name: "Колчаново", lng: 32.59222331885533, lat: 60.03685064917457 },
    { name: "Хвалово", lng: 32.738713127613835, lat: 59.95114243322104 },
    { name: "Паша", lng: 33.00759743693652, lat: 60.39057620082497 },
    { name: "Свирица", lng: 32.90655414220271, lat: 60.46982981955588 },
    { name: "Бережки", lng: 32.32842064999474, lat: 59.74723231273563 },
    { name: "Вындин Остров", lng: 32.35287410402657, lat: 59.80564803925773 },
    { name: "Кисельня", lng: 32.1440068341189, lat: 60.00585978311463 },
    { name: "Потанино", lat: 60.270128, lng: 32.775635 },
    { name: "Селиваново", lat: 60.203631, lng: 32.680548 },
  ];

  const mapRef = useRef(null);
  const isCancelledRef = useRef(false);
  const activeTimeoutRef = useRef(null);

  const { collection, collectionData } = useCollection("notes");
  const [popUpData, setPopUpData] = useState({
    lng: null,
    lat: null,
    popUpData: null,
  });

  const [isTourRunning, setIsTourRunning] = useState(false);
  const [activeCityName, setActiveCityName] = useState(null);

  // Расчёт общих границ
  const getOverallBounds = () => {
    let minLng = Infinity,
      maxLng = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;
    tempData.forEach((item) => {
      if (item.lng < minLng) minLng = item.lng;
      if (item.lng > maxLng) maxLng = item.lng;
      if (item.lat < minLat) minLat = item.lat;
      if (item.lat > maxLat) maxLat = item.lat;
    });
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  };

  const stopTour = () => {
    isCancelledRef.current = true;
    if (activeTimeoutRef.current) {
      clearTimeout(activeTimeoutRef.current);
    }
    setActiveCityName(null);
    setIsTourRunning(false);
  };

  const startTour = () => {
    const map = mapRef.current?.getMap?.() || mapRef.current;
    if (!map) return;

    isCancelledRef.current = false;
    setIsTourRunning(true);

    const bounds = getOverallBounds();

    // Отлёт назад на общий план
    const fitToRegion = () => {
      setActiveCityName(null); // Сбрасываем подсвеченный город при отлёте
      map.fitBounds(bounds, {
        padding: { top: 100, bottom: 100, left: 100, right: 100 },
        duration: 2000,
        pitch: 0,
        bearing: 0,
      });
    };

    // Медленный и плавный подлёт к точке
    const zoomToCity = (item) => {
      setActiveCityName(item.name); // Фиксируем активный город для увеличения
      map.flyTo({
        center: [item.lng, item.lat],
        zoom: 13.5,
        pitch: 50,
        bearing: 20,
        duration: 5000,
        essential: true,
      });
    };

    const delay = (ms) =>
      new Promise((resolve) => {
        activeTimeoutRef.current = setTimeout(resolve, ms);
      });

    const runStep = async (index) => {
      if (isCancelledRef.current || index >= tempData.length) {
        if (!isCancelledRef.current) fitToRegion();
        setIsTourRunning(false);
        setActiveCityName(null);
        return;
      }

      const city = tempData[index];

      // 1. Плавный подлёт вперед
      zoomToCity(city);
      await delay(5800);
      if (isCancelledRef.current) return;

      // 2. Возврат на общий план
      fitToRegion();
      await delay(2700);
      if (isCancelledRef.current) return;

      // 3. Следующий шар
      runStep(index + 1);
    };

    runStep(0);
  };

  // Прерывание тура при ручном перемещении карты
  useEffect(() => {
    const map = mapRef.current?.getMap?.() || mapRef.current;
    if (!map) return;

    const handleUserInteraction = () => {
      if (isTourRunning) {
        stopTour();
      }
    };

    map.on("mousedown", handleUserInteraction);
    map.on("touchstart", handleUserInteraction);
    map.on("wheel", handleUserInteraction);

    return () => {
      map.off("mousedown", handleUserInteraction);
      map.off("touchstart", handleUserInteraction);
      map.off("wheel", handleUserInteraction);
    };
  }, [isTourRunning]);

  return (
    <Spin spinning={collectionData?.isLoading} delay={10}>
      <MapMain mapRef={mapRef}>
        <LayoutWrap>
          {/* Боковое меню скрывается во время тура */}
          {!isTourRunning && (
            <LayoutSider>
              <TabsComponent />
            </LayoutSider>
          )}

          <Layout.Content style={{ position: "relative" }}>
            {/* Кнопка стартует тур и скрывается */}
            {!isTourRunning && (
              <Button
                type="primary"
                danger
                onClick={startTour}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 1000,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                }}
              >
                Запустить тур для ролика
              </Button>
            )}

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
              />
            </Source>

            {tempData.map((item) => {
              const isActive = item.name === activeCityName;
              return (
                <Marker key={item.name} latitude={item.lat} longitude={item.lng}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "transform 1.0s ease-in-out",
                      transform: isActive ? "scale(1.8)" : "scale(1)",
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: isActive ? "#ffd666" : "#78acff",
                        border: "2px solid white",
                        boxShadow: isActive
                          ? "0 0 12px #ffd666"
                          : "0 0 8px #78acff",
                        transition: "all 0.8s ease-in-out",
                      }}
                    />
                    <div
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: isActive ? 700 : 500,
                        textShadow: isActive
                          ? "0 2px 8px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.8)"
                          : "0 1px 4px rgba(0,0,0,0.8)",
                        marginTop: 2,
                        whiteSpace: "nowrap",
                        transition: "all 0.8s ease-in-out",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                </Marker>
              );
            })}

            {/* Границы района */}
            <Source data={"src/assets/Borders.geojson"} type="geojson">
              <Layer
                type="fill"
                paint={{
                  "fill-color": "#78acff",
                  "fill-opacity": 0.12,
                }}
              />
              <Layer
                type="line"
                paint={{
                  "line-color": "#78acff",
                  "line-width": 2,
                  "line-opacity": 0.95,
                }}
              />
            </Source>

            {/* Вспомогательный интерфейс */}
            {!isTourRunning && (
              <>
                <NasaEarthdataControlReact
                  map={mapRef.current}
                  includeVector={true}
                  position="bottom-left"
                  theme="light"
                />
                <GeocoderControl />
                <NavigationControl visualizePitch visualizeRoll />
                <GeolocateControl />
                <TerrainControl source="terrain" />
                <ProjectionControl />
                <PopUpInfo
                  data={popUpData?.popUpData}
                  lat={popUpData?.lat}
                  lng={popUpData?.lng}
                  setPopUpData={setPopUpData}
                />
                <ClusterComponent
                  data={collection}
                  setPopUpData={setPopUpData}
                />
                <FloatButtonGroupComponent />
              </>
            )}
          </Layout.Content>
        </LayoutWrap>
      </MapMain>
    </Spin>
  );
}

export default App;