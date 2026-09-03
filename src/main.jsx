import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MapProvider } from "react-map-gl/maplibre";
import "maplibre-gl-nasa-earthdata/style.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/Rout.jsx";
import { App, ConfigProvider } from "antd";
import "maplibre-gl/dist/maplibre-gl.css";
import { StrictMode } from "react";
import "./index.css";

import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MapProvider>
      <ConfigProvider>
        <App>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
            ></ReactQueryDevtools> */}
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </App>
      </ConfigProvider>
    </MapProvider>
  </StrictMode>,
);
