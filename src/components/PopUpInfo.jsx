import { Button, Image, Space, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDelete } from "../hooks/useDelete";
import { Popup } from "react-map-gl/maplibre";
import { useUrl } from "../hooks/useUrl";
import React from "react";

export const PopUpInfo = ({ lng = null, lat = null, data, ...props }) => {
  const { data: url, isLoading } = useUrl(data, data?.file);
  console.log(data);

  const { deleteData } = useDelete();
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
      <Space vertical>
        <Typography.Text title={data.title}>{data.title}</Typography.Text>
        {!isLoading && (
          <Image
            src={url || ""}
            // placeholder={<Skeleton.Image active />}
            loading={"lazy"}
          ></Image>
        )}

        <Button
          danger
          icon={<DeleteOutlined></DeleteOutlined>}
          onClick={() => {
            deleteData(data.collectionName, data.id);
          }}
        ></Button>
      </Space>
    </Popup>
  );
};
