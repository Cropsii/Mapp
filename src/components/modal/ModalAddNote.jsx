import { Button, Flex, Form, Input, Modal, Statistic, Upload } from "antd";
import { useMutateCollection } from "../../hooks/useMutateCollection";
import { ModalContext } from "../../context/ModalContext";
import { UploadOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import React, { useContext } from "react";
import { pb } from "../../utils/PB";

export const ModalAddNote = () => {
  const { isAddModalOpen, setIsAddModalOpen } = useContext(ModalContext);
  const { addToCollection, addToCollectionData } = useMutateCollection();
  const { cord } = useContext(ModalContext);

  const [form] = Form.useForm();
  const finish = async (values) => {
    const data = {
      ...values,
      relation: pb.authStore.record.id,
      geoPoint: {
        lon: cord.lng,
        lat: cord.lat,
      },
    };
    console.log(data);

    addToCollection({
      collectionName: "notes",
      data: data,
    });
    form.resetFields();
    setIsAddModalOpen(false);
  };
  return (
    <Form layout="vertical" id="addForm" form={form} onFinish={finish}>
      <Modal
        okText="Добавить"
        centered
        zIndex={10}
        title="Добавить новую заметку"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            block
            loading={addToCollectionData.isPending}
            onClick={() => form.submit()}
          >
            Добавить
          </Button>,
        ]}
      >
        <Flex justify="space-around">
          <Statistic title="Широта" value={cord.lat} precision={3} />

          <Statistic title="Долгота" value={cord.lng} precision={3} />
        </Flex>
        <FormItem name={"title"} label={"Название"}>
          <Input></Input>
        </FormItem>
        <FormItem
          name={"file"}
          getValueFromEvent={(e) => {
            console.log(e?.fileList[0]?.originFileObj);
            return e?.fileList[0]?.originFileObj;
          }}
          // valuePropName="fileList"
        >
          <Upload
            maxCount={1}
            previewFile={(e) => {
              const url = URL.createObjectURL(e);
              return Promise.resolve(url);
            }}
            beforeUpload={() => false}
            listType="picture-card"
          >
            <UploadOutlined></UploadOutlined>
          </Upload>
        </FormItem>
      </Modal>
    </Form>
  );
};
