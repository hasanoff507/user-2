import React, { useEffect, useState } from "react";
import { Modal,Button} from "antd";
import url from "../../../url";


type Props = {
    onDeleteModalClose: () => void
    deleteModalOpen: boolean;
    deleteId:number
    fetchData: () => void
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    
};

const ModalDelete: React.FC<Props> = ({onDeleteModalClose,deleteModalOpen,deleteId,fetchData,setDeleteModalOpen
}) => {

    function deleteData() {
        const itemUrl = `${url}/api/NewsLine/${deleteId}`;
       
      
        fetch(itemUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        })
          .then((response) => response.json())
          .then(() => {
            fetchData()
            setDeleteModalOpen(false)
          })
          .catch((error) => {
            console.error("Error:", error);
            alert('error !!')
          });
      }
    
  return (
    <Modal
    title="Siz o'chirishni hohlaysizmi?"
      open={deleteModalOpen}
      onCancel={onDeleteModalClose}
    >
     <div>
        <span>O'chirishni hohlaysizmi ?</span>

    </div>
    <div style={{display:'flex',justifyContent:'end',gap:'10px'}}>
        <Button>Yopish</Button>
        <Button onClick={deleteData} style={{background:'red',color:'white'}}>O'chirish</Button>
    </div>
    </Modal>
   
  );
};

export default ModalDelete;
