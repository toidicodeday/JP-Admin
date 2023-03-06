import api from '@/services';
import { UserType } from '@/services/commonType';
import { Button, Form, Input, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { el } from 'date-fns/locale';
import React, { useCallback, useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';


const Members = () => {
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
    const [memberData, setMemberData] = useState<UserType[]>([])
    const [teamID, setTeamID] = useState('')
    const location = useLocation()
    const [formMember] = Form.useForm();

    useEffect(() => {
        const id = location.pathname.replace('/team/member/', '')
        setTeamID(id)


    }, [location.pathname])

    const getMemberList = useCallback(
        async () => {
            if (teamID) {
                const res = await api.team.getMemberList(teamID)
                if (res) {
                    setMemberData(res.memberships)
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

    const columns: ColumnsType<UserType> = [

        {
            title: "Name",
            dataIndex: "userName",
        },
        {
            title: "Role",
            dataIndex: "teamName",
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
                </div>
            )
        }
    ];

    const showMemberModal = () => {
        setIsMemberModalOpen(true)
        formMember.resetFields()
    }

    const handleMemberSubmit = async (values: any) => {
        const res = await api.team.createMembership(teamID, values.email, [], `http://localhost:5173`)
        if (res) {
            console.log("membership res", res)
            getMemberList()
            setIsMemberModalOpen(false)
        }
    }
    const handleMemberOk = () => {
        formMember.submit()
    }

    const handleMemberCancel = () => {
        setIsMemberModalOpen(false)
    }

    return (
        <div className='pt-6 px-8 pb-10'>
            <div className="p-6 bg-white flex items-center">
                <Input
                    className="w-60"
                    placeholder="Search name"
                    allowClear
                />
            </div>
            <div className="py-5 flex justify-end">
                <Button type="primary" onClick={showMemberModal}>
                    Add member
                </Button>
                <Modal
                    okButtonProps={{ htmlType: "submit" }}
                    okText={"Add"}
                    className="w-[684px]"
                    open={isMemberModalOpen}
                    onOk={handleMemberOk}
                    onCancel={handleMemberCancel}
                    title="Add new member"
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
