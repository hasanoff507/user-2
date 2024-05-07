import React from "react";
import { Modal, Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import url from "../../../url";
import { json } from "stream/consumers";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  onModalFeild: any;
  fetchData: () => void
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
};
type FieldType = {
  newsTitle?: string;
  newsDesc?: string;
};
const ModalCreate: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  fetchData,
  onModalFeild,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();



  const handleSubmit = (data:any) => {
    console.log(data)
    const dataCreate = {
      title: data.newsTitle,
      description: data.newsDesc,
    };
    fetch(`${url}/api/NewsLine`, {
      method: "POST",
      body: JSON.stringify(dataCreate),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setIsModalOpen(false);
        form.resetFields();
        fetchData();  
      })
      .catch((error) => console.error("Failed to create news:", error));
  }
  return (
    <Modal
      title="Yangilik Kiriting !"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onModalFeild}
        autoComplete="off"
      >
        <Form.Item
          label="Yangilik Mavzusi"
          name="newsTitle"
          rules={[{ required: true, message: "Yangilik mavzusini kiriting!" }]}
        >
          <TextArea  rows={4} />
        </Form.Item>

        <Form.Item label="Yangilik Tavsifi" name="newsDesc">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={handleCancel}>Yopish</Button>
          <Button type="primary" htmlType="submit">
            Tasdiqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
