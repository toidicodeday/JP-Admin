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
  const [searchName, setSearchName] = useState("");
  const [loadingTable, setLoadingTable] = useState(false);

  const confirmDelete = async (course: CourseType) => {
    const response = await api.course.deleteOneCourse(course.$id);
    if (response) {
      message.success("Delete successful");
      getDocuments();
    }
  };

  const getDocuments = useCallback(async () => {
    setLoadingTable(true);
    const response = await api.course.getCourseList({
      pageNo,
      pageSize,
      searchName,
    });
    if (response) {
      setDataTable(response.documents);
      setTotalCourse(response.total);
    }
    setLoadingTable(false);
  }, [pageNo, pageSize, searchName]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const onSearch = (value: string) => {
    // TODO [course list] missing search name

    setSearchName(value);
  };

  const handleMoveCreate = () => {
    navigate("/courses/courses-create");
  };

  const handleMoveEdit = (record: any) => {
    navigate(`/courses/${record?.$id}`);
  };

  const columns: ColumnsType<CourseType> = [
    {
      title: "Course",
      dataIndex: "course",
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
    // {
    //   title: "",
    //   dataIndex: "course",
    //   render: (text, record) => {
    //     return (
    //       <div className="flex gap-9">
    //         {/* <img
    //           className="w-52 h-32 object-contain"
    //           src={record.img}
    //           alt="course-img"
    //         /> */}
    //         <div>
    //           <p className="font-bold text-lg mb-2">{record.name}</p>
    //           <p className="font-normal text-lg">{record.desc}</p>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
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
            title="Delete Course"
            description="Are you sure to delete this item?"
            onConfirm={() => confirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<img src={removeImg} alt="" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

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
          rowKey={"$id"}
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
