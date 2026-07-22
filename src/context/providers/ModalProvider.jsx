import React, { useState } from "react";
import { ModalContext } from "../ModalContext";

export const ModalProvider = ({ children }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [cord, setCord] = useState({});
  return (
    <ModalContext.Provider
      value={{ isAddModalOpen, setIsAddModalOpen, cord, setCord }}
    >
      {children}
    </ModalContext.Provider>
  );
};
