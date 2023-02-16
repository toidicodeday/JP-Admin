import api from "@/services";
import { Tabs, TabsProps } from "antd";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoTab from "./Tabs/InfoTab";
import LessonTab from "./Tabs/LessonTab";

const CourseCreate = () => {
  const location = useLocation();
  const [detailCourse, setDetailCourse] = useState<Models.Document>();
  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    const getDetailCourse = async () => {
      const documentId = location.pathname.replace("/courses/", "");

      if (documentId !== "courses-create") {
        if (documentId) {
          const response = await api.course.getOneCourse(documentId);
          setDetailCourse(response);
        }
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
      children: <LessonTab />,
    },
  ];
  return (
    <div className="pt-6 px-8 pb-10">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default CourseCreate;
