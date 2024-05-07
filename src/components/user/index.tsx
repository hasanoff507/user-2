import React, { useEffect, useState } from "react";
import { EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Layout, Button, Col, Card, Spin, Badge } from "antd";
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
interface TranslationsBadge {
  active: {
    uz: string;
    ru: string;
  };
  inactive: {
    uz: string;
    ru: string;
  };
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
  const [shouldFetch, setShouldFetch] = useState(true);
  


  
  const translations: Translations = {
    uz: "E'lonlar",
    ru: "Объявления",
  };
  const translationsBadge: TranslationsBadge = {
    active: {
      uz: "Faol",
      ru: "Активный",
    },
    inactive: {
      uz: "Faol emas",
      ru: "Не активный",
    },
  };


const fetchData = ()=>{
   
  setLoading(true);
  fetch(`${url}/api/NewsLine/active/true`)
    .then((response) => response.json())
    .then((json) => {
      const sortedData = json.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const needsDuplication = json.length <= 2;
      const duplicatedData = needsDuplication ? [...sortedData] : sortedData;
      setData(duplicatedData);
      setLoading(false);
      setShouldFetch(false); 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
}
   
useEffect(()=>{
  fetchData()
},[])


  const toggleActive = () => {
    setIsActiveToggled(!isActiveToggled);
    setLoading(true);
    const fetchUrl = isActiveToggled
      ? `${url}/api/NewsLine/active/true`
      : `${url}/api/NewsLine`;
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((json) => {
        const sortedData = json
          .filter((item) => item.active !== undefined) // Ensure there is an active flag
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setData(sortedData);
        console.log(sortedData);

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
    perPage: 5,
    arrows: false,
    autoStart: true,
    wheel: false,
    waitForTransition: false,
    autoplay: data.length > 2,
    autoScroll: data.length > 2 ? { speed: 1 } : undefined,

    pauseOnHover: true,
  };
  const splideKey = data.length;

  return (
    <Layout style={{ minHeight: "100vh", background: "unset" }}>
      <Header
        style={{
          padding: 0,
          background: "unset",
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
            width: "100%",
          }}
        >
          <Button
            style={{
              fontFamily: "sans-serif",
              color: "#b70043",
              margin: "0 10px",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "unset",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(2px)",
            }}
            onClick={toggleActive}
          >
            {translations[language]}
          </Button>
          <Button
            style={{
              marginRight: "10px",
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
          <Splide
            options={options}
            extensions={data.length > 2 ? { AutoScroll } : {}}
            key={splideKey}
          >
            {!loading &&
              data.length > 0 &&
              data.map((item: DataType, index: number) => {
                const lastItem = index === data.length - 1;
                return (
                  <SplideSlide
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "none !important",
                      marginTop: "400px !important",
                    }}
                    key={item.id}
                  >
                    <Badge.Ribbon
                      style={{ display: isActiveToggled ? "block" : "none" }}
                      text={`${
                        isActiveToggled
                          ? item.active
                            ? `${translationsBadge.active[language]}`
                            : `${translationsBadge.inactive[language]}`
                          : ""
                      }`}
                      color={`${
                        isActiveToggled ? (item.active ? "green" : "red") : ""
                      }`}
                    >
                      <Card
                        key={`card-${item.id}-${item.active}`}
                        className="card__padding"
                        style={{
                          position: "relative",
                          padding: "0px !important",
                          width: "100%",
                          background: "rgba(255, 255, 255, 0.5)",
                          height: "200px",
                          marginBottom: lastItem ? "450px" : "10px",
                        }}
                        title={truncateTitle(item.title, 30)}
                        bordered={false}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            height: "100%",
                          }}
                        >
                          <div>
                            <span>
                              {truncateDescription(item.description, 200)}{" "}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "end",
                            }}
                          >
                            <div>
                              <span
                                style={{ fontSize: "10px", color: "#a39797" }}
                              >
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
                        </div>

                        <ModalMoreUser
                          onMoreModalClick={onMoreModalClick}
                          onMoreModalClose={onMoreModalClose}
                          moreData={moreData}
                        />
                      </Card>
                    </Badge.Ribbon>
                  </SplideSlide>
                );
              })}
          </Splide>
        </Col>
      </Content>
    </Layout>
  );
};

export default User;
