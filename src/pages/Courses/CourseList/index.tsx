import { Button, Input, message, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import editImg from '../../../assets/images/btn-edit.svg'
import removeImg from '../../../assets/images/btn-remove.svg'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import appwrite from '@/services/appwriteClient';
import { APPWRITE_DATABASE_ID, APPWRITE_COURSE_ID } from "@/utils/constants/service.constant";
import { Models } from 'appwrite';
const { Search } = Input;


const CourseList = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<Models.Document[]>([])


  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Bạn đã xóa 1 bản ghi');
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Bạn chưa xóa');
  };

  const getDocuments = async () => {

    try {
      const res = await appwrite.provider().database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COURSE_ID)
      if (res) {
        setResponse(res.documents)
        console.log(res.documents)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDocuments()
  }, []);

  const columns: ColumnsType<Models.Document> = [
    {
      title: 'Course',
      dataIndex: 'course',
      width: 700,
      render: (text, record, index) => {
        return (<div className='flex gap-9'>
          <img className='w-52 h-32 object-contain' src={response[index].img} alt="course-img" />
          <div className="">
            <p className='font-bold text-lg mb-2'>{response[index].name}</p>
            <p className='font-normal text-lg'>{response[index].desc}</p>
          </div>
        </div>)
      },
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
          <Popconfirm
            title="Xóa bản ghi này"
            description="Bạn có muốn xóa bản ghi này không?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            <Button type='text' className='border-0 bg-transparent cursor-pointer'>
              <img src={removeImg} alt="" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onSearch = (value: string) => {
    let searchResult = response.filter(course => course.name.toLowerCase().includes(value.toLowerCase()))
    setResponse(searchResult)
  };





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
        <Table columns={columns} dataSource={response} pagination={{ pageSize: 5, defaultCurrent: 1, total: 25 }} />;
      </div>
    </div>
  );
}

export default CourseList;
