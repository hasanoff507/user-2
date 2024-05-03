import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import ModalMore from "../modalMore";
import ModalInactive from "../modalinactive";
import ModalPut from "../modalPut";
import ModalDelete from "../modalDelete";

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
  fetchData: () => void
  isActive:boolean

};

const CardItem: React.FC<Props> = ({ cardData,fetchData, isActive,}) => {
  const url = "http://10.0.53.146:9027";
  const [moreData, setMoreData] = useState<DataType[] >([]);
  const [onMoreModalClick, setOnMoreModalClick] = useState(false);
  const [putModalOpen, setPutModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [putModalId,setPutModalId]= useState(0)
  const [deleteId, setDeleteId] = useState(0)

  const [putActive, setPutActive]= useState(false)
  const [putActiveId, setPutActiveId]= useState(0)
  const onMoreClick = (id: number) => {
    fetch(`${url}/api/NewsLine/${id}`)
      .then(response => response.json())
      .then(data => {
        const result = Array.isArray(data) ? data : [data];
        setMoreData(result);
        setOnMoreModalClick(true);
      })
      .catch(error => console.error("Error fetching data:", error));
  };
const onInactiveCkick=(id:number)=>{
  setPutActive(true)
  setPutActiveId(id)
}

const onActiveClick=(id:number)=>{
  setPutActive(true)
  setPutActiveId(id)
}
const putClick = (id:number)=>{
  setPutModalOpen(true)
  setPutModalId(id)
}
  const onMoreModalClose = () => {
    setOnMoreModalClick(false);
  };
  const onPutModalClose = () => {
    setPutModalOpen(false);
  };

  const onDeleteModalClick = (id:number) => {
    setDeleteModalOpen(true);
    setDeleteId(id)
  };
  const onDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const truncateDescription = (description:string, maxLength:number) => {
    return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
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
              <span>{truncateDescription(item.description, 200)}</span>

              <div>
                {isActive ? <span style={{position:'absolute', top:'65px', fontSize:'10px'}}>{formatDate(item.createdAt)}</span> : <span style={{position:'absolute', top:'65px'}}>{formatDate(item.updatedAt)}</span>}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
           
                  {isActive ?  <Button onClick={()=>onInactiveCkick(item.id)}
                  icon={<VerticalAlignBottomOutlined style={{ color: "#2869FF" }} />}
                />:  <Button onClick={() => onActiveClick(item.id)}
                icon={<VerticalAlignTopOutlined  style={{ color: "#2869FF" }} />}/>    
              }
              <ModalInactive fetchData={fetchData} putActive={putActive} putActiveId={putActiveId} setPutActiveId={setPutActiveId} setPutActive={setPutActive} isActive={isActive}/>
               {isActive ? <Button onClick={()=>putClick(item.id)} icon={<EditOutlined style={{ color: "orange" }} />} />:<Button  icon={<DeleteOutlined onClick={()=>onDeleteModalClick(item.id)} style={{ color: "red" }} />} />}
                <ModalPut onPutModalClose={onPutModalClose} putModalOpen={putModalOpen} putModalId={putModalId} fetchData={fetchData} setPutModalOpen={setPutModalOpen}/>
               <ModalDelete fetchData={fetchData} onDeleteModalClose={onDeleteModalClose} deleteModalOpen={deleteModalOpen} deleteId={deleteId}  setDeleteModalOpen={setDeleteModalOpen}/>
                <Button
                   onClick={() => onMoreClick(item.id)}
                  icon={<EyeOutlined  />}
                />
                 <ModalMore
        key={item.id} 
        onMoreModalClick={onMoreModalClick}
        onMoreModalClose={onMoreModalClose}
        moreData={moreData}
      />
              </div>
            </Card>
          </Col>
        </Row>
      ))}
     
    </div>
  );
};

export default CardItem;
