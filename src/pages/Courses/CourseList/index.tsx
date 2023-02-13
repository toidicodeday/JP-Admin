import { Button, Input, Table } from 'antd';
import React from 'react';
import editImg from '../../../assets/images/btn-edit.svg'
import removeImg from '../../../assets/images/btn-remove.svg'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;


interface DataType {
  key: string;
  course: string;
  description: string;
  cost: string;
  interested: number;
  imgSrc: string;
}
const data: DataType[] = [
  {
    key: '1',
    course: 'name',
    description: 'Course description text 1',
    cost: "FREE",
    interested: 100,
    imgSrc: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    key: '2',
    course: 'name',
    description: 'Course description text 2',
    cost: "FREE",
    interested: 100,
    imgSrc: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    key: '3',
    course: 'name',
    description: 'Course description text 3',
    cost: "FREE",
    interested: 100,
    imgSrc: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
];


const CourseList = () => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Course',
      dataIndex: 'course',
      width: 700,
      render: (text, record) => <div className='flex gap-9'>
        <img className='w-52 h-32 object-contain' src={record.imgSrc} alt="course-img" />
        <div className="">
          <p className='font-bold text-lg mb-2'>{text}</p>
          <p className='font-normal text-lg'>{record.description}</p>
        </div>
      </div>,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
    },
    {
      title: 'Interested',
      dataIndex: 'interested',
    },
    {
      key: 'action',
      render: (text, record, index) => (
        <div className='flex justify-end'>
          <Button type='text' onClick={handleMoveEdit} className='border-0 bg-transparent cursor-pointer mr-1'>
            <img src={editImg} alt="" />
          </Button>
          <Button type='text' className='border-0 bg-transparent cursor-pointer'>
            <img src={removeImg} alt="" />
          </Button>
        </div>
      ),
    },
  ];

  const onSearch = (value: string) => console.log(value);

  const handleMoveEdit = () => {
    navigate('/courses/courses-create')
  }


  return (
    <div className='pt-6 px-8 pb-10'>
      <div className="p-6 bg-white flex items-center">
        <Search className='w-60' placeholder="Search course name" onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <div className="py-5 pr-2 flex items-center justify-end bg-transparent">
        <Button type="primary" onClick={handleMoveEdit}>Create new</Button>
      </div>
      <div className="pb-52 bg-white">
        <Table columns={columns} dataSource={data} />;
      </div>
    </div>
  );
}

export default CourseList;
