import { Button, Form, Input, message } from 'antd';
import { REQUIRE_MESS } from "@/utils/constants/message.constant";
import api from '@/services';



const ForgotPassword = () => {

    const handleVerifyMail = async (values: any) => {
        console.log("values", values)
        const res = await api.auth.recoveryPassword(values.email, "http://localhost:5173/reset-password")
        if (res) {
            message.info("Verify email, please check your email!")
        }

    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <p className="mb-5 text-4xl font-bold text-center">Forgot Password?</p>
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
            </div>
        </div>
    );
}

export default ForgotPassword;
