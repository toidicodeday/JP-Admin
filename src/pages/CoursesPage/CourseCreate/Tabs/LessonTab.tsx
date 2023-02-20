import api from '@/services';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Models } from 'appwrite';
import React, { useEffect, useState } from 'react';
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
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [lessonData, setLessonData] = useState<Models.Document[]>([])
  const [lessonTotal, setLessonTotal] = useState<number>(0)
  const [questionData, setQuestionData] = useState<Models.Document[]>([])
  const [questionTotal, setQuestionTotal] = useState<number>(0)
  const [formLesson] = Form.useForm()
  const [formQuestion] = Form.useForm()
  const [activeLessonID, setActiveLessonID] = useState('')
  const [lessonLoading, setLessonLoading] = useState(false)
  const [questionLoading, setQuestionLoading] = useState(false)


  useEffect(() => {
    const getLessonList = async () => {
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
    }
    getLessonList()
  }, [detailCourse])

  useEffect(() => {
    const getQuestionList = async () => {
      if (activeLessonID) {
        setQuestionLoading(true)
        const response = await api.question.getQuestionList(activeLessonID)
        if (response) {
          console.log(response)
          setQuestionData(response.documents)
          setQuestionTotal(response.total)
        }
        setQuestionLoading(false)
      }
    }
    getQuestionList()
  }, [activeLessonID])

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
    // setIsLessonModalOpen(false);
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

  const showCreateQuestionModal = () => {
    setIsQuestionModalOpen(true);
    formQuestion.setFieldsValue({
      question: "",
      type: "",
      answers: []
    })
  };

  const showEditQuestionModal = (questionID: string) => {
    setIsQuestionModalOpen(true);
    const getOneQuestion = async () => {
      const questionDetail = await api.question.getOneQuestion(questionID)
      if (questionDetail) {
        formQuestion.setFieldsValue({
          question: questionDetail?.question,
          type: questionDetail?.type,
          answers: questionDetail?.answers
        })
        console.log(questionDetail)
        console.log("questionDetail question", questionDetail?.question)
        console.log("questionDetail type", questionDetail?.type)
      }
    };
    getOneQuestion()
  }

  const handleQuestionOK = () => {
    setIsQuestionModalOpen(false);

  };

  const handleQuestionCancle = () => {
    setIsQuestionModalOpen(false);
  };

  const onLessonFinish = async (values: any) => {

    // console.log({ name: values?.lessonName })

    const newLesson = await api.lesson.createOneLesson({ ...values, courseID: detailCourse?.$id })
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
          <Button
            type='text'
            icon={<img src={removeImg} alt="" />}
          >
          </Button>
        </div>
      ),
    },
  ];
  const columnsQuestion: ColumnsType<Models.Document> = [

    {
      title: 'Questions',
      dataIndex: 'question',

    },
    {
      title: <Button onClick={showCreateQuestionModal} className='float-right' type='primary'>Add questions</Button>,
      key: 'action',
      render: (text, record) => (
        <div className='flex justify-end'>
          <Button
            onClick={() => showEditQuestionModal(record?.$id)}
            type='text'
            icon={<img src={editImg} alt="" />}
          >
          </Button>
          <Button
            type='text'
            icon={<img src={removeImg} alt="" />}
          >
          </Button>
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
          </div>
        </Col>
        <Col span={18}>
          <Table columns={columnsQuestion} dataSource={questionData} loading={questionLoading} />
        </Col>
      </Row>
      <Modal okButtonProps={{ htmlType: "submit" }} okText="Add" className='w-[684px]' open={isLessonModalOpen} onOk={handleLessonOK} onCancel={handleLessonCancle}>
        <p className='h-14 flex items-center font-bold text-base px-4'>Create Lesson</p>
        <Form onFinish={onLessonFinish} form={formLesson} layout="vertical" className='pt-5 px-8'>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}>
            <Input placeholder='Losum ip ....' />
          </Form.Item>
        </Form>
      </Modal>
      <Modal okText="Save" className='w-[684px]' open={isQuestionModalOpen} onOk={handleQuestionOK} onCancel={handleQuestionCancle}>
        <p className='h-14 flex items-center font-bold text-base px-4'>Create Question</p>
        <Form form={formQuestion} layout="vertical" className='pt-5 px-8'>
          <Form.Item label="Name" name="question" rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Select>
              <Select.Option value="Read Kanji">Read Kanji</Select.Option>
              <Select.Option value="Read Kanji">Read Kanji</Select.Option>
              <Select.Option value="Read Kanji">Read Kanji</Select.Option>
            </Select>
          </Form.Item>

          <Form.List
            name="names"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error('At least 2 answers'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...formItemLayout}
                    label={index === 0 ? 'Anwers' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item noStyle >
                      <Checkbox className='mr-7' />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name="answers"
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input the field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Enter your answers" style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <DeleteOutlined
                        className="dynamic-delete-button ml-5"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add answer
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

        </Form>
      </Modal>
    </div>
  );
}

export default LessonTab;
