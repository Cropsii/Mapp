import { Tabs } from "antd";
import React from "react";
import { ChangeStyleComponent } from "./ChangeStyleComponent";
import { AdditionalMapStyles } from "./AdditionalMapStyles";
import {
  BgColorsOutlined,
  ExperimentOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { MercatorLayers } from "./MercatorLayers";

export const TabsComponent = () => {
  const tabs = [
    {
      key: "1",
      label: "Общий стиль карты",
      icon: <BgColorsOutlined></BgColorsOutlined>,
      children: <ChangeStyleComponent></ChangeStyleComponent>,
    },
    {
      key: "2",
      label: "Дополнительыне стили",
      icon: <ExperimentOutlined></ExperimentOutlined>,
      children: <AdditionalMapStyles></AdditionalMapStyles>,
    },
    {
      key: "3",
      label: "Mercator слои",
      icon: <GlobalOutlined></GlobalOutlined>,
      children:<MercatorLayers></MercatorLayers>
    },
  ];
  return (
    <Tabs
      type="card"
      styles={{ content: { padding: "10px" } }}
      items={tabs}
      defaultActiveKey="1"
    ></Tabs>
  );
};
