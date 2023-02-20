import api from "@/services";
import { useTypedDispatch } from "@/store";
import { saveLoggedInInfo } from "@/store/authSlice";
import { REQUIRE_MESS } from "@/utils/constants/message.constant";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const handleLogin = async (values: any) => {
    const loginRes = await api.auth.login({
      email: values.email,
      password: values.password,
    });

    if (loginRes) {
      await dispatch(
        saveLoggedInInfo({
          userId: loginRes.userId,
          sessionId: loginRes.$id,
        })
      );
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <p className="mb-5 text-4xl font-bold text-center">Login to JP Admin</p>
        <Form
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
            rules={[{ required: true }]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
