import { Popup } from "react-map-gl/maplibre";
import React from "react";
import { useUrl } from "../hooks/useUrl";
import { Image } from "antd";

export const PopUpInfo = ({ lng = null, lat = null, data, ...props }) => {
  const { data: url, isLoading } = useUrl(data, data?.file);

  if (lng == null || lat == null) {
    return null;
  }
  return (
    <Popup
      latitude={lat}
      longitude={lng}
      {...props}
      offset={12}
      anchor="bottom"
    >
      <Image src={url} placeholder loading={isLoading}></Image>
    </Popup>
  );
};
