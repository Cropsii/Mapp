import { EyeOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

import React from "react";
import { useMap } from "react-map-gl/maplibre";

export const HailsideControl = () => {
  const { current: mapRef } = useMap();
  return (
    <Card title="Тени для гор">
      <Button
        type="dashed"
        block
        onClick={() => {
          const map = mapRef.getMap();
          const hailsideProp = map.getLayoutProperty("hailside", "visibility");
          if (hailsideProp == "none") {
            map.setLayoutProperty("hailside", "visibility", "visible");
          } else {
            map.setLayoutProperty("hailside", "visibility", "none");
          }
        }}
      >
        <EyeOutlined></EyeOutlined>
      </Button>
    </Card>
  );
};
