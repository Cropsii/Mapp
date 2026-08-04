import { Tabs } from "antd";
import React from "react";
import { ChangeStyleComponent } from "./ChangeStyleComponent";

export const TabsComponent = () => {
  const tabs = [
    {
      key: "1",
      label: "Общий стиль карты",
      children: <ChangeStyleComponent></ChangeStyleComponent>,
    },
    {
      key: "2",
      label: "Дополнительыне стили",
      children: "",
    },
    {
      key: "3",
      label: "Информация",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return <Tabs items={tabs} defaultActiveKey="1"></Tabs>;
};
