import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import '../CourseCreate.scss'

function Info() {
  return (
    <div className='course-info'>
      <Form layout='vertical'>
      <Form.Item label="Course name * ">
          <Input />
        </Form.Item>
        <Form.Item label="Course Description *">
          <TextArea rows={4} />
        </Form.Item>
        <div className="flex gap-6">
        <Form.Item className='flex-1' label="Cost * ">
          <Input />
        </Form.Item>
        <Form.Item className='flex-1' label="Interested * ">
          <Input />
        </Form.Item>
        </div>
        <Form.Item label="Banner *">
          <Input />
        </Form.Item>
        <Form.Item className='w-200px'  label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <div className='font-bold text-2xl text-[#555]' style={{ marginTop: 8 }}>No Image Preview</div>
            </div>
          </Upload>
        </Form.Item>
        <div className="flex gap-7 justify-center">
          <Button>Cancle</Button>
          <Button type='primary'>Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default Info;
