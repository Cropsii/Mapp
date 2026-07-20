import { useLayoutEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router";
import { pb } from "../../utils/PB";

export const AuthCheckProvider = () => {
  const [user, setUser] = useState(pb.authStore.record);
  useLayoutEffect(() => {
    const ctrl = new AbortController();
    pb.authStore.onChange(
      (_, authRecord) => {
        setUser(authRecord);
      },
      true,
      ctrl,
    );
    return () => {
      ctrl.abort();
    };
  }, [setUser]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthContext.Provider value={user}>
      <Outlet></Outlet>
    </AuthContext.Provider>
  );
};
