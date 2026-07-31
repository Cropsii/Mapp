import { QuestionCircleOutlined } from "@ant-design/icons";
import { Marker } from "react-map-gl/maplibre";
import { Popconfirm } from "antd";

export const PopConfirmAddNode = ({
  isPopOpen,
  cord,
  setIsPopOpen,
  setIsAddModalOpen,
  setCord,
}) => {
  if (!cord) {
    return;
  }
  return (
    <Marker latitude={cord?.lat} longitude={cord?.lng}>
      <Popconfirm
        icon={<QuestionCircleOutlined></QuestionCircleOutlined>}
        title="Добавить заметку?"
        cancelText="Отмена"
        onConfirm={() => {
          setCord(cord);
          setIsPopOpen(false);
          setIsAddModalOpen(true);
        }}
        open={isPopOpen}
        onCancel={() => setIsPopOpen(false)}
      ></Popconfirm>
    </Marker>
  );
};
