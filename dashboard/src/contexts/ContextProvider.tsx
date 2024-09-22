import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { User } from "@types/User";

interface MyContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string;
  setToken: (token: string) => void;
  notification: string;
  setNotification: (message: string) => void;
}

type ContextChildren = {
  children: React.ReactNode;
};

const StateContext = createContext<MyContextProps>({
  user: null,
  setUser: () => {},
  token: "",
  setToken: () => {},
  notification: "",
  setNotification: () => {},
});

export const ContextProvider = ({ children }: ContextChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string>("");
  const [notification, _setNotification] = useState<string>("");

  const setToken = (token: string) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      console.log("no access token");
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  const setNotification = (message: string) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedUser && storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.clear();
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
