import { Button, Form, Input } from 'antd';
import React from 'react';

const AccountInfoTabs = () => {

  const handleSave = () => {
    alert('Lưu thành công!')
  }
  return (
    <div>
      <Form layout='vertical'>
        <Form.Item label="Full Name" required>
          <Input placeholder='Enter your name...' />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input placeholder='Enter your email...' />
        </Form.Item>
        <Form.Item label="Phone">
          <Input placeholder='Enter your phone number...' />
        </Form.Item>
        <div className="flex justify-center">
          <Button onClick={handleSave} className='w-[378px]' type='primary'>Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default AccountInfoTabs;
