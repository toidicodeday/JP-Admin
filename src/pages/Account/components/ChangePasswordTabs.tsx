import api from "@/services";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";

const ChangePasswordTabs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    password: string;
    oldPassword: string;
  }) => {
    const loadingId = "loadingId"
    message.loading({
      content: 'Changing password',
      key: loadingId,
      duration: 0,

    })
    setLoading(true);
    const response = await api.auth.updateUserMePassword(values);
    setLoading(false);
    message.destroy(loadingId)
    if (response) {
      console.log("response update password", response);
      message.success("Update password successful");
      form.resetFields();
    }
  };
  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="oldPassword"
          label="Old password"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input.Password
            placeholder="Enter your old password..."
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="New password"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input.Password
            placeholder="Enter your new password..."
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="rePassword"
          label="Retype your new password"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            ({ getFieldValue }) => ({
              validator(_, rePassword) {
                const password = getFieldValue("password");
                if (!rePassword || password === rePassword) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter your new password..."
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <div className="flex justify-center">
          <Button
            htmlType="submit"
            className="w-96"
            type="primary"
            loading={loading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordTabs;
