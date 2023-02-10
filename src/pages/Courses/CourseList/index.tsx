import { Button, Input, Table } from 'antd';
import React from 'react';
import courseImg from '../../../assets/images/course.png'
import editImg from '../../../assets/images/btn-edit.svg'
import removeImg from '../../../assets/images/btn-remove.svg'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;


interface DataType {
    key: string;
    course: React.ReactElement;
    cost: string;
    interested: number;
}
  const data: DataType[] = [
    {
      key: '1',
      course: <div></div>,
      cost: "FREE",
      interested: 100,
    },
    {
        key: '2',
        course: <div></div>,
        cost: "FREE",
        interested: 100,
      },
      {
        key: '3',
        course: <div></div>,
        cost: "FREE",
        interested: 100,
      },
  ];


function CourseList() {
    const navigate = useNavigate();
    const columns: ColumnsType<DataType> = [
        {
          title: 'Course',
          dataIndex: 'course',
          width: 700,
          render: (text) => <div className='flex gap-9'>
            <img src={courseImg} alt="course-img" />
            <div className="">
                <p className='font-bold text-lg mb-2'>Course Name</p>
                <p className='font-normal text-lg'>Course description text </p>
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
          title: '',
          key: 'action',
          render: () => (
            <div>
             <button className='border-0 bg-transparent cursor-pointer mr-1'>
                <img src={editImg} alt="" />
             </button>
             <button className='border-0 bg-transparent cursor-pointer'>
             <img src={removeImg} alt="" />
             </button>
            </div>
          ),
        },
      ];

      const onSearch = (value: string) => console.log(value);

      const handleMoveEdit = ()=>{
       navigate('/courses/courses-create')
      }
    

  return (
    <div className='pt-6 px-8 pb-10'>
    <div className="h-20 bg-white flex items-center pl-6">
    <Search className='w-60' placeholder="Search course name" onSearch={onSearch} style={{ width: 200 }} />
    </div>
    <div className="h-[76px] flex items-center float-right">
       <Button type="primary" onClick={handleMoveEdit}>Create new</Button>
    </div>
    <Table columns={columns} dataSource={data} />;
   </div>
  );
}

export default CourseList;
