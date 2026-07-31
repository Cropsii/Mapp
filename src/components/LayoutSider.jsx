import { Layout, Space } from "antd";
import React from "react";

export const LayoutSider = ({ children }) => {
  const { Sider } = Layout;
  return (
    <Sider theme="light" width={300} collapsible collapsedWidth={0}>
      <Space
        vertical
        style={{
          padding: "16px",
          overflow: "auto",
          maxHeight: "100dvh",
          width: "100%",
        }}
        gap={"medium"}
      >
        {children}
      </Space>
    </Sider>
  );
};
