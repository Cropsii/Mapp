import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./context/providers/ModalProvider.jsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/rout.jsx";
import { App } from "antd";
import "maplibre-gl/dist/maplibre-gl.css";
import { StrictMode } from "react";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/providers/ThemeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            ></ReactQueryDevtools>
            <RouterProvider router={router}></RouterProvider>
          </ModalProvider>
        </QueryClientProvider>
      </App>
    </ThemeProvider>
  </StrictMode>,
);
