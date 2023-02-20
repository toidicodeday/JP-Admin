import React, { useEffect, useState } from "react";
import api from "@/services";
import { useTypedSelector } from "@/store";
import { selectUserMe } from "@/store/authSlice/selector";
import { Button, Form, Input, message } from "antd";
import { saveUserMe } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const AccountInfoTabs = () => {
  const accountInfo = useTypedSelector(selectUserMe);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (accountInfo) {
      form.setFieldsValue({
        name: accountInfo?.name,
        email: accountInfo?.email,
        phone: accountInfo?.phone,
      });
    }
  }, [accountInfo, form]);

  const onFinish = async (values: { name: string }) => {
    const loadingId = "loadingId";
    message.loading({
      content: "Changing password",
      key: loadingId,
      duration: 0,
    });
    setLoading(true);
    const response = await api.auth.updateUserMeName({ name: values.name });
    message.destroy(loadingId);
    setLoading(false);
    if (response) {
      message.success("Update successful!");
      dispatch(saveUserMe(response));
    }
  };
  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Full Name" required>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input disabled />
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

export default AccountInfoTabs;
