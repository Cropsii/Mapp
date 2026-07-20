import React from "react";
import { Navigate, Outlet } from "react-router";
import { pb } from "../utils/PB";

export const GuestOnlyCheck = () => {
  if (pb.authStore.isValid) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
