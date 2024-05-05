import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";
import url from "../../../url";

type Props = {
  onPutModalClose: () => void;
  putModalOpen: boolean;
  putModalId: number;
  fetchData: () => void
  setPutModalOpen: React.Dispatch<React.SetStateAction<boolean>>
};

type FieldType = {
  newsTitle?: string;
  newsDesc?: string;
};

const ModalPut: React.FC<Props> = ({
  onPutModalClose,
  putModalOpen,
  putModalId,
  fetchData,
  setPutModalOpen
}) => {
  const [form] = Form.useForm<FieldType>();
  const [putData, setPutData] = useState<FieldType | null>(null);

  useEffect(() => {
    if (putModalOpen) {
      fetch(`${url}/api/NewsLine/${putModalId}`)
        .then((response) => response.json())
        .then((data) => {
          setPutData({
            newsTitle: data.title, // Assuming the API returns an object with 'title'
            newsDesc: data.description, // and 'description' fields
          });
          form.setFieldsValue({
            newsTitle: data.title,
            newsDesc: data.description,
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [putModalOpen, putModalId, form, url]);
  const onPutSave = (values:any) => {
    const dataPutActive = { title:values.newsTitle, description:values.newsDesc};
    fetch(`${url}/api/NewsLine?id=${putModalId}`, {
      method: "PUT",
      body: JSON.stringify(dataPutActive),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData()
        setPutModalOpen(false)
      })
      .catch((error) => console.error("Failed to update news:", error));
  };

  return (
    <Modal
      title="Yangilikga o'zgarish kiritmoqchimisiz ?"
      open={putModalOpen}
      onCancel={onPutModalClose}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={putData || {}} // Set initial values based on state
        onFinish={onPutSave}
        autoComplete="off"
      >
        <Form.Item
          label="Yangilik Mavzusi"
          name="newsTitle"
          rules={[{ required: true, message: "Yangilik mavzusini kiriting!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item label="Yangilik Tavsifi" name="newsDesc">
          <TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={onPutModalClose}>Yopish</Button>
          <Button type="primary" htmlType="submit">
            Tasdiqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalPut;
