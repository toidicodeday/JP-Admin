import { UserType } from '@/services/commonType';
import { Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import api from '@/services';
import { useNavigate } from 'react-router-dom';


const UserPage = () => {

    const [dataUser, setDataUser] = useState<UserType[]>([])
    const navigate = useNavigate();
    const getUserList = useCallback(
        async () => {
            const res = await api.user.getUserList()
            if (res) {
                const userData = res.documents.filter(
                    (obj, index) =>
                        res.documents.findIndex(item => item.userID === obj.userID) === index
                )
                setDataUser(userData)
            }
        },
        [],
    );

    useEffect(() => {
        getUserList()
    }, [getUserList]);

    const columns: ColumnsType<UserType> = [
        {
            title: "User",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];
    return (
        <div className='pt-6 px-8 pb-10'>
            <div className="p-6 bg-white flex items-center">
                <Input
                    className="w-60"
                    placeholder="Search user name"
                    allowClear
                />
            </div>
            <div className="py-5 flex justify-end">
            </div>
            <div className="pb-52 bg-white">
                <Table
                    columns={columns}
                    className="cursor-pointer"
                    dataSource={dataUser}
                    onRow={(record, rowIndex) => ({
                        onClick: (event) => {
                            navigate(`/users/${record.userID}`)
                        },
                    })}
                />
            </div>
        </div>
    );
}

export default UserPage;
