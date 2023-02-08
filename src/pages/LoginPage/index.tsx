import { useTypedDispatch } from "@/store";
import { saveAuthToken } from "@/store/authSlice";
import { REQUIRE_MESS } from "@/utils/constants/message.constant";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const handleLogin = async (values: any) => {
    dispatch(saveAuthToken({
      accessToken: 'fsdfsdf',
      refreshToken: 'nenenene'
    }))
    navigate('/')
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Login Page</h1>
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
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
