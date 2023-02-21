import { Button, Input, message, Popconfirm, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import editImg from "../../../assets/images/btn-edit.svg";
import removeImg from "../../../assets/images/btn-remove.svg";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import api from "@/services";
import { CourseType } from "@/services/commonType";
const { Search } = Input;

const initPageNo = 1;
const initPageSize = 5;

const CourseList = () => {
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState<CourseType[]>([]);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [pageNo, setPageNo] = useState(initPageNo);
  const [pageSize, setPageSize] = useState(initPageSize);
  const [searchName, setSearchName] = useState('')
  const [loadingTable, setLoadingTable] = useState(false)

  const confirmDelete = async (course: Models.Document) => {
    // TODO [course list] delete coruse not done
    const response = await api.course.deleteOneCourse(course.$id)
    if (response) {
      console.log("delete response", response)
      getDocuments()
    }
    console.log("confirmDelete", course);
    message.success("Bạn đã xóa 1 bản ghi");
  };

  const getDocuments = useCallback(
    async () => {
      setLoadingTable(true)
      const response = await api.course.getCourseList({ pageNo, pageSize, searchName });
      if (response) {
        setDataTable(response.documents);
        setTotalCourse(response.total);
      }
      setLoadingTable(false)
    },
    [pageNo, pageSize, searchName]
  );


  useEffect(() => {
    // const getDocuments = async () => {
    //   setLoadingTable(true)
    //   const response = await api.course.getCourseList({ pageNo, pageSize, searchName });
    //   if (response) {
    //     setDataTable(response.documents);
    //     setTotalCourse(response.total);
    //   }
    //   setLoadingTable(false)
    // }
    getDocuments()
  }, [pageNo, pageSize, searchName]
  );


  const columns: ColumnsType<Models.Document> = [
    {
      title: "Course",
      dataIndex: "course",
      width: 700,
      render: (text, record) => {
        return (
          <div className="flex gap-9">
            <img
              className="w-52 h-32 object-contain"
              src={record.img}
              alt="course-img"
            />
            <div>
              <p className="font-bold text-lg mb-2">{record.name}</p>
              <p className="font-normal text-lg">{record.desc}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
    },
    {
      title: "Interested",
      dataIndex: "interested",
    },
    {
      key: "action",
      render: (text, record) => (
        <div className="flex justify-end">
          <Button
            type="text"
            onClick={() => handleMoveEdit(record)}
            icon={<img src={editImg} alt="" />}
          />
          <Popconfirm
            title="Xóa bản ghi này"
            description="Bạn có muốn xóa bản ghi này không?"
            onConfirm={() => confirmDelete(record)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" icon={<img src={removeImg} alt="" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onSearch = (value: string) => {
    // TODO [course list] missing search name

    setSearchName(value)
  };


  const handleMoveCreate = () => {
    console.log("handleMoveCreate");
    navigate('/courses/courses-create')
  }

  const handleMoveEdit = (record: any) => {
    console.log("handleMoveEdit", record);
    navigate(`/courses/${record?.$id}`);
  };



  return (
    <div className="pt-6 px-8 pb-10">
      <div className="p-6 bg-white flex items-center">
        <Search
          className="w-60"
          placeholder="Search course name"
          onSearch={onSearch}
          allowClear
        />
      </div>
      <div className="py-5 pr-2 flex items-center justify-end bg-transparent">
        <Button type="primary" onClick={() => handleMoveCreate()}>
          Create new
        </Button>
      </div>
      <div className="pb-52 bg-white">
        <Table
          columns={columns}
          rowKey={'$id'}
          dataSource={dataTable}
          loading={loadingTable}
          pagination={{
            pageSize: pageSize,
            defaultCurrent: 1,
            total: totalCourse,
            onChange: (newPageNo, newPageSize) => {
              setPageNo(newPageNo);
              setPageSize(newPageSize);
            },
          }}
        />
        ;
      </div>
    </div>
  );
};

export default CourseList;
