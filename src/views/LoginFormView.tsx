import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Flex, Button, Checkbox, Form, Input, Spin } from 'antd';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};
  
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);

    function onFinish(values: FieldType) {
        setLoading(true);
        setTimeout(() => {
            console.log('Success:', values);
            setLoading(false);
        }, 1000);
    }

    return (
        <Flex justify={'center'} align={'center'} style={{height: '100vh'}}>
            {loading && <Spin fullscreen/>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, width: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </Flex>
    );
}

export default App;
