import { QuestionCircleOutlined } from "@ant-design/icons";
import { ModalContext } from "../context/ModalContext";
import { Marker } from "react-map-gl/maplibre";
import { useContext } from "react";
import { Popconfirm } from "antd";

export const PopConfirmAddNode = ({ isPopOpen, cord, setIsPopOpen }) => {
  
  const { setIsAddModalOpen, setCord } = useContext(ModalContext);

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
