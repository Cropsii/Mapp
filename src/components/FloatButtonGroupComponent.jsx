import {
  AimOutlined,
  LogoutOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FloatButton, Popconfirm } from "antd";
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import React from "react";
import { useMap } from "react-map-gl/maplibre";
import { useAuth } from "../hooks/useAuth";

export const FloatButtonGroupComponent = () => {
  const { logOut } = useAuth();
  const { current: mapRef } = useMap();

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
            pitch: 0,
            bearing: 0,
            zoom: 5,
          })
        }
      ></FloatButton>
      <Popconfirm title="Выйти из аккаунта" onConfirm={logOut} cancelText="нет">
        <FloatButton icon={<LogoutOutlined></LogoutOutlined>}></FloatButton>
      </Popconfirm>
      <FloatButton
        tooltip={{ placement: "left", title: "Добавить заметку " }}
        icon={<AimOutlined></AimOutlined>}
      ></FloatButton>
    </FloatButtonGroup>
  );
};
