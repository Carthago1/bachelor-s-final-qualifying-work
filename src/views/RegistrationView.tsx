import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Flex, Form, Spin, Input, Button } from 'antd';

type FieldType = {
    name?: string;
    surname?: string;
    patronomyc?: string;
    email?: string;
    password?: string;
    repeatedPassword?: string;
};

export default function RegistrationView() {
    const navigate = useNavigate();
    const { authorized } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (authorized) {
            navigate('/');
        }
    })

    async function onFinish(values: FieldType) {
        setLoading(true);
        console.log(values);
        // ЗАПРОС
        setLoading(false);
    }
    
    return (
        <Flex justify={'center'} align={'center'} style={{height: '100vh'}} vertical>
            {loading && <Spin fullscreen/>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, width: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Фамилия"
                    name="surname"
                    rules={[{ required: true, message: 'Please input your surname!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Отчество"
                    name="patronomyc"
                    rules={[{ required: true, message: 'Please input your Patronomyc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Повторите пароль"
                    name="repeatedPassword"
                    rules={[{ required: true, message: 'Please repeat your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}
