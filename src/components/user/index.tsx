import React, { useEffect, useState } from "react";
import {
  EyeOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Button, Row, Col, Card, Modal, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import ModalMoreUser from "./modalMoreUser";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Options as SplideOptions } from "@splidejs/splide";
import url from "../../url";
const { Header, Content } = Layout;

interface DataType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: boolean;
  active: boolean;
}

interface IValidate {
  lang: string;
  userName: string;
}
interface Translations {
  [key: string]: string;
}
const admins = ["grci1", "grci2", "matrixbi"];

const User: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [onMoreModalClick, setOnMoreModalClick] = useState(false);
  const [moreData, setMoreData] = useState<DataType[]>([]);
  const [showAdminButton, setShowAdminButton] = useState(true);
  const [isActiveToggled, setIsActiveToggled] = useState(false);
  const [language, setLanguage] = useState("uz");
  const translations: Translations = {
    uz: "Е'лонлар",
    ru: "Объявления",
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/api/NewsLine/active/true`)
      .then((response) => response.json())
      .then((json) => {
        // Sort the data by converting the createdAt field to timestamps and then subtracting
        const sortedData = json.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(sortedData);
        
        setData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const toggleActive = () => {
    setIsActiveToggled(!isActiveToggled); 
    setLoading(true);
    fetch(`${url}/api/NewsLine`)
      .then((response) => response.json())
      .then((json) => {
        // Sort and filter data where active is a known boolean (true or false)
        const sortedAndFilteredData = json
          .filter(item => item.active !== undefined) // Ensure there is an active flag
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setData(sortedAndFilteredData);
        console.log(sortedAndFilteredData);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  useEffect(() => {
    let userName;
    let lang;
    const searchParams = new URLSearchParams(location.search);
    const qParams = searchParams.get("q");
    const parsedParams = qParams && new URLSearchParams(qParams);
    if (parsedParams) {
      userName = parsedParams.get("userName");
    }
    //@ts-ignore
    const p = new URL(document.location).searchParams;
    lang = p.get("lang");

    const allowedUsers = ["grci1", "grci2", "matrixbi"];

    if (userName && lang && allowedUsers.includes(userName)) {
      validateAdmins({ userName, lang });
      setLanguage(lang);

      setShowAdminButton(true);
    } else {
      setShowAdminButton(false);
    }
  }, [location.search]);

  const handleAdminNavigate = () => {
    let userName;
    let lang;
    const searchP = new URLSearchParams(location.search);
    const qParams = searchP.get("q");
    const parsedParams = qParams && new URLSearchParams(qParams);
    if (parsedParams) {
      userName = parsedParams.get("userName");
    }
    //@ts-ignore
    const p = new URL(document.location).searchParams;
    lang = p.get("lang");
    if (userName && lang) {
      validateAdmins({ userName, lang });
      console.log(userName, lang);
      setLanguage(lang);
      setShowAdminButton(true);
    } else {
      setShowAdminButton(false);
    }
  };

  const validateAdmins = (params: IValidate) => {
    admins.forEach((admin: string) => {
      if (admin === params.userName) {
        window.open("admin", "_blank");
      } else {
        setShowAdminButton(true);
      }
    });
  };

  const onMoreClick = (id: number) => {
    fetch(`${url}/api/NewsLine/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const result = Array.isArray(data) ? data : [data];
        setMoreData(result);
        setOnMoreModalClick(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const onMoreModalClose = () => {
    setOnMoreModalClick(false);
  };

  const options: SplideOptions = {
    type: "loop",
    direction: "ttb",
    height: "100%",
    perPage: 3,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
  };
  return (
    <Layout style={{ minHeight: "100vh", background: "unset" }}>
      <Header
        style={{
          padding: 0,
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(3px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "50px",
          position: "fixed",
          width: "100%",
          zIndex: "99",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width:'100%'
          }}
        >
          <Button
            style={{
              fontFamily: "sans-serif",
              color: "#b70043",
              margin: "0 30px",
            }}
            onClick={toggleActive}
          >
            {translations[language]}
          </Button>
          <Button
            style={{
              marginRight: "25px",
              border: "none",
              display: showAdminButton ? "block" : "none",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(2px)",
            }}
            icon={<PlusCircleOutlined />}
            onClick={handleAdminNavigate}
          />
        </div>
      </Header>
      <Content
        style={{
          margin: "-11px 10px 0",
          minHeight: 100,
          maxHeight: "100%",
          background: "unset ",
        }}
      >
        {loading && (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin />
          </div>
        )}
        <Col
          span={24}
          style={{
            position: "relative",
            paddingTop: "65px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Splide options={options} extensions={{ AutoScroll }}>
            {!loading &&
              data.length > 0 &&
              data.map((item: DataType) => (
                <SplideSlide key={item.id}>
                  <Card
                    key={`card-${item.id}-${item.active}`}
                    className={`cards card-animation ${isActiveToggled ? (item.active ? 'active-card' : 'inactive-card') : ''}`}

                    style={{
                      position: "relative",
                      padding: "0px !important",
                      marginBottom:'10px',
                      background:'rgba(255, 255, 255, 0.5)'
                    }}
                    title={truncateTitle(item.title, 30)}
                    bordered={false}
                  >
                    <span>{truncateDescription(item.description, 200)}</span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        marginTop: "-5px",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "10px", color: "#a39797" }}>
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      <Button
                        onClick={() => onMoreClick(item.id)}
                        icon={<EyeOutlined style={{ color: "a39797" }} />}
                        style={{
                          background: "transparent",
                          border: "none",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>

                    <ModalMoreUser
                      onMoreModalClick={onMoreModalClick}
                      onMoreModalClose={onMoreModalClose}
                      moreData={moreData}
                    />
                  </Card>
                </SplideSlide>
              ))}
          </Splide>
        </Col>
      </Content>
    </Layout>
  );
};

export default User;
