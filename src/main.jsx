import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/rout.jsx";
import { App, ConfigProvider } from "antd";
import "maplibre-gl/dist/maplibre-gl.css";
import { StrictMode } from "react";
import "./index.css";
import { MapProvider } from "react-map-gl/maplibre";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MapProvider>
      <ConfigProvider>
        <App>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            ></ReactQueryDevtools>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </App>
      </ConfigProvider>
    </MapProvider>
  </StrictMode>,
);
