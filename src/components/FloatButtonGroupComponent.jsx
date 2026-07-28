import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { useMap } from "react-map-gl/maplibre";
import { FloatButton, Popconfirm } from "antd";
import { useAuth } from "../hooks/useAuth";
import {
  LogoutOutlined,
  MoonOutlined,
  ReloadOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const FloatButtonGroupComponent = () => {
  const { logOut } = useAuth();
  const { Toggle } = useContext(ThemeContext);
  const { current: mapRef } = useMap();
  const switchIcons = () => {
    const localTheme = localStorage.getItem("theme");
    switch (localTheme) {
      case "light":
        return <SunOutlined></SunOutlined>;
      case "dark":
        return <MoonOutlined></MoonOutlined>;
      default:
        return <p>auto</p>;
    }
  };
  return (
    <FloatButtonGroup
      shape="square"
      trigger="click"
      icon={<SettingOutlined></SettingOutlined>}
    >
      <FloatButton
        icon={<ReloadOutlined></ReloadOutlined>}
        onClick={() =>
          mapRef.flyTo({
            center: [37.62, 55.75],
            padding: { top: 0, left: 0, right: 0, bottom: 0 },
            pitch: 0,
            bearing: 0,
            zoom: 2,
            duration: 500,
          })
        }
      ></FloatButton>
      <Popconfirm title="Выйти из аккаунта" onConfirm={logOut} cancelText="нет">
        <FloatButton icon={<LogoutOutlined></LogoutOutlined>}></FloatButton>
      </Popconfirm>
      <FloatButton
        tooltip={{ placement: "left", title: "Извенить тему" }}
        onClick={() => {
          Toggle();
        }}
        icon={switchIcons()}
      ></FloatButton>
    </FloatButtonGroup>
  );
};
