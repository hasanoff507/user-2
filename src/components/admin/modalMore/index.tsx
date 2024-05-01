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
  moreData: DataType[];
};

const ModalMore: React.FC<Props> = ({
  onMoreModalClick,
  onMoreModalClose,
  moreData,
}) => {

    
  return (
    // <Modal
    //   open={onMoreModalClick}
    //   onCancel={onMoreModalClose}
    // >
   
    // </Modal>
    <div>
        {moreData.map((item:DataType)=>{
            return(
                <div key={item.id}>
                    {item.description}
                </div>
            )
        })}
    </div>
  );
};

export default ModalMore;
