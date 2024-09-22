import React from "react";
import ReactDOM from "react-dom/client";
import "../css/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./contexts/ContextProvider.js";
import { ThemeProvider } from "@contexts/ThameProvider.js";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ContextProvider>
    </React.StrictMode>
  );
}
