import { Button, Flex, Form, Input, Layout } from "antd";
import LayoutWrap from "../components/LayoutWrap";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

export default function LogIn() {
  const { register, registerData } = useAuth();
  const loading = registerData.isPending;
  const [form] = Form.useForm();
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
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={register}
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
              // validateDebounce={1000}
              name={"password"}
              label="пароль"
              validateTrigger={["onBlur"]}
              rules={[
                {
                  required: true,
                  message: "Поле не должно быть пустым",
                },
                {
                  validator: async (_, value) => {
                    if (value.length < 8) {
                      return Promise.reject(
                        new Error("Пароль не меньше 8 символов"),
                      );
                    }
                  },
                },
              ]}
            >
              <Input.Password></Input.Password>
            </FormItem>
            <FormItem
              dependencies={["password"]}
              name={"passwordConfirm"}
              hasFeedback
              validateDebounce={500}
              rules={[
                { required: true },
                {
                  validator: async (_, value) => {
                    if (value === form.getFieldValue("password")) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                },
              ]}
            >
              <Input.Password placeholder="повторите пароль"></Input.Password>
            </FormItem>
            <FormItem label={null}>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Войти
              </Button>
            </FormItem>
          </Form>
          <Link to={"/login"}>
            есть аккаунт - вход <UserOutlined></UserOutlined>{" "}
          </Link>
        </Flex>
      </Layout.Content>
    </LayoutWrap>
  );
}
