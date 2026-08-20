import { Layout, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useMap } from "react-map-gl/maplibre";
import { TourContext } from "../../context/TourContext";

export const LayoutSider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { Sider } = Layout;
  const { current: mapRef } = useMap();
  // Относится к туру
  const { sideBar, isTourOpen } = useContext(TourContext);
  useEffect(() => setIsOpen(!isTourOpen), [isTourOpen]);

  return (
    <Sider
      ref={sideBar}
      collapsed={isOpen}
      onCollapse={(e) => {
        setIsOpen(e);
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
