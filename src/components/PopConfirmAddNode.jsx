import { QuestionCircleOutlined } from "@ant-design/icons";
import { ModalAddNote } from "./modal/ModalAddNote";
import { Marker } from "react-map-gl/maplibre";
import { useRef, useState } from "react";
import { Popconfirm } from "antd";

export const PopConfirmAddNode = ({ isPopOpen, cord, setIsPopOpen }) => {
  const markerRef = useRef();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  if (!cord) {
    return;
  }

  return (
    <>
      <ModalAddNote
        cord={cord}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      ></ModalAddNote>
      <Marker ref={markerRef} latitude={cord?.lat} longitude={cord?.lng}>
        <Popconfirm
          icon={<QuestionCircleOutlined></QuestionCircleOutlined>}
          title="Добавить заметку?"
          cancelText="Отмена"
          onConfirm={() => {
            console.log(markerRef);
            setIsPopOpen(false);
            setIsAddModalOpen(true);
          }}
          open={isPopOpen}
          onCancel={() => setIsPopOpen(false)}
        ></Popconfirm>
      </Marker>
    </>
  );
};
