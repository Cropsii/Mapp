import { Layout, Space } from "antd";
import React from "react";

export const LayoutSider = ({ children }) => {
  const { Sider } = Layout;
  return (
    <Sider
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
