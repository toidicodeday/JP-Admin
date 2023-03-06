import api from "@/services";
import { message, Spin, Tabs, TabsProps } from "antd";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoTab from "./components/InfoTab";
import LessonTab from "./components/LessonSection";

const CourseCreate = () => {
  const location = useLocation();
  const [detailCourse, setDetailCourse] = useState<Models.Document>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisableLessonTab, setIsDisableLessonTab] = useState(false);
  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    const getDetailCourse = async () => {
      const documentId = location.pathname.replace("/courses/", "");
      if (documentId && documentId !== "courses-create") {
        setIsLoading(true);
        const response = await api.course.getOneCourse(documentId);
        if (response) {
          setDetailCourse(response);
        }
        setIsLoading(false);
      } else if (documentId === "courses-create") {
        setIsDisableLessonTab(true);
      }
    };
    getDetailCourse();
  }, [location.pathname]);

  const items: TabsProps["items"] = [
    {
      key: "info",
      label: `General Infomation`,
      children: <InfoTab detailCourse={detailCourse} />,
    },
    {
      key: "lesson",
      label: `Lessons`,
      children: <LessonTab detailCourse={detailCourse} />,
      disabled: isDisableLessonTab,
    },
  ];
  return (
    <div className="pt-6 px-8 pb-10">
      <Spin spinning={isLoading}>
        <Tabs defaultActiveKey="info" items={items} onChange={onChange} />
      </Spin>
    </div>
  );
};

export default CourseCreate;
