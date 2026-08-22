import { Button, Image, Space, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDelete } from "../hooks/useDelete";
import { Popup } from "react-map-gl/maplibre";
import { useUrl } from "../hooks/useUrl";
import React, { useEffect } from "react";
import useApp from "antd/es/app/useApp";

export const PopUpInfo = ({
  lng = null,
  lat = null,
  data,
  setPopUpData,
  ...props
}) => {
  const { deleteData, query } = useDelete();
  const { message } = useApp();
  const { data: url, isLoading } = useUrl(data, data?.file);
  const { isPending } = query;

  useEffect(() => {
    if (isPending) {
      message.loading({
        content: "Удаление",
        key: "delete",
      });
    } else {
      message.destroy("delete");
    }
  }, [isPending, message]);

  if (lng == null || lat == null) {
    return null;
  }

  return (
    <Popup
      style={{ color: "red" }}
      latitude={lat}
      longitude={lng}
      {...props}
      offset={12}
      anchor="bottom"
      onClose={() => setPopUpData(null)}
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
          loading={query.isPending}
          onClick={() => {
            setPopUpData(null);
            deleteData(data.collectionName, data.id);
          }}
        ></Button>
      </Space>
    </Popup>
  );
};
