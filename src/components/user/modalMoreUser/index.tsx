import React, { useEffect, useState } from "react";
import { Modal } from "antd";

interface DataType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: boolean;
  active: boolean;
}
type Props = {
  onMoreModalClick: boolean;
  onMoreModalClose: any;
  moreData: any;
};

const ModalMoreUser: React.FC<Props> = ({
  onMoreModalClick,
  onMoreModalClose,
  moreData,
}) => {

    
  return (
    <Modal
    title={moreData.map((item:any) => (<span key={item.id}>{item.title}</span>))}
      open={onMoreModalClick}
      onCancel={onMoreModalClose}
    >
     <div>
         {moreData.map((item:any)=>{
            return(
                <div key={item.id}>
                    {item.description}
                </div>
            )
        })}
    </div>
    </Modal>
  
  );
};

export default ModalMoreUser;
