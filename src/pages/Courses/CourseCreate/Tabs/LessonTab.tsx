import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import editImg from '../../../../assets/images/btn-edit.svg'
import removeImg from '../../../../assets/images/btn-remove.svg'
import '../CourseCreate.scss'



interface DataType {
  key: string;
  lessonName: string;
}

interface DataType2{
  key: string;
  question: string;
}
const data: DataType[] = [
  {
    key: '1',
    lessonName: 'Lesson 01'
  },
  {
    key: '2',
    lessonName: 'Lesson 02'
  },
  {
    key: '3',
    lessonName: 'Lesson 03'
  },
  {
    key: '4',
    lessonName: 'Lesson 04'
  },
  ]

  const data2: DataType2[] = [
    {
      key: '1',
      question: 'What is the weather today?'
    },
    {
      key: '2',
      question: 'What do you like the most?'
    },
    {
      key: '3',
      question: 'Arrange those words?'
    },
    ]

  
function Lesson() {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
   
    {
      title: 'Lessons',
      dataIndex: 'lessonName',
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <div>
         <Button onClick={showCreateLessonModal}  className='border-0 bg-transparent cursor-pointer mr-1'>
            <img src={editImg} alt="" />
         </Button>
         <Button className='border-0 bg-transparent cursor-pointer'>
         <img src={removeImg} alt="" />
         </Button>
        </div>
      ),
    },
  ];
  const columns2: ColumnsType<DataType> = [
   
    {
      title: 'Questions',
      dataIndex: 'question',
      
    },
    {
      title: <Button className='float-right' type='primary'>Add questions</Button>,
      key: 'action',
      render: () => (
        <div>
         <Button onClick={showCreateQuestionModal} className='border-0 bg-transparent cursor-pointer mr-1'>
            <img src={editImg} alt="" />
         </Button>
         <Button className='border-0 bg-transparent cursor-pointer'>
         <img src={removeImg} alt="" />
         </Button>
        </div>
      ),
    },
  ];

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
  return (
    <div className='lessons bg-white'>
      <Row>
        <Col span={6}>
        <div className='lesson-left'>
        <Table columns={columns} dataSource={data} />
          <Button className='w-full mt-3' type='primary'>Add new lesson</Button>
        </div>
        </Col>
        <Col span={18}>
        <Table columns={columns2} dataSource={data2} />
        </Col>
      </Row>
      <Modal okText="Save"  className='w-[684px]' open={isLessonModalOpen} onOk={handleLessonOK} onCancel={handleLessonCancle}>
        <p className='h-14 flex items-center font-bold text-base border border-solid border-[#D0D0D0] px-4'>Create Lesson</p>
        <Form layout="vertical" className='pt-5 px-8'>
        <Form.Item label="Name *">
          <Input placeholder='Losum ip ....'/>
        </Form.Item>
        </Form>
      </Modal>
      <Modal okText="Save"  className='w-[684px]' open={isQuestionModalOpen} onOk={handleQuestionOK} onCancel={handleQuestionCancle}>
        <p className='h-14 flex items-center font-bold text-base border border-solid border-[#D0D0D0] px-4'>Create Question</p>
        <Form layout="vertical" className='pt-5 px-8'>
        <Form.Item label="Name *">
          <Input />
        </Form.Item>
        <Form.Item label="Type *">
          <Select>
            <Select.Option value="Read Kanji">Read Kanji</Select.Option>
            <Select.Option value="Read Kanji">Read Kanji</Select.Option>
            <Select.Option value="Read Kanji">Read Kanji</Select.Option>
          </Select>
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Lesson;
