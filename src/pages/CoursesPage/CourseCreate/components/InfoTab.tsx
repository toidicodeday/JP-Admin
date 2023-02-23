import api from "@/services";
import { Button, Form, Input, InputNumber, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { RiEditBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../style.scss";

type Props = {
  detailCourse: Models.Document | undefined;
};

const InfoTab = ({ detailCourse }: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [img, setImg] = useState('https://via.placeholder.com/412x224');
  const [imgID, setImgID] = useState('')
  const [courseType, setCourseType] = useState<'create' | 'edit'>('create')

  useEffect(() => {
    if (detailCourse) {
      setCourseType('edit')
      form.setFieldsValue({
        name: detailCourse?.name,
        desc: detailCourse?.desc,
        cost: detailCourse?.cost,
        interested: detailCourse?.interested,
      });
      setImg(detailCourse.img)
    } else {
      setCourseType('create')
    }
  }, [detailCourse, form]);

  const handleMoveListCourse = () => {
    navigate("/courses");
  };

  const onSubmitFinish = async (values: any) => {
    if (detailCourse?.$id) {
      const newCourse = await api.course.upDateOneCourse(detailCourse.$id, { ...values, documentID: '', img })
      if (newCourse) {
        message.info("Update course successful")
        handleMoveListCourse();
      }
    } else {
      const newCourse = await api.course.createOneCourse({
        ...values,
        documentID: '',
        cost: values.cost.toString(),
        img
      });
      if (newCourse) {
        message.info("Create course successful");
        handleMoveListCourse();
      }
    }
  };

  const onSubmitFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  useEffect(() => {
    if (imgID) {
      const courseImg = api.file.previewImage(imgID);

      setImg(courseImg.href)

    }
  }, [imgID]);

  const onUpdateCourseImg = async (file: File) => {
    const imgID = await api.file.uploadImage(file)
    if (imgID) {
      setImgID(imgID.$id)
      message.info("Update Course image successful")
    }
  };

  return (
    <div className="course-info bg-white px-10 pt-12 pb-7">
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmitFinish}
        onFinishFailed={onSubmitFinishFailed}
      >
        <Form.Item
          name="name"
          label="Course name"
          rules={[{ required: true, message: "Please enter this field!" }]}
        >
          <Input placeholder="Enter course name..." />
        </Form.Item>
        <Form.Item
          name="desc"
          label="Course Description"
          rules={[{ required: true, message: "Please enter this field!" }]}
        >
          <TextArea placeholder="Enter description...." rows={4} />
        </Form.Item>
        <div className="flex gap-6">
          <Form.Item
            name="cost"
            className="flex-1"
            label="Cost"
            initialValue={0}
            rules={[{ required: true, message: "Please enter this field!" }]}
          >
            <InputNumber
              className="w-full"
              step={0.01}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
          <Form.Item
            name="interested"
            className="flex-1"
            label="Interested"
            initialValue={0}
            rules={[{ required: true, message: "Please enter this field!" }]}
          >
            <InputNumber defaultValue={0} className="w-full" />
          </Form.Item>
        </div>
        <label className="w-[412px] h-56 block group bg-[#EFEFEF] mt-2 relative cursor-pointer">
          <input
            type="file"
            value=""
            accept="image/*"
            hidden
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                onUpdateCourseImg(e.target.files[0]);
              }
            }}
          />
          <img
            src={img}
            className="w-full h-full object-cover"
            alt="course-img"
          />
          <div className="group-hover:opacity-100 opacity-0 bg-slate-500/40 w-full h-full absolute top-0 left-0  flex justify-center items-center">
            <RiEditBoxFill className="text-white text-3xl" />
          </div>
        </label>
        <div className="flex gap-7 justify-center mt-8">
          <Button onClick={handleMoveListCourse}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
          >
            {courseType === 'create' ? 'Add' : 'Save'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InfoTab;
