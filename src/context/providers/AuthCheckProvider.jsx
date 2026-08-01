import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router";
import { pb } from "../../utils/PB";
import { Spin } from "antd";

export const AuthCheckProvider = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_, record) => {
      setUser(record);
    });

    pb.collection("users")
      .authRefresh()
      .catch((err) => {
        if (!err.isAbort) {
          console.error(err);
          pb.authStore.clear();
        }
      })
      .finally(() => setLoading(false));

    return unsubscribe;
  }, []);

  if (loading) {
    return <Spin spinning fullscreen></Spin>;
  }

  if (!pb.authStore.isValid) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthContext.Provider value={user}>
      <Outlet />
    </AuthContext.Provider>
  );
};
