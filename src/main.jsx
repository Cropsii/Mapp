import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/rout.jsx";
import { App, ConfigProvider } from "antd";
import "maplibre-gl/dist/maplibre-gl.css";
import { StrictMode } from "react";
import "./index.css";
import { ModalProvider } from "./context/providers/ModalProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider>
      <App>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </ModalProvider>
      </App>
    </ConfigProvider>
  </StrictMode>,
);
