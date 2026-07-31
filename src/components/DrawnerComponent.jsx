import { Drawer } from "antd";
import React, { useState } from "react";
import { DrawnerContext } from "../context/DrawnerContext";

export const DrawnerComponent = ({ children }) => {
  const [isDrawnerOpen, setIsDrawnerOpen] = useState(false);
  return (
    <DrawnerContext.Provider value={{ isDrawnerOpen, setIsDrawnerOpen }}>
      <Drawer open={isDrawnerOpen} resizable placement="left"></Drawer>
      {children}
    </DrawnerContext.Provider>
  );
};
