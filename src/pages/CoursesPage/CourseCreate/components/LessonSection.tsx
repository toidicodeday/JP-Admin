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
import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';




type Props = {
  detailCourse: Models.Document | undefined;
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

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
        setLessonData(
          response.documents
          // ?.map((item: LessonType) => ({ ...item, key: item?.$id }))
          // ?.sort((a: LessonType, b: LessonType) => a?.sort - b?.sort)
        );
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
        sort: (lessonTotal + 1) * 1000000
      });

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
      key: 'sort',
    },
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

  const RowLessonDrag = ({ children, ...props }: RowProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 0 } : {}),
    };

    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if ((child as React.ReactElement).key === 'sort') {
            return React.cloneElement(child as React.ReactElement, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{ touchAction: 'none', cursor: 'move' }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {

    if (active.id !== over?.id) {
      setLessonData((previous) => {
        const activeIndex = previous.findIndex((i) => i.$id === active.id);
        const overIndex = previous.findIndex((i) => i.$id === over?.id);

        let preData = null
        let nextData = null
        let newSort = 0

        const update = async (sort: number) => {
          const res = await api.lesson.updateOneLesson(lessonData[activeIndex].$id, { sort })

          console.log(res)
        }

        if (activeIndex > overIndex) {
          preData = lessonData?.[overIndex - 1]
          nextData = lessonData?.[overIndex]
          newSort = ((preData?.sort || 0) + nextData?.sort) / 2;
        }
        else if (activeIndex < overIndex) {
          preData = lessonData?.[overIndex]
          nextData = lessonData?.[overIndex + 1]
          newSort = (preData?.sort + (nextData?.sort || (lessonTotal + 1) * 1000000)) / 2;

        }
        update(newSort).then(() => getLessonList())

        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className="lessons bg-white pb-52">
      <Row>
        <Col span={6}>
          <div className="lesson-left px-5 border-r-2">
            <DndContext onDragEnd={onDragEnd}>
              <SortableContext
                items={lessonData.map((i) => i.$id)}
                strategy={verticalListSortingStrategy}
              >
                <Table

                  components={{
                    body: {
                      row: RowLessonDrag,
                    },
                  }}
                  rowKey="$id"
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
              </SortableContext>
            </DndContext>
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
