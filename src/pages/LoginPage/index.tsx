import api from "@/services";
import { useTypedDispatch } from "@/store";
import { saveLoggedInInfo } from "@/store/authSlice";
import { REQUIRE_MESS } from "@/utils/constants/message.constant";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Props = {};

const LoginPage = (props: Props) => {
  const [form] = Form.useForm()
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: any) => {
    setLoading(true)

    const loginRes = await api.auth.login({
      email: values.email,
      password: values.password,
    });

    // const checkTeamUser = false
    if (loginRes) {
      await dispatch(
        saveLoggedInInfo({
          userId: loginRes.userId,
          sessionId: loginRes.$id,
        })
      );
      navigate("/");

    }
    // else {
    //   form.resetFields()
    // }
    setLoading(false)
  };

  const handlForgotPassword = () => {
    navigate("/forgot-password")
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <p className="mb-5 text-4xl font-bold text-center">Login to JP Admin</p>
        <Form
          form={form}
          validateMessages={{ required: REQUIRE_MESS }}
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item name="email" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }, { min: 8 }]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Button
            className="float-right"
            type="link"
            onClick={handlForgotPassword}
          >
            Forgot password?
          </Button>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
