import React, { useState } from 'react';
import { Layout, Card, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UpdatePassword from './UpdatePassword';
import CreateRequest from './CreateRequest';

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
    const [openRequest, setOpenRequest] = useState(false);

    const title = `Профиль ${user?.isAdmin ? 'администратора' : user?.isProfessor ? 'преподавателя' : 'студента'}`
    return (
        <Layout>
            <Layout.Content style={contentStyle}>
                <Card title={title} bordered={false} style={{ width: 300 }}>
                    <p>Имя: {user?.name}</p>
                    <p>Фамилия: {user?.surname}</p>
                    <p>Отчество: {user?.patronymic}</p>
                    <p>email: {user?.email}</p>
                    <div style={{display: 'flex', gap: 10}}>
                        <Button type='primary' onClick={() => setOpen(true)}>Обновить пароль</Button>
                        <Button type='primary' onClick={() => setOpenRequest(true)}>Поддержка</Button>
                    </div>
                </Card>

                <UpdatePassword open={open} setOpen={setOpen} userId={user?.id} />
                <CreateRequest open={openRequest} setOpen={setOpenRequest} userId={user?.id} />
            </Layout.Content>
        </Layout>
    )
}
