import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const ChangePasswordTabs = () => {
  const handleSave = () => {
    alert('Lưu thành công!')
  }
  return (
    <div>
      <Form layout='vertical'>
        <Form.Item label="Old password" required>
          <Input.Password
            placeholder="Enter your old password..."
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item label="New password" required>
          <Input.Password
            placeholder="Enter your new password..."
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item label="Retype your new password">
          <Input.Password
            placeholder="Enter your new password..."
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <div className="flex justify-center">
          <Button onClick={handleSave} className='w-[378px]' type='primary'>Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default ChangePasswordTabs;
