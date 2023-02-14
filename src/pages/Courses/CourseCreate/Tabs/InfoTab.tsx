
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.scss'

const InfoTab = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleMoveListCourse = () => {
    navigate('/courses')
  }
  const handleFormChange = (changedValues: any, allValues: any) => {
    console.log('Form values changed:', allValues);
    setFormData(allValues);
  }
  return (
    <div className='course-info bg-white px-10 pt-12 pb-7'>
      <Form layout='vertical' onValuesChange={handleFormChange}>
        <Form.Item label="Course name" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Course Description" required={true}>
          <TextArea rows={4} />
        </Form.Item>
        <div className="flex gap-6">
          <Form.Item className='flex-1' label="Cost" required={true}>
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' label="Interested" required={true}>
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Banner" required={true}>
          <Input />
        </Form.Item>
        <div className='w-[412px] h-[226px] flex items-center justify-center bg-[#EFEFEF] font-bold text-2xl text-[#555]' style={{ marginTop: 8 }}>No Image Preview</div>
        <div className="flex gap-7 justify-center mt-8">
          <Button onClick={handleMoveListCourse}>Cancle</Button>
          <Button onClick={handleMoveListCourse} type='primary'>Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default InfoTab;
