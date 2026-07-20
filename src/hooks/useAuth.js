import React from "react";
import { pb } from "../utils/PB";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useNavigate } from "react-router";

export function useAuth() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  // Функция Входа
  const { mutate: logIn, ...logInData } = useMutation({
    mutationFn: ({ email, password }) =>
      pb.collection("users").authWithPassword(email, password),

    onSuccess: () => {
      message.success("Успешный вход");
      navigate("/");
    },

    onError: (error) => {
      message.error(error.message);
    },
  });
  // функция регистрации
  const { mutate: register, ...registerData } = useMutation({
    mutationFn: async ({ email, password, passwordConfirm }) => {
      const body = {
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: passwordConfirm,
      };
      await pb.collection("users").create(body);

      return pb.collection("users").authWithPassword(email, password);
    },
    onSuccess: () => {
      message.success("Успешная регистрация");
      navigate("/");
    },

    onError: (error) => {
      message.error(error.message);
    },
  });
  const logOut = () => {
    pb.authStore.clear();
  };
  return { logIn, logInData, register, registerData, logOut };
}
