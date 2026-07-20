import { Layout } from "antd";
import React from "react";

export default function LayoutWrap({ children }) {
  return <Layout style={{ minHeight: "100dvh" }}>{children}</Layout>;
}
