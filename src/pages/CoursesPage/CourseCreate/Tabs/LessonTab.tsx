import api from '@/services';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Models } from 'appwrite';
import React, { useEffect, useState } from 'react';
import editImg from '../../../../assets/images/btn-edit.svg'
import removeImg from '../../../../assets/images/btn-remove.svg'
import '../style.scss'


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


const LessonTab = () => {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [lessonData, setLessonData] = useState<Models.Document[]>([])
  const [lessonTotal, setLessonTotal] = useState<number>(0)
  const [questionData, setQuestionData] = useState<Models.Document[]>([])
  const [questionTotal, setQuestionTotal] = useState<number>(0)


  useEffect(() => {
    const getLessonList = async () => {
      const response = await api.lesson.getLessonList()
      if (response) {
        console.log(response)
        setLessonData(response.documents)
        setLessonTotal(response.total)
      }
    }
    getLessonList()
  }, [])

  useEffect(() => {
    const getQuestionList = async () => {
      const response = await api.question.getQuestionList()
      if (response) {
        console.log(response)
        setQuestionData(response.documents)
        setQuestionTotal(response.total)
      }
    }
    getQuestionList()
  }, [])

  const showCreateLessonModal = () => {
    setIsLessonModalOpen(true);
  };

  const handleLessonOK = () => {
    setIsLessonModalOpen(false);
  };

  const handleLessonCancle = () => {
    setIsLessonModalOpen(false);
  };

  const showCreateQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleQuestionOK = () => {
    setIsQuestionModalOpen(false);
  };

  const handleQuestionCancle = () => {
    setIsQuestionModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const columnsLesson: ColumnsType<Models.Document> = [

    {
      title: 'Lessons',
      dataIndex: 'name',
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <div className='flex justify-end'>
          <Button
            onClick={showCreateLessonModal}
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
      render: () => (
        <div className='flex justify-end'>
          <Button
            onClick={showCreateQuestionModal}
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
            <Table columns={columnsLesson} dataSource={lessonData} />
            <Button onClick={showCreateLessonModal} className='w-full mt-3' type='primary'>Add new lesson</Button>
          </div>
        </Col>
        <Col span={18}>
          <Table columns={columnsQuestion} dataSource={questionData} />
        </Col>
      </Row>
      <Modal okText="Save" className='w-[684px]' open={isLessonModalOpen} onOk={handleLessonOK} onCancel={handleLessonCancle}>
        <p className='h-14 flex items-center font-bold text-base px-4'>Create Lesson</p>
        <Form layout="vertical" className='pt-5 px-8'>
          <Form.Item label="Name *">
            <Input placeholder='Losum ip ....' />
          </Form.Item>
        </Form>
      </Modal>
      <Modal okText="Save" className='w-[684px]' open={isQuestionModalOpen} onOk={handleQuestionOK} onCancel={handleQuestionCancle}>
        <p className='h-14 flex items-center font-bold text-base px-4'>Create Question</p>
        <Form layout="vertical" className='pt-5 px-8'>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Type *">
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
                    return Promise.reject(new Error('At least 2 passengers'));
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
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="passenger name" style={{ width: '60%' }} />
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
