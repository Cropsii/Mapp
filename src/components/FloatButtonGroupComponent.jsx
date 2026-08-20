import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import { useMap } from "react-map-gl/maplibre";
import { FloatButton, Popconfirm } from "antd";
import { useAuth } from "../hooks/useAuth";
import {
  InfoCircleOutlined,
  LogoutOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { TourContext } from "../context/TourContext";

export const FloatButtonGroupComponent = () => {
  const { logOut } = useAuth();
  const { current: mapRef } = useMap();
  // Тур
  const { floatGroup, setIsTourOpen } = useContext(TourContext);
  return (
    <>
      <FloatButtonGroup
        ref={floatGroup}
        shape="square"
        trigger="click"
        icon={<SettingOutlined></SettingOutlined>}
      >
        {/* Тур по приложению */}
        <FloatButton
          onClick={(e) => {
            e.stopPropagation();

            setIsTourOpen(true);
          }}
          tooltip={{ title: "Начать тур", placement: "left" }}
          icon={<InfoCircleOutlined></InfoCircleOutlined>}
        ></FloatButton>
        {/* Сброс вида */}
        <FloatButton
          tooltip={{ title: "Стандартный вид", placement: "left" }}
          icon={<ReloadOutlined></ReloadOutlined>}
          onClick={() =>
            mapRef.flyTo({
              center: [37.62, 55.75],
              padding: { top: 0, left: 0, right: 0, bottom: 0 },
              pitch: 0,
              bearing: 0,
              zoom: 1,
              duration: 500,
            })
          }
        ></FloatButton>
        {/* Выход */}
        <Popconfirm
          placement="left"
          title="Выйти из аккаунта?"
          onConfirm={logOut}
          cancelText="нет"
        >
          <FloatButton
            tooltip={{ title: "Кнопка выхода", placement: "left", zIndex: 0 }}
            icon={<LogoutOutlined></LogoutOutlined>}
          ></FloatButton>
        </Popconfirm>
      </FloatButtonGroup>
    </>
  );
};
