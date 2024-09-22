import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "@contexts/ContextProvider.js";
import { Header } from "..";
import { Toaster } from "@components/ui/toaster";

export default function DefaultLayout() {
  const { user, token, notification } = useStateContext();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="transation-height duration-75 ease-out">
      <main className="pb-16 mx-8 sm:mx-4 md:mx-6 max-w-screen-xl">
        <Header />
        <Outlet />
      </main>
      <Toaster />
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
