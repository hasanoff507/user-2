import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Modal } from "antd";
import CardItem from "./card";
import ModalCreate from "./modalCreate";
const { Header, Sider, Content } = Layout;
interface DataType {
    id: number,
    title: string,
    description: string
    createdAt: string,
    updatedAt: boolean,
    active: boolean
}
const Admin: React.FC = () => {
  const url = "http://localhost:9027";
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDesc, setNewsDesc] = useState("");
  const [cardData, setCardData] = useState<DataType[]>([]);
  const [isActive, setIsActive] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchData();
  }, [isActive]); // Dependency on isActive to re-fetch when it changes

  const fetchData = () => {

    fetch(`${url}/api/NewsLine/active/${isActive}`)
      .then((response) => response.json())
      .then((data) => setCardData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewsTitle(""); // Clear fields on cancel
    setNewsDesc("");
  };

  const onModalCreateFinish = () => {
    const dataCreate = {
      title: newsTitle,
      description: newsDesc,
    };
    fetch(`${url}/api/NewsLine`, {
      method: "POST",
      body: JSON.stringify(dataCreate),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsModalOpen(false);
        setNewsTitle(""); // Clear fields on success
        setNewsDesc("");
        fetchData(); // Re-fetch data to reflect changes
      })
      .catch((error) => console.error("Failed to create news:", error));
  };

  const handleMenuClick = (e:any) => {
    setIsActive(e.key === "1");
  };

  const onModalFeild = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ background: "#ffffff" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <CheckCircleOutlined style={{ color: "green" }} />,
              label: "Active",
            },
            {
              key: "2",
              icon: <CheckCircleOutlined />,
              label: "Inctive",
            },
          ]}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "relative",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            style={{ position: "absolute", right: "15px", top: "15px" }}
            icon={<PlusOutlined />}
            onClick={showModal}
          />
          <ModalCreate
            onModalFeild={onModalFeild}
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            onModalCreateFinish={onModalCreateFinish}
            setNewsTitle={setNewsTitle}
            setNewsDesc={setNewsDesc}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 100,
            maxHeight:"841px",
            overflow:"auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {cardData.length > 0 ? (
            <CardItem cardData={cardData}/>) : (
            <div>
              {isActive
                ? "No active content available."
                : "No inactive content available."}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
