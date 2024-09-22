import React from "react";
import { MenuContext } from "../../contexts";
import { useIsOpened } from "../../hooks";

type MenuContextType = {
  children: React.ReactNode;
};

const Providers = ({ children }: MenuContextType) => {
  const menuState = useIsOpened();

  return (
    <MenuContext.Provider value={menuState}>{children}</MenuContext.Provider>
  );
};

export default Providers;
