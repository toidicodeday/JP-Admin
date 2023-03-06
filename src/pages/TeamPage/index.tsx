import api from '@/services';
import { TeamType } from '@/services/commonType';
import { Button, Form, Input, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { values } from 'lodash';
const { Search } = Input;




const TeamPage = () => {
    const [isTeamrModalOpen, setIsTeamModalOpen] = useState(false)
    const [teamData, setTeamData] = useState<TeamType[]>([])
    const [formTeam] = Form.useForm()
    const [teamID, setTeamID] = useState('')
    const [typeTeam, setTypeTeam] = useState<'create' | 'edit'>('create')
    const navigate = useNavigate();


    const onSearch = (value: string) => {
        // TODO [course list] missing search name
    };

    const handleTeamSubmit = async (values: any) => {
        if (typeTeam === 'edit') {
            const res = await api.team.updateTeam(teamID, values.name)
            if (res) {
                getTeamList()
            }
        } if (typeTeam === 'create') {
            const res = await api.team.createTeam(values.name)
            if (res) {
                getTeamList()
            }
        }
    }

    const handleDeleteTeam = async (values: any) => {
        const res = await api.team.deleteTeam(values.$id)
        if (res) {
            getTeamList()
        }
    }

    const handleEditTeam = async (values: any) => {
        setIsTeamModalOpen(true)
        setTeamID(values.$id)
        setTypeTeam('edit')
        const res = await api.team.getTeam(values.$id)
        if (res) {
            formTeam.setFieldsValue({
                name: values?.name
            })
        }
    }

    const showTeamModal = () => {
        setTypeTeam('create')
        setIsTeamModalOpen(true)
        formTeam.resetFields()
    }

    const handleTeamOk = () => {
        setIsTeamModalOpen(false)
        formTeam.submit()
    }

    const handleTeamCancel = () => {
        setIsTeamModalOpen(false)
    }

    const columns: ColumnsType<TeamType> = [

        {
            title: "Team Name",
            dataIndex: "name",
        },
        {
            title: "Member",
            dataIndex: "total",
        },
        {
            title: '',
            dataIndex: 'action',
            render: (text, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<BsFillTrashFill />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTeam(record);
                        }}
                    />
                    <Button
                        type='text'
                        icon={<AiFillEdit />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditTeam(record);
                        }}
                    />
                </div>
            )
        }
    ];


    const getTeamList = useCallback(
        async () => {
            const res = await api.team.getTeamList();
            if (res) {
                console.log("team list", res)
                setTeamData(res.teams)
            }
        },
        []);
    useEffect(() => {
        getTeamList()
    }, [getTeamList])

    return (
        <div className='pt-6 px-8 pb-10'>
            <div className="p-6 bg-white flex items-center">
                <Search
                    className="w-60"
                    placeholder="Search team"
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
                    title={typeTeam === 'create' ? 'Create new team' : 'Edit team'}
                >
                    <Form
                        layout='vertical'
                        form={formTeam}
                        onFinish={handleTeamSubmit}
                    >
                        <Form.Item name="name" label="Team">
                            <Input placeholder='Enter new team...' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div className="pb-52 bg-white">
                <Table
                    columns={columns}
                    dataSource={teamData}
                    pagination={false}
                    onRow={(record, rowIndex) => ({
                        onClick: (event) => {
                            navigate(`/team/member/${record.$id}`)
                        }, // click row
                    })}
                />
            </div>
        </div>
    );
}

export default TeamPage;
