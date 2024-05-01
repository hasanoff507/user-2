import React from "react";
import { Modal, Form, Input, Button } from "antd";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  onModalCreateFinish: any;
  onModalFeild: any;
  setNewsTitle: React.Dispatch<React.SetStateAction<string>>
  setNewsDesc: React.Dispatch<React.SetStateAction<string>>
};
type FieldType = {
  newsTitle?: string;
  newsDesc?: string;
};
const ModalCreate: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  onModalCreateFinish,
  onModalFeild,
  setNewsTitle,
  setNewsDesc
}) => {

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsTitle(event.target.value);
  };


  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsDesc(event.target.value);
  };

  return (
    <Modal
      title="Yangilik Kiriting !"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onModalCreateFinish}
        onFinishFailed={onModalFeild}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Yangilik Mavzusi"
          name="newsTitle"
          rules={[{ required: true, message: "Yangilik mavzusini kiriting!" }]}
        >
            <Input onChange={handleTitleChange} />
        </Form.Item>

        <Form.Item<FieldType> label="Yangilik Tavsifi" name="newsDesc">
        <Input onChange={handleDescChange} />
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
