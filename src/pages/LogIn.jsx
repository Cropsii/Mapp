import React from "react";
import LayoutWrap from "../components/layout/LayoutWrap";
import { Button, Flex, Form, Input, Layout } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { UserAddOutlined } from "@ant-design/icons";

export default function LogIn() {
  const { logIn, logInData } = useAuth();
  const loading = logInData.isPending;
  return (
    <LayoutWrap>
      <Layout.Content>
        <Flex
          style={{ height: "100dvh" }}
          align="center"
          justify="center"
          vertical
        >
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={(values) => logIn(values)}
          >
            <FormItem
              name={"email"}
              label="почта"
              rules={[
                {
                  required: true,
                  message: "Поле не должно быть пустым",
                },
                { type: "email", message: "Некорректный email" },
              ]}
            >
              <Input placeholder="email@example.com"></Input>
            </FormItem>
            <FormItem
              name={"password"}
              label="пароль"
              rules={[
                { required: true, message: "Поле не должно быть пустым" },
              ]}
            >
              <Input.Password></Input.Password>
            </FormItem>
            <FormItem label={null}>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Войти
              </Button>
            </FormItem>
          </Form>
          <Link to={"/register"}>
            Нет аккаунта - создай его <UserAddOutlined></UserAddOutlined>{" "}
          </Link>
        </Flex>
      </Layout.Content>
    </LayoutWrap>
  );
}
