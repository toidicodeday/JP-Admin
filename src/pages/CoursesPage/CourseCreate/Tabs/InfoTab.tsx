import api from "@/services";
import { Button, Form, Input, InputNumber, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import "../style.scss";


type Props = {
  detailCourse: Models.Document | undefined;
};

const InfoTab = ({ detailCourse }: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [img, setImg] = useState(detailCourse?.img)

  useEffect(() => {
    console.log("detailCourse in tab info", detailCourse);
    if (detailCourse) {
      form.setFieldsValue({
        name: detailCourse?.name,
        desc: detailCourse?.desc,
        cost: detailCourse?.cost,
        interested: detailCourse?.interested,
        img: detailCourse.img
      });
    }
  }, [detailCourse, form]);

  const handleMoveListCourse = () => {
    navigate("/courses");
  };

  const onSubmitFinish = async (values: any) => {
    console.log(values)
    const newCourse = await api.course.createOneCourse(values)
    if (newCourse) {
      message.info("Thêm thành công")
      handleMoveListCourse()
    } else {
      message.error("Thêm thất bại")
    }
  };

  const onSubmitFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeImg = _.debounce((value) => {
    setImg(value);
  }, 3000);

  return (
    <div className="course-info bg-white px-10 pt-12 pb-7">
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmitFinish}
        onFinishFailed={onSubmitFinishFailed}
      >
        <Form.Item name="name" label="Course name" rules={[{ required: true, message: 'Please enter this field!' }]}>
          <Input placeholder="Enter course name..." />
        </Form.Item>
        <Form.Item name="desc" label="Course Description" rules={[{ required: true, message: 'Please enter this field!' }]}>
          <TextArea
            placeholder="Enter description...."
            rows={4} />
        </Form.Item>
        <div className="flex gap-6">
          <Form.Item
            name="cost"
            className="flex-1"
            label="Cost"
            rules={[{ required: true, message: 'Please enter this field!' }]}
          >
            <InputNumber
              className="w-full"
              defaultValue={0}
              step={0.01}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>
          <Form.Item
            name="interested"
            className="flex-1"
            label="Interested"
            rules={[{ required: true, message: 'Please enter this field!' }]}
          >
            <InputNumber defaultValue={0} className="w-full" />
          </Form.Item>
        </div>
        <Form.Item name="img" label="Banner" rules={[{ required: true, message: 'Please enter this field!' }]}>
          <Input
            placeholder="URL"
            onChange={e => handleChangeImg(e.target.value)}
          />
        </Form.Item>
        <div
          className="w-[412px] h-[226px] flex items-center justify-center bg-[#EFEFEF] font-bold text-2xl text-[#555]"
          style={{ marginTop: 8 }}
        >
          <img
            src={img || detailCourse?.img}
            className="object-contain w-full h-full"
            alt="course-img" />
        </div>
        <div className="flex gap-7 justify-center mt-8">
          <Button onClick={handleMoveListCourse}>Cancle</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InfoTab;
