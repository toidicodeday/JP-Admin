import api from '@/services';
import { UserType } from '@/services/commonType';
import { DEFAULT_ERR_MESS } from '@/utils/constants/message.constant';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';


const Members = () => {
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
    const [memberData, setMemberData] = useState<UserType[]>([])
    const [teamID, setTeamID] = useState('')
    const [memberID, setMemberID] = useState('')
    const [memberType, setMemberType] = useState<'add' | 'edit'>('add')
    const location = useLocation()
    const [formMember] = Form.useForm();
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.pathname.replace('/team/member/', '')
        setTeamID(id)


    }, [location.pathname])

    const getMemberList = useCallback(
        async () => {
            if (teamID) {
                const res = await api.team.getMemberList(teamID)
                if (res) {
                    console.log(res)
                    setMemberData(res.memberships)
                } else {
                    message.error('No data to display' || DEFAULT_ERR_MESS);
                }
            }
        },
        [teamID]
    );

    useEffect(() => {
        getMemberList()
    }, [getMemberList])

    const handleDeleteMember = async (values: any) => {
        const res = await api.team.deleteMember(values.teamId, values.$id)
        if (res) {
            getMemberList()
        }
    }

    const handleEditMember = async (values: any) => {
        setMemberType('edit')
        setMemberID(values.$id)
        setIsMemberModalOpen(true)
        const res = await api.team.getMember(values.teamId, values.$id)
        if (res) {
            formMember.setFieldsValue({
                email: values?.userEmail,
                name: values?.userName,
                role: values?.roles
            })
        }

    }

    const columns: ColumnsType<UserType> = [

        {
            title: "Name",
            dataIndex: "userName",
        },
        {
            title: "Role",
            dataIndex: "roles",
            render: (text) => (
                <div className="">{text}</div>
            )
        },
        {
            title: '',
            dataIndex: 'action',
            render: (text, record) => (
                <div className="">
                    <Button
                        type="text"
                        icon={<BsFillTrashFill />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMember(record);
                        }}
                    />
                    <Button
                        type='text'
                        icon={<AiFillEdit />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditMember(record);
                        }}
                    />
                </div>
            )
        }
    ];

    const showMemberModal = () => {
        setMemberType('add')
        setIsMemberModalOpen(true)
        formMember.resetFields()
    }

    const handleMemberSubmit = async (values: any) => {
        console.log("===>", values)
        setIsMemberModalOpen(false)
        const roles = values.role.split(", ")
        if (memberType === 'add') {
            const res = await api.team.createMembership(teamID, values.email, roles, `http://localhost:5173`)
            if (res) {
                console.log("membership res", res)
                getMemberList()
            }
        }
        else {
            const res = await api.team.updateMemberRole(teamID, memberID, roles)
            if (res) {
                console.log("edit res", res)
                getMemberList()
            }
        }
    }
    const handleMemberOk = () => {
        formMember.submit()
    }

    const handleMemberCancel = () => {
        setIsMemberModalOpen(false)
    }

    const handleBack = () => {
        navigate('/team')
    }

    return (
        <div className='pt-6 px-8 pb-10'>
            <div className="p-6 bg-white flex items-center">
                <Input
                    className="w-60"
                    placeholder="Search user name"
                    allowClear
                />
            </div>
            <div className="py-5 flex justify-between">
                <Button type="primary" onClick={handleBack}>
                    Back
                </Button>
                <Button type="primary" onClick={showMemberModal}>
                    Add member
                </Button>
                <Modal
                    okButtonProps={{ htmlType: "submit" }}
                    okText={memberType === 'add' ? 'add' : 'save'}
                    className="w-[684px]"
                    open={isMemberModalOpen}
                    onOk={handleMemberOk}
                    onCancel={handleMemberCancel}
                    title={memberType === 'add' ? 'Add new member' : 'Edit member'}
                >
                    <Form
                        layout='vertical'
                        form={formMember}
                        onFinish={handleMemberSubmit}
                    >
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Field is required" }]}>
                            <Input placeholder='Enter email...' />
                        </Form.Item>
                        <Form.Item label="Name" name="name">
                            <Input placeholder='Enter name...' />
                        </Form.Item>
                        <Form.Item label="Role" name="role">
                            <Input placeholder='Enter role...' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div className="pb-52 bg-white">
                <Table
                    columns={columns}
                    dataSource={memberData}
                    pagination={false}
                />
            </div>
        </div>
    );
}

export default Members;
