import { AuthCheckProvider } from "../context/providers/AuthCheckProvider";
import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import React from "react";
import App from "../App";
import { GuestOnlyCheck } from "../components/GuestOnlyCheck";
import { GlobeTest } from "../pages/GlobeTest";

export const router = createBrowserRouter([
  {
    element: <GuestOnlyCheck></GuestOnlyCheck>,
    children: [
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/",
    element: <AuthCheckProvider></AuthCheckProvider>,
    children: [
      {
        index: true,
        element: <App></App>,
      },
      {
        path: "globeGL",
        element: <GlobeTest></GlobeTest>,
      },
    ],
  },
]);
