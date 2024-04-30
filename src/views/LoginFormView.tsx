import React, { useEffect, useState } from 'react';
import { Flex, Button, Checkbox, Form, Input, Spin } from 'antd';
import httpService from '@/services/httpService';
import localStorageService from '@/services/localStorageService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    email?: string;
    password?: string;
};
  
const App: React.FC = () => {
    const { authorized } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authorized) {
            navigate('/');
        }
    })

    async function onFinish(values: FieldType) {
        setLoading(true);
        const body = {
            email: values.email,
            password: values.password
        }
        const result = await httpService.post<any>('/login', body);
        
        localStorageService.set('Authorization', result.token);
        // store

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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" onClick={() => navigate('/registration')} style={{marginLeft: 20}} >
                Зарегистироваться
            </Button>
        </Flex>
    );
}

export default App;
