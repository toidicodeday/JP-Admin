import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.scss";

type Props = {
  detailCourse: Models.Document | undefined;
};

const InfoTab = ({ detailCourse }: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("detailCourse in tab info", detailCourse);
    if (detailCourse) {
      form.setFieldsValue({
        name: detailCourse.name,
        desc: detailCourse.desc,
        cost: detailCourse.cost,
        interested: detailCourse.interested,
        img: detailCourse.img
      });
    }
  }, [detailCourse, form]);

  const handleMoveListCourse = () => {
    navigate("/courses");
  };

  return (
    <div className="course-info bg-white px-10 pt-12 pb-7">
      <Form layout="vertical" form={form}>
        <Form.Item name="name" label="Course name" required={true}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="Course Description" required={true}>
          <TextArea rows={4} />
        </Form.Item>
        <div className="flex gap-6">
          <Form.Item
            name="cost"
            className="flex-1"
            label="Cost"
            required={true}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="interested"
            className="flex-1"
            label="Interested"
            required={true}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="img" label="Banner" required={true}>
          <Input />
        </Form.Item>
        <div
          className="w-[412px] h-[226px] flex items-center justify-center bg-[#EFEFEF] font-bold text-2xl text-[#555]"
          style={{ marginTop: 8 }}
        >
          No Image Preview
        </div>
        <div className="flex gap-7 justify-center mt-8">
          <Button onClick={handleMoveListCourse}>Cancle</Button>
          <Button onClick={handleMoveListCourse} type="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InfoTab;
