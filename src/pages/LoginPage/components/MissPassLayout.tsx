import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { REQUIRE_MESS } from "@/utils/constants/message.constant";
import api from '@/services';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


const MissPassLayout = () => {

    const location = useLocation();
    const [type, setType] = useState<'confirm' | 'enter'>('confirm')
    const [userID, setUserID] = useState('')
    const [secret, setSecret] = useState("")
    const navigate = useNavigate();


    const FormCheckEmail = () => {
        return (
            <Form
                onFinish={handleVerifyMail}
                validateMessages={{ required: REQUIRE_MESS }}
                layout="vertical"
            >
                <Form.Item name="email">
                    <Input placeholder='Enter your email address' />
                </Form.Item>
                <Button htmlType='submit' type='primary' block>Verify Email</Button>
            </Form>
        )
    }

    const FormResetPassword = () => {
        return (
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
        )
    }

    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('userId')
        const secret = new URLSearchParams(location.search).get('secret')


        if (userId && secret) {
            setType('enter')
            setUserID(userId)
            setSecret(secret)
            console.log('password screen');

        } else {
            setType('confirm')
            console.log('email screen');

        }

    }, [location.search]);

    const handleVerifyMail = async (values: any) => {
        console.log("values", values)
        const res = await api.auth.recoveryPassword(values.email, "http://localhost:5173/miss-pass")
        if (res) {
            message.info("Verify mail")
        }

    }

    const handleResetPassword = async (values: any) => {
        const res = await api.auth.recoveryPasswordConfirm(userID, secret, values.password, values.rePassword)
        if (res) {
            message.info('Reset Password successful')
            navigate("/login")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <p className="mb-5 text-4xl font-bold text-center">Forgot Password?</p>
                {type === 'confirm' && <FormCheckEmail />}
                {type === 'enter' && <FormResetPassword />}
            </div>
        </div>
    );
}

export default MissPassLayout;
