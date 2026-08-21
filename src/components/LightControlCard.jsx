import { Card, Slider } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";

export const LightControlCard = () => {
  const { current: mapRef } = useMap("mainMap");
  const [lightXYZ, setLightXYZ] = useState([1.15, 210, 30]);
  useEffect(() => {
    const map = mapRef.getMap();
    map.setLight({ position: lightXYZ });
  }, [lightXYZ, mapRef]);
  return (
    <Card title="Солнце" unselectable="on">
      <FormItem label="X">
        <Slider
          dots
          min={0}
          max={360}
          onChangeComplete={(e) =>
            setLightXYZ((prev) => {
              const next = [...prev];
              next[1] = e;
              return next;
            })
          }
        ></Slider>
      </FormItem>
      <FormItem label="Y">
        <Slider
          dots
          min={0}
          max={360}
          onChangeComplete={(e) =>
            setLightXYZ((prev) => {
              const next = [...prev];
              next[2] = e;
              return next;
            })
          }
        ></Slider>
      </FormItem>
      <FormItem label="Яркость">
        <Slider
          dots
          defaultValue={0.2}
          min={0}
          max={1}
          step={0.1}
          onChange={(e) => mapRef.setSky({ "atmosphere-blend": e })}
        ></Slider>
      </FormItem>
    </Card>
  );
};
