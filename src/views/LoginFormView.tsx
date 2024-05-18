import React, { useEffect, useState } from 'react';
import { Flex, Button, Form, Input, Spin, message } from 'antd';
import httpService from '@/services/httpService';
import localStorageService from '@/services/localStorageService';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/store/user/userSlice';
import { setDiscipline } from '@/store/discipline/disciplineSlice';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { Discipline } from '@/store/discipline/disciplineTypes';

type FieldType = {
    email?: string;
    password?: string;
};
  
const App: React.FC = () => {
    const { authorized } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (authorized) {
            navigate('/');
        }
    })

    async function onFinish(values: FieldType) {
        setLoading(true);
        try {
            const body = {
                email: values.email,
                password: values.password
            }
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
            }));

            const response = await httpService.get<any[]>(`disciplines/?id_student=${data.id}`);
            const disciplines: Discipline[] = response.map(dis => {
                return {
                    id: dis.id_discipline,
                    name: dis.discipline.name_discipline,
                    professorId: dis.discipline.id_teacher,
                }
            });

            dispatch(setDiscipline(disciplines));

            navigate('/');
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: 'Введены неверные данные',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex justify={'center'} align={'center'} style={{height: '100vh'}} vertical>
            {loading && <Spin fullscreen/>}
            {contextHolder}
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
