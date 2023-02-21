import api from '@/services';

import { Button, Col, Form, Input, message, Modal, Popconfirm, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Models } from 'appwrite';
import React, { useCallback, useEffect, useState } from 'react';
import QuestionSection from './QuestionSection';
import editImg from '../../../../assets/images/btn-edit.svg'
import removeImg from '../../../../assets/images/btn-remove.svg'
import '../style.scss'

type Props = {
  detailCourse: Models.Document | undefined;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


const LessonTab = ({ detailCourse }: Props) => {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [lessonData, setLessonData] = useState<Models.Document[]>([])
  const [lessonTotal, setLessonTotal] = useState<number>(0)
  const [formLesson] = Form.useForm()
  const [activeLessonID, setActiveLessonID] = useState('')
  const [lessonLoading, setLessonLoading] = useState(false)


  const confirmDeleteLesson = async (lesson: Models.Document) => {
    // TODO [course list] delete coruse not done
    const response = await api.lesson.deleteOneLesson(activeLessonID)
    if (response) {
      console.log("delete response", response)
      getLessonList()
    }
    console.log("confirmDelete", lesson);
    message.success("Bạn đã xóa 1 bản ghi");
  };

  const getLessonList = useCallback(
    async () => {
      if (detailCourse) {
        setLessonLoading(true)
        const response = await api.lesson.getLessonList(detailCourse?.$id)
        console.log("lesson list", response)
        if (response) {
          console.log(response)
          setLessonData(response.documents)
          setLessonTotal(response.total)
        }
        setLessonLoading(false)
      }
    },
    [detailCourse]
  );


  useEffect(() => {

    getLessonList()
  }, [detailCourse])

  //  useEffect(()=>{
  //    const getOneLesson = async () =>{
  //     const responese = await api.lesson.getOneLesson()
  //    }
  //  }, [])

  const showCreateLessonModal = () => {
    setIsLessonModalOpen(true);
    formLesson.setFieldsValue({
      name: ""
    })
  };
  const showEditLessonModal = (lessonID: any) => {
    setIsLessonModalOpen(true);
    const getOneLesson = async () => {
      const lessonDetail = await api.lesson.getOneLesson(lessonID)
      if (lessonDetail) {
        formLesson.setFieldsValue({
          name: lessonDetail?.name
        })
        console.log("lessonName", lessonDetail?.name)
      }
    }
    getOneLesson()
  };

  const handleLessonOK = async () => {
    setIsLessonModalOpen(false);
    formLesson.submit()
    // const newLesson = await api.lesson.createOneLesson(values)
    // console.log('new lesson', newLesson)
    // if (newLesson) {
    //   message.info("Thêm thành công")
    // } else {
    //   message.error("Thêm thất bại")
    // }
  };

  const handleLessonCancle = () => {
    setIsLessonModalOpen(false);
  };


  const onLessonFinish = async (values: any) => {

    // console.log({ name: values?.lessonName })

    const newLesson = await api.lesson.createOneLesson({ ...values, courseID: detailCourse?.$id })
    getLessonList()
    console.log('new lesson', newLesson)
    if (newLesson) {
      message.info("Thêm thành công")
    } else {
      message.error("Thêm thất bại")
    }
  };

  const columnsLesson: ColumnsType<Models.Document> = [

    {
      title: 'Lessons',
      dataIndex: 'name',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <div className='flex justify-end'>
          <Button
            onClick={() => showEditLessonModal(record?.$id)}
            type="text"
            icon={<img src={editImg} alt="" />}>
          </Button>
          <Popconfirm
            title="Xóa bài học này?"
            description="Bạn có muốn xóa bài học này không?"
            onConfirm={() => confirmDeleteLesson(record)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" icon={<img src={removeImg} alt="" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];


  return (
    <div className='lessons bg-white pb-52'>
      <Row>
        <Col span={6}>
          <div className='lesson-left px-5 border-r-2'>
            <Table columns={columnsLesson} dataSource={lessonData} loading={lessonLoading}
              rowClassName={(record) => {
                if (activeLessonID === record?.$id) {
                  return "bg-red-500 hover:bg-red-500 row-active cursor-pointer"
                } else {
                  return ''
                }
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setActiveLessonID(record.$id)
                  }, // click row
                };

              }} />
            <Button onClick={showCreateLessonModal} className='w-full mt-3' type='primary'>Add new lesson</Button>
            <Modal okButtonProps={{ htmlType: "submit" }} okText="Add" className='w-[684px]' open={isLessonModalOpen} onOk={handleLessonOK} onCancel={handleLessonCancle}>
              <p className='h-14 flex items-center font-bold text-base px-4'>Create Lesson</p>
              <Form onFinish={onLessonFinish} form={formLesson} layout="vertical" className='pt-5 px-8'>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}>
                  <Input placeholder='Losum ip ....' />
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
}

export default LessonTab;
