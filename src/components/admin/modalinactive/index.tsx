import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

type Props = {
  putActive: boolean;
  putActiveId: number;
  setPutActiveId: React.Dispatch<React.SetStateAction<number>>;
  setPutActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  fetchData: () => void;
};

const ModalInactive: React.FC<Props> = ({
  putActive,
  putActiveId,
  setPutActiveId,
  setPutActive,
  isActive,
  fetchData,
}) => {
  const url = "http://10.0.53.146:9027";

  const onInactiveCkickClose = () => {
    setPutActive(false);
  };

  const onActive = () => {
    const dataPutActive = { active: true };
    fetch(`${url}/api/NewsLine?id=${putActiveId}`, {
      method: "PUT",
      body: JSON.stringify(dataPutActive),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPutActive(false);

        fetchData();
      })
      .catch((error) => console.error("Failed to create news:", error));
  };
  const onInActive = () => {
    const dataPutActive = { active: false };
    fetch(`${url}/api/NewsLine?id=${putActiveId}`, {
      method: "PUT",
      body: JSON.stringify(dataPutActive),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPutActive(false);
        fetchData();
      })
      .catch((error) => console.error("Failed to create news:", error));
  };

  return (
    <div>
      {isActive ? (
        <Modal
          title="Faol emasligini hohlaysizmi ?"
          open={putActive}
          onCancel={onInactiveCkickClose}
        >
          <div>Siz haqiqatdan ham faol emasligni bo'lishini hohlaysizmi ?</div>
          <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Button onClick={onInactiveCkickClose}>Yoq</Button>
            <Button
              onClick={onInActive}
              style={{ background: "#2869FF", color: "#fff" }}
            >
              Ha
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal
          title="Faol bo'lishini hohlaysizmi ?"
          open={putActive}
          onCancel={onInactiveCkickClose}
        >
          <div>Siz haqiqatdan ham faol bo'lishini hohlaysizmi ?</div>
          <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Button onClick={onInactiveCkickClose}>Yoq</Button>
            <Button
              onClick={onActive}
              style={{ background: "#2869FF", color: "#fff" }}
            >
              Ha
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ModalInactive;
