import { BorderBeam, Card, Image, Space } from "antd";
import React, { useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import { mapStyles } from "../utils/mapAtributes";
export const ChangeStyleComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const selectedStyleIndex = localStorage.getItem("selectedIndex");
    if (selectedStyleIndex) {
      return selectedStyleIndex;
    }
    return 0;
  });

  const { mainMap: mapRef } = useMap("mainMap");

  const handleClick = async (item, index) => {
    const map = mapRef.getMap();
    await map.setStyle(item?.style, {
      diff: true,
      transformStyle: (prev, newstyle) => {
        console.log(prev);
        console.log(newstyle);
        return {...newstyle};
      },
    });

    localStorage.setItem("selectedIndex", index);

    setSelectedIndex(index);
  };

  return (
    <Space vertical>
      {mapStyles.map((item, index) => (
        <BorderBeam
          key={index}
          style={{ visibility: index == selectedIndex ? "visible" : "hidden" }}
        >
          <Card
            size="small"
            unselectable="on"
            title={item.name}
            hoverable
            onClick={() => handleClick(item, index)}
          >
            <Image
              aria-placeholder={item?.name}
              loading="lazy"
              preview={false}
              draggable={false}
              unselectable="on"
              src={item.img}
            ></Image>
          </Card>
        </BorderBeam>
      ))}
    </Space>
  );
};
