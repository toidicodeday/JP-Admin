import api from "@/services";

import { Button, Col, Form, Input, message, Modal, Row, Table } from "antd";

import { Models } from "appwrite";
import React, { useCallback, useEffect, useState } from "react";
import QuestionSection from "./QuestionSection";
import editImg from "../../../../assets/images/btn-edit.svg";
import removeImg from "../../../../assets/images/btn-remove.svg";
import "../style.scss";
import { CourseType, LessonType } from "@/services/commonType";
import { ColumnsType } from "antd/es/table/interface";

type Props = {
  detailCourse: Models.Document | undefined;
};

const LessonTab = ({ detailCourse }: Props) => {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [lessonData, setLessonData] = useState<LessonType[]>([]);
  const [lessonTotal, setLessonTotal] = useState<number>(0);
  const [formLesson] = Form.useForm();
  const [activeLessonID, setActiveLessonID] = useState("");
  const [lessonLoading, setLessonLoading] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [modalButtonText, setModalButtonText] = useState('Add')
  const [lessonIdEdit, setLessonIdEdit] = useState('')


  const getLessonList = useCallback(async () => {
    if (detailCourse) {
      setLessonLoading(true);
      const response = await api.lesson.getLessonList(detailCourse?.$id);
      if (response) {
        setLessonData(response.documents);
        setLessonTotal(response.total);
      }
      setLessonLoading(false);
    }
  }, [detailCourse]);

  useEffect(() => {
    getLessonList();
  }, [getLessonList]);

  const showCreateLessonModal = () => {
    setIsLessonModalOpen(true);
    setModalType("create");
    setModalButtonText("Add")
    formLesson.setFieldsValue({
      name: "",
    });
  };
  const showEditLessonModal = (lessonID: any) => {
    setIsLessonModalOpen(true);
    setModalType("edit");
    setModalButtonText("Save")
    const getOneLesson = async () => {
      const lessonDetail = await api.lesson.getOneLesson(lessonID);
      if (lessonDetail) {
        formLesson.setFieldsValue({
          name: lessonDetail?.name,
        });
        console.log("lessonName", lessonDetail?.name);
      }
    };
    getOneLesson();
  };

  const handleLessonOK = async () => {
    formLesson.submit();
  };

  const handleLessonCancle = () => {
    setIsLessonModalOpen(false);
  };

  const onLessonFinish = async (values: any) => {
    if (modalType === 'create') {

      const newLesson = await api.lesson.createOneLesson({
        ...values,
        courseID: detailCourse?.$id,
      });
      console.log("newLesson", newLesson)
      if (newLesson) {
        message.info("Create lesson successful");
        getLessonList();
        setIsLessonModalOpen(false);
      }
    }

    if (modalType === 'edit') {

      const newLesson = await api.lesson.updateOneLesson(lessonIdEdit, values)
      if (newLesson) {
        message.info("Update lesson successful")
        getLessonList();
        setIsLessonModalOpen(false)
      }
    }
  };

  const handleDeleteLesson = async (record: LessonType) => {
    Modal.confirm({
      title: "Are you sure to delete this lesson?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        const response = await api.lesson.deleteOneLesson(record.$id);
        if (response) {
          message.success("Delete lesson successful !");
          getLessonList();
          if (activeLessonID === record.$id) {
            setActiveLessonID("");
          }
        }
      },
    });
  };


  const columnsLesson: ColumnsType<LessonType> = [
    {
      title: "Lessons",
      dataIndex: "name",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <div className="flex justify-end">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              showEditLessonModal(record?.$id);
              setLessonIdEdit(record.$id)
            }}
            type="text"
            icon={<img src={editImg} alt="" />}
          />
          <Button
            type="text"
            icon={<img src={removeImg} alt="" />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteLesson(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="lessons bg-white pb-52">
      <Row>
        <Col span={6}>
          <div className="lesson-left px-5 border-r-2">
            <Table
              columns={columnsLesson}
              dataSource={lessonData}
              loading={lessonLoading}
              rowClassName={(record) => {
                if (activeLessonID === record?.$id) {
                  return "bg-[#bdc3c7] hover:bg-[#bdc3c7] row-active cursor-pointer";
                } else {
                  return "";
                }
              }}
              onRow={(record, rowIndex) => ({
                onClick: (event) => {
                  setActiveLessonID(record.$id);
                }, // click row
              })}
            />
            <Button
              onClick={showCreateLessonModal}
              className="w-full mt-3"
              type="primary"
            >
              Add new lesson
            </Button>
            <Modal
              okButtonProps={{ htmlType: "submit" }}
              okText={modalButtonText}
              className="w-[684px]"
              open={isLessonModalOpen}
              onOk={handleLessonOK}
              onCancel={handleLessonCancle}
              title={modalType === 'create' ? "Create Lesson" : "Edit Lesson"}
            >
              <Form
                onFinish={onLessonFinish}
                form={formLesson}
                layout="vertical"
                className="pt-5"
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: "Field is required" }]}
                >
                  <Input placeholder="Lesson name" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Col>
        <Col span={18}>
          <QuestionSection lessonID={activeLessonID} />
        </Col>
      </Row>
    </div>
  );
};

export default LessonTab;
