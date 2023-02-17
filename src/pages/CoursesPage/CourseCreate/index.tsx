import api from "@/services";
import { message, Tabs, TabsProps } from "antd";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoTab from "./Tabs/InfoTab";
import LessonTab from "./Tabs/LessonTab";

const CourseCreate = () => {
  const location = useLocation();
  const [detailCourse, setDetailCourse] = useState<Models.Document>();
  const [isloading, setIsLoading] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    const getDetailCourse = async () => {
      const documentId = location.pathname.replace("/courses/", "");
      if (documentId !== "courses-create") {
        setIsLoading(true)
        message.loading("Đang chờ dữ liệu")
        if (documentId) {
          const response = await api.course.getOneCourse(documentId);
          if (response) {
            setDetailCourse(response);
          } else {
            setIsLoading(false)
            message.error("Hiện không có phản hồi")
          }
        }
      } else {
        setIsDisable(true)
      }
    };
    getDetailCourse();
  }, [location.pathname]);


  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `General Infomation`,
      children: <InfoTab detailCourse={detailCourse} />,
    },
    {
      key: "2",
      label: `Lessons`,
      children: <LessonTab detailCourse={detailCourse} />,
      disabled: isDisable
    },
  ];
  return (
    <div className="pt-6 px-8 pb-10">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default CourseCreate;
