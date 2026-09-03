import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Layer, Source } from "react-map-gl/maplibre";
import { mapAtributes } from "../utils/mapAtributes";
import React, { useEffect, useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { Button, Card, Slider } from "antd";

export const HailsideControl = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (opacity <= 0) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [opacity]);
  return (
    <Card title="Тени для гор">
      <FormItem label="Прозрачность">
        <Slider
          value={opacity}
          onChange={(e) => setOpacity(e)}
          max={1}
          min={0}
          step={0.01}
        ></Slider>
      </FormItem>
      <Button
        icon={
          isVisible ? (
            <EyeOutlined></EyeOutlined>
          ) : (
            <EyeInvisibleOutlined></EyeInvisibleOutlined>
          )
        }
        type="dashed"
        block
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
      ></Button>
      <Source
        id="terrain"
        type="raster-dem"
        url={`https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?${mapAtributes.mapTiler.apiKey}`}
        volatile
      >
        {isVisible && (
          <Layer
            type="hillshade"
            id="hailside"
            source="terrain"
            paint={{
              "hillshade-illumination-anchor": "map",
              "hillshade-exaggeration": opacity,
            }}
          ></Layer>
        )}
      </Source>
    </Card>
  );
};
