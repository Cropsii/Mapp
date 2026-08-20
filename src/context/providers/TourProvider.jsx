import React, { useRef, useState } from "react";
import { TourContext } from "../TourContext";
import { Tour } from "antd";

export const TourrefProvider = ({ children }) => {
  const floatGroup = useRef(null);
  const sideBar = useRef(null);
  const nasa = useRef(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  return (
    <TourContext.Provider
      value={{ floatGroup, isTourOpen, sideBar, nasa, setIsTourOpen }}
    >
      <Tour
        onFinish={() => setIsTourOpen(false)}
        onClose={() => setIsTourOpen(false)}
        open={isTourOpen}
        steps={[
          {
            title: "Быстрые настройки",
            description: "Тур / сброси вида / выход из аккаунта",
            target: () => {
              console.log(floatGroup);

              return floatGroup.current;
            },
          },
          {
            title: "Боковое меню",
            placement: "right",

            description:
              "Используется для настройки визуального стиля карты и ее атрибутов",
            target: () => {
              console.log(sideBar);
              return sideBar.current;
            },
          },
        ]}
      ></Tour>
      {children}
    </TourContext.Provider>
  );
};
