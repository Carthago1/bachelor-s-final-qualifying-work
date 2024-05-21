import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { Flex, Form, Spin, Input, Button, message } from 'antd';
import httpService from '@/services/httpService';
import { setUser } from '@/store/user/userSlice';
import { setDiscipline } from '@/store/discipline/disciplineSlice';
import localStorageService from '@/services/localStorageService';
import { Discipline } from '@/store/discipline/disciplineTypes';
import isEmailValid from '@/utils/emailValidate';

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
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    
    useEffect(() => {
        if (authorized) {
            navigate('/');
        }
    })

    async function onFinish(values: FieldType) {
        if (!isEmailValid(values.email)) {
            messageApi.open({
                type: 'error',
                content: 'Введите корректный email',
            });
            
            return;
        }

        if (values.password !== values.repeatedPassword) {
            messageApi.open({
                type: 'error',
                content: 'Введенные пароли не совпадают',
            });

            return;
        }

        setLoading(true);
        
        try {
            const body = {
                first_name: values.name,
                last_name: values.surname,
                patronymic: values.patronomyc,
                email: values.email,
                password: values.password,
            }

            await httpService.post<any>('users/', body);
            
            const result = await httpService.post<any>('token/', body);

            localStorageService.set('Authorization', result.access);
            
            const { data } = await httpService.get<any>('whoami/');

            dispatch(setUser({
                id: data.id,
                name: data.first_name,
                surname: data.last_name,
                patronymic: data.patronymic,
                email: data.email,
                isAdmin: data.is_admin,
                isStudent: data.is_student,
                isProfessor: data.is_teacher, 
                groupID: data.group_id,
            }));

            const response = await httpService.get<any[]>(`disciplines/?id_group=${data.id_group}`);
            const disciplines: Discipline[] = response.map(dis => {
                return {
                    id: dis.id_discipline,
                    name: dis.discipline.name_discipline,
                    professorId: dis.discipline.id_teacher,
                }
            });

            dispatch(setDiscipline(disciplines));

            navigate('/');
        } catch(e) {
            messageApi.open({
                type: 'error',
                content: 'Пользователь с такими данными уже существует',
            });
        }

        setLoading(false);
    }
    
    return (
        <Flex justify={'center'} align={'center'} style={{height: '100vh'}} vertical>
            {loading && <Spin fullscreen/>}
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, width: 420 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Фамилия"
                    name="surname"
                    rules={[{ required: true, message: 'Введите фамилию' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item<FieldType>
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Отчество"
                    name="patronomyc"
                    rules={[{ required: true, message: 'Введите отчество' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Введите email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Повторите пароль"
                    name="repeatedPassword"
                    rules={[{ required: true, message: 'Введите пароль еще раз' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={() => navigate('/login')}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}
