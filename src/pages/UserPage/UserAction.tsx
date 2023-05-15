import api from "@/services";
import { Button, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Models } from "appwrite";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./style.scss";

const UserAction = () => {
  const [userName, setUserName] = useState<any[]>([]);
  const [userID, setUserID] = useState("");
  const [courseData, setCourseData] = useState<Models.Document[]>([]);
  const [lessonData, setLessonData] = useState<Models.Document[]>([]);
  const [activeCourseID, setActiveCourseID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleBack() {
    navigate("/users");
  }
  useEffect(() => {
    const id = location.pathname.replace("/users/", "");
    setUserID(id);
  }, [location.pathname]);

  const getUserData = useCallback(async () => {
    const res = await api.user.getUserList();
    setIsLoading(true);
    if (res && userID) {
      const userName = new Set(
        res.documents
          .filter((item) => item.userID === userID)
          .map((item) => item.name)
      );
      console.log(...userName);
      setUserName([...userName]);
      // Lay danh sach khoa hoc Id
      const listCourseID = [
        ...new Set(
          res.documents
            .filter((item) => item.userID === userID)
            ?.map((item) => item?.courseID)
        ),
      ];
      // Call API lay thong tin courses
      const getCourse = Promise.all(
        listCourseID?.map((id) => api.course.getOneCourse(id))
      );
      // Set course Table
      getCourse
        .then((item: any) => setCourseData(item))
        .catch((err) => console.log(err));

      const listLessonID = [
        ...res.documents
          .filter((item) => item.courseID === activeCourseID)
          ?.map((item) => item?.lessonID),
      ];
      const getLesonID = Promise.all(
        listLessonID?.map((id) => api.lesson.getOneLesson(id))
      );
      getLesonID
        .then((item: any) => setLessonData(item))
        .catch((err) => console.log(err));

      setIsLoading(false);
    }
  }, [activeCourseID, userID]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const courseColumn: ColumnsType<Models.Document> = [
    {
      title: "Course studied",
      dataIndex: "courseID",
      render: (text, record) => <div className="">{record?.name}</div>,
    },
  ];

  const lessonColumn: ColumnsType<Models.Document> = [
    {
      title: "Lesson studied",
      dataIndex: "lessonID",
      render: (text, record) => <div className="">{record?.name}</div>,
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <div className="flex justify-end">
          <Button onClick={() => {}} type="text"></Button>
          <Button
            type="text"
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-8 pb-10">
      <div className="py-5 flex justify-end items-center">
        <Button
          icon={<FiArrowLeft />}
          onClick={handleBack}
          className="float-right flex items-center gap-1"
          type="primary"
        >
          Back
        </Button>
      </div>
      <div className="bg-white pb-52">
        <Row>
          <Col span="6">
            <div className="px-5 border-r-2">
              <Table
                pagination={false}
                loading={isLoading}
                className="cursor-pointer"
                rowKey="$id"
                columns={courseColumn}
                dataSource={courseData}
                rowClassName={(record) => {
                  if (activeCourseID === record.$id) {
                    return "bg-[#bdc3c7] hover:bg-[#bdc3c7] row-active cursor-pointer";
                  } else {
                    return "";
                  }
                }}
                onRow={(record, rowIndex) => ({
                  onClick: (event) => {
                    setActiveCourseID(record.$id);
                  },
                })}
              />
            </div>
          </Col>
          <Col span="18">
            <Table columns={lessonColumn} dataSource={lessonData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserAction;
