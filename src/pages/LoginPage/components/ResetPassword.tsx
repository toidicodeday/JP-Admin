import api from '@/services';
import { REQUIRE_MESS } from '@/utils/constants/message.constant';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const [userID, setUserID] = useState('')
    const [secret, setSecret] = useState("")
    const location = useLocation();
    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('userId')
        const secret = new URLSearchParams(location.search).get('secret')


        if (userId && secret) {

            setUserID(userId)
            setSecret(secret)
            console.log('reset password screen');

        } else {
            console.log('forrgot password screen');

        }

    }, [location.search]);

    const navigate = useNavigate();

    const handleResetPassword = async (values: any) => {
        const res = await api.auth.recoveryPasswordConfirm(userID, secret, values.password, values.rePassword)
        if (res) {
            message.info('Reset password successful, please login again!')
            navigate("/login")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <p className="mb-5 text-4xl font-bold text-center">Reset Password</p>
                <Form
                    validateMessages={{ required: REQUIRE_MESS }}
                    layout="vertical"
                    onFinish={handleResetPassword}
                >
                    <Form.Item name="password" label="Password">
                        <Input.Password
                            placeholder="Enter your new password..."
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item name="rePassword" label="Confirm Password">
                        <Input.Password
                            placeholder="Enter your new password..."
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Button htmlType='submit' type='primary' block>Reset Password</Button>
                </Form>
            </div>
        </div>
    );
}

export default ResetPassword;
