import { UserType } from '@/services/commonType';
import { Button, Form, Input, Modal, Popconfirm, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
const { Search } = Input;
import editImg from "../../assets/images/btn-edit.svg";
import removeImg from "../../assets/images/btn-remove.svg";




const UserPage = () => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const [isTeamrModalOpen, setIsTeamModalOpen] = useState(false)
    const userData: UserType[] = [
        {
            name: 'Nguyễn Đức Anh',
            email: 'ducanh2kqo@gmail.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
            des: '@anhnd'
        },
        {
            name: 'Nguyễn Đức Anh',
            email: 'ducanh2kqo@gmail.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
            des: '@anhnd'
        },
        {
            name: 'Nguyễn Đức Anh',
            email: 'ducanh2kqo@gmail.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
            des: '@anhnd'
        },
        {
            name: 'Nguyễn Đức Anh',
            email: 'ducanh2kqo@gmail.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
            des: '@anhnd'
        },
    ];

    const onSearch = (value: string) => {
        // TODO [course list] missing search name
    };

    const showTeamModal = () => {
        setIsTeamModalOpen(true)
    }

    const handleTeamOk = () => {
        setIsTeamModalOpen(false)
    }

    const handleTeamCancel = () => {
        setIsTeamModalOpen(false)
    }


    const showUserModal = () => {
        setIsUserModalOpen(true)
    }

    const handleUserOK = () => {
        setIsUserModalOpen(false)
    }

    const handleUserCancel = () => {
        setIsUserModalOpen(false)
    }

    const columns: ColumnsType<UserType> = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => {
                return (
                    <div className="flex gap-4">
                        <img
                            className="w-[50px] h-[50px] rounded-[25px] object-contain"
                            src={record.avatar}
                            alt="course-img"
                        />
                        <div>
                            <p className="font-medium text-base mb-2">{record.name}</p>
                            <p className="font-normal text-base mb-2">{record.des}</p>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
        {
            key: "action",
            render: (text, record) => (
                <div className="flex justify-end">
                    <Button
                        type="text"
                        icon={<img src={editImg} alt="" />}
                    />
                    <Popconfirm
                        title="Delete User"
                        description="Are you sure to delete this item?"
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
        <div className='pt-6 px-8 pb-10'>
            <div className="p-6 bg-white flex items-center">
                <Search
                    className="w-60"
                    placeholder="Search user name"
                    onSearch={onSearch}
                    allowClear
                />
            </div>
            <div className="py-5 pr-2 flex items-center justify-end gap-3 bg-transparent">
                <Button type="primary" onClick={showTeamModal}>
                    Create new team
                </Button>
                <Modal
                    okButtonProps={{ htmlType: "submit" }}
                    okText={"ok"}
                    className="w-[684px]"
                    open={isTeamrModalOpen}
                    onOk={handleTeamOk}
                    onCancel={handleTeamCancel}
                    title="Create new team"
                >
                    <Form
                        layout='vertical'
                    >
                        <Form.Item label="Team">
                            <Input placeholder='Enter new team...' />
                        </Form.Item>
                    </Form>
                </Modal>
                <Button type="primary" onClick={showUserModal}>
                    Create new user
                </Button>
                <Modal
                    okButtonProps={{ htmlType: "submit" }}
                    okText={"ok"}
                    className="w-[684px]"
                    open={isUserModalOpen}
                    onOk={handleUserOK}
                    onCancel={handleUserCancel}
                    title="Create user"
                >
                    <Form
                        layout='vertical'
                    >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input placeholder='Enter name...' />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input placeholder='Enter email...' />
                        </Form.Item>
                        <Form.Item label="Role" name="role">
                            <Select>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="superAdmin">Super Admin</Select.Option>
                                <Select.Option value="user">User</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div className="pb-52 bg-white">
                <Table
                    columns={columns}
                    dataSource={userData}
                />
            </div>
        </div>
    );
}

export default UserPage;
