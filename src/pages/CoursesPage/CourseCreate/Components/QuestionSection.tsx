import api from '@/services';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Modal, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Models } from 'appwrite';
import React, { useCallback, useEffect, useState } from 'react';
import editImg from '../../../../assets/images/btn-edit.svg'
import removeImg from '../../../../assets/images/btn-remove.svg'

type Props = {
  activeLessonID: string
}

const QuestionSection = ({ activeLessonID }: Props) => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionTotal, setQuestionTotal] = useState<number>(0)
  const [questionData, setQuestionData] = useState<Models.Document[]>([])
  const [questionLoading, setQuestionLoading] = useState(false)
  const [formQuestion] = Form.useForm()
  const getQuestionList = useCallback(
    async (lessonID: string) => {
      setQuestionLoading(true)
      const response = await api.question.getQuestionList(lessonID)
      console.log(response)
      if (response) {
        console.log(response)
        setQuestionData(response.documents)
        setQuestionTotal(response.total)
      }
      setQuestionLoading(false)
    },
    [],
  );
  useEffect(() => {


    getQuestionList(activeLessonID)
  }, [activeLessonID])


  const showCreateQuestionModal = () => {
    setIsQuestionModalOpen(true);
    formQuestion.setFieldsValue({
      question: "",
      type: "",
      answers: []
    })
  };

  const showEditQuestionModal = async (questionID: string) => {
    setIsQuestionModalOpen(true);
    console.log('run show edit quét ', questionID)
    const questionDetail = await api.question.getOneQuestion(questionID)
    console.log('formQuestion', {
      question: questionDetail?.question,
      type: questionDetail?.type,
      answers: questionDetail?.answers?.map((item: any) => JSON.parse(item))
    })
    if (questionDetail) {
      // console.log(questionDetail)

      formQuestion.setFieldsValue({
        question: questionDetail?.question,
        type: questionDetail?.type,
        answers: questionDetail?.answers?.map((item: any) => JSON.parse(item))
      })
    };
  }

  const handleQuestionOK = () => {
    setIsQuestionModalOpen(false);
    formQuestion.submit()

  };

  const handleQuestionCancle = () => {
    setIsQuestionModalOpen(false);
  };

  const handleQuestionFinish = async (values: any) => {
    console.log(values)
    const newQuestion = await api.question.createOneQuestion({
      ...values, lessonID: activeLessonID,
      answers: values.answers.map((item: any) => (JSON.stringify(item)))
    })
    console.log(newQuestion)

    getQuestionList(activeLessonID)
    if (newQuestion) {
      message.info("Thêm thành công")
    } else {
      message.error("Thêm thất bại")
    }
  }

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
    <div>
      <Table columns={columnsQuestion} dataSource={questionData} loading={questionLoading} />
      <Modal okText="add" className='w-[684px]' open={isQuestionModalOpen} onOk={handleQuestionOK} onCancel={handleQuestionCancle}>
        <p className='h-14 flex items-center font-bold text-base px-4'>Create Question</p>
        <Form onFinish={handleQuestionFinish} form={formQuestion} layout="vertical" className='pt-5 px-8'>
          <Form.Item label="Question" name="question" rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}>
            <Select>
              <Select.Option value="readKanji">read Kanji</Select.Option>
              <Select.Option value="correctAnswer">correct Answer</Select.Option>
              <Select.Option value="arrangeWords">arrange Words</Select.Option>
            </Select>
          </Form.Item>

          <Form.List
            name="answers"
          // rules={[
          //   {
          //     validator: async (_, names) => {
          //       if (!names || names.length < 2) {
          //         return Promise.reject(new Error('At least 2 answers'));
          //       }
          //     },
          //   },
          // ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {console.log("fields", fields)}
                {fields.map((field, index) => (
                  <div className='my-4'>
                    <Form.Item noStyle name={[field.name, "type"]} valuePropName="checked">
                      <Checkbox className='mr-7' />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "answer"]}
                      // validateTrigger={['onChange', 'onBlur']}
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
                  </div>
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

export default QuestionSection;
