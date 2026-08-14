import { Layout, Space } from "antd";
import React from "react";
import { useMap } from "react-map-gl/maplibre";

export const LayoutSider = ({ children }) => {
  const { Sider } = Layout;
  const { current: mapRef } = useMap();
  return (
    <Sider
      onCollapse={(e) => {
        const map = mapRef.getMap();
        if (!e) {
          map.easeTo({ padding: { left: 220 }, duration: 1300 });
        } else {
          map.easeTo({ padding: { left: 0 } });
        }
      }}
      unselectable="on"
      defaultCollapsed
      theme="light"
      width={330}
      collapsible
      collapsedWidth={0}
    >
      <Space
        unselectable="on"
        size={"large"}
        vertical
        style={{
          overflow: "auto",
          maxHeight: "100dvh",
          width: "100%",
        }}
      >
        {children}
      </Space>
    </Sider>
  );
};
