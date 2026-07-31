import { Card, Image, Space } from "antd";
import React from "react";
import { useMap } from "react-map-gl/maplibre";
import { mapAtributes } from "../utils/mapAtributes";

export const ChangeStyleComponent = () => {
  const prewImgArr = [
    {
      name: "Светлая 3д карта",
      img: "public/lightPreviewMap.png",
      style: `${mapAtributes.geApify.light}${mapAtributes.geApify.apiKey}`,
    },
    {
      name: "Спутниковые снимки",
      img: "public/satellitePreviewMap.png",
      style: `${mapAtributes.mapTiler.satellite}${mapAtributes.mapTiler.apiKey}`,
    },
    {
      name: "Спутник пустой",
      img: "public/satelliteBlankPreviewMap.png",
      style: `${mapAtributes.mapTiler.satelliteBlank}${mapAtributes.mapTiler.apiKey}`,
    },
    {
      name: "Темная тема",
      img: "public/darkPreviewMap.png",
      style: `${mapAtributes.geApify.dark}${mapAtributes.geApify.apiKey}`,
    },
  ];
  const { mainMap: mapRef } = useMap("mainMap");

  return (
    <Space vertical>
      {prewImgArr.map((item, index) => (
        <Card
          unselectable="on"
          key={index}
          title={item.name}
          hoverable
          onClick={() => {
            const map = mapRef.getMap();
            map.setStyle(item?.style);
          }}
        >
          <Image
            preview={false}
            draggable={false}
            unselectable="on"
            src={item.img}
          ></Image>
        </Card>
      ))}
    </Space>
  );
};
