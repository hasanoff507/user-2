import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import {
  EditOutlined,
  MoreOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import ModalMore from "../modalMore";

interface DataType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: boolean;
  active: boolean;
}

type Props = {
  cardData: DataType[];
};

const CardItem: React.FC<Props> = ({ cardData }) => {
  const url = "http://localhost:9027";
  const [moreData, setMoreData] = useState<DataType[] >([]);
  const [onMoreModalClick, setOnMoreModalClick] = useState(false);

  const onMoreClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
    fetch(`${url}/api/NewsLine/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMoreData(data);
        setOnMoreModalClick(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const onMoreModalClose = () => {
    setOnMoreModalClick(false);
  };

  return (
    <div>
      {cardData.map((item: DataType) => (
        <Row key={item.id} gutter={24} style={{ position: "relative" }}>
          <Col span={24} style={{ position: "relative" }}>
            <Card
              style={{ background: "#F5F5F5 ", position: "relative" }}
              title={item.title}
              bordered={false}
            >
              <span>{item.description}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Button
                  icon={<VerticalAlignBottomOutlined style={{ color: "#2869FF" }} />}
                />
                <Button icon={<EditOutlined style={{ color: "orange" }} />} />
                <Button
                  onClick={onMoreClick(item.id)}
                  icon={<MoreOutlined style={{ color: "blue" }} />}
                />
              </div>
            </Card>
          </Col>
        </Row>
      ))}
      <ModalMore
        key="modal-more" // Unique key prop
        onMoreModalClick={onMoreModalClick}
        onMoreModalClose={onMoreModalClose}
        moreData={moreData}
      />
    </div>
  );
};

export default CardItem;
