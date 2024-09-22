import React from "react";

const MenuContext = React.createContext({
  isOpened: false,
  setIsOpened: () => {},
});

export default MenuContext;
