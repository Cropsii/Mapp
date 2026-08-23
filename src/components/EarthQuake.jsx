import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Slider } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

export const EarthQuake = () => {
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
    <Card title="Землятресения за неделю">
      <FormItem label="Прозрачность">
        <Slider
          value={opacity}
          onChange={(e) => setOpacity(e)}
          max={1}
          min={0}
          step={0.1}
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
        onClick={() => setIsVisible((prev) => !prev)}
      ></Button>
      <Source
        type="geojson"
        data={
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
        }
      >
        {isVisible && (
          <Layer
            type="heatmap"
            paint={{
              "heatmap-radius": 5,
              "heatmap-opacity": opacity,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],

                0,
                "rgba(0,0,0,0)",

                0.08,
                "#16002e",
                0.2,
                "#3b00ff",
                0.35,
                "#7a00ff",
                0.5,
                "#d000ff",
                0.65,
                "#ff0080",
                0.8,
                "#ff3158",
                0.92,
                "#ff8a00",
                1.0,
                "#fff200",
              ],
            }}
          ></Layer>
        )}
      </Source>
    </Card>
  );
};
