import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router";
import { pb } from "../../utils/PB";

export const AuthCheckProvider = () => {
  const [user, setUser] = useState(pb.authStore.record);
  useEffect(() => {
    const ctrl = new AbortController();
    pb.collection("users")
      .authRefresh()
      .catch(() => pb.authStore.clear());

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
  }, []);

  if (!pb.authStore.isValid) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthContext.Provider value={user}>
      <Outlet></Outlet>
    </AuthContext.Provider>
  );
};
