import { Button, Form, Input } from 'antd';
import React from 'react';

const ChangePasswordTabs = () =>{
    const handleSave = () =>{
        alert('Lưu thành công!')
     }
  return (
    <div>
       <Form layout='vertical'>
      <Form.Item label="Old password *">
          <Input />
        </Form.Item>
        <Form.Item label="New password *">
          <Input />
        </Form.Item>
        <Form.Item label="Retype new password">
          <Input />
        </Form.Item>
      <div className="flex justify-center">
      <Button onClick={handleSave} className='w-[378px]' type='primary'>Save</Button>
      </div>
      </Form>
    </div>
  );
}

export default ChangePasswordTabs;
