import React, { useState } from 'react';
import { Layout, Card, Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UpdatePassword from './UpdatePassword';

const contentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding: '1rem',
};

export default function ProfileCard() {
    const { user } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);

    const title = `Профиль ${user?.isStudent ? 'студента' : user?.isProfessor ? 'преподавателя' : 'администратора'}`
    return (
        <Layout>
            <Layout.Content style={contentStyle}>
                <Card title={title} bordered={false} style={{ width: 300 }}>
                    <p>Имя: {user?.name}</p>
                    <p>Фамилия: {user?.surname}</p>
                    <p>Отчество: {user?.patronymic}</p>
                    <p>email: {user?.email}</p>
                    <Button type="primary" onClick={() => setOpen(true)}>Обновить пароль</Button>
                </Card>

                <UpdatePassword open={open} setOpen={setOpen} />
            </Layout.Content>
        </Layout>
    )
}
