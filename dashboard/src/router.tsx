import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Login,
  NotFound,
  Signup,
  Dashboard,
  Blogs,
  NewBlog,
  NewImage,
  EditBlog,
  Images,
  Projects,
  Messages,
  MessagePage,
  NewProject,
  EditProject,
} from "./screens";
import { DefaultLayout, GuestLayout } from "./components";
import Test from "./screens/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/test" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/new",
        element: <NewBlog />,
      },
      {
        path: "/blogs/:id",
        element: <EditBlog />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/new",
        element: <NewProject />,
      },
      {
        path: "/projects/:id",
        element: <EditProject />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/messages/:id",
        element: <MessagePage />,
      },
      {
        path: "/images",
        element: <Images />,
      },
      {
        path: "/images/new",
        element: <NewImage />,
      },
      {
        path: "/users",
        element: <Dashboard />,
      },
      {
        path: "/users/new",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
