import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, message } from 'antd';
import httpSerice from '@/services/httpService';

interface IUpdatePasswordProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    userId: number | undefined,
}

type FieldType = {
    password?: string;
    newPassword?: string;
    repeatedNewPassword?: string;
};

export default function UpdatePassword({open, setOpen, userId} : IUpdatePasswordProps) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedNewPassword, setRepeatedNewPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    async function handleOk() {
        if (newPassword !== repeatedNewPassword) {
            messageApi.open({
                type: 'error',
                content: 'Новый пароль и повторный пароль не совпадают',
            });

            return;
        }

        if (!userId) {
            return;
        }

        setConfirmLoading(true);

        try {
            const response = await httpSerice.put(`users/${userId}/`, {
                'current_password': password,
                'new_password': newPassword,
            });

            messageApi.open({
                type: 'success',
                content: 'Пароль успешно обновлен',
            })
        } catch (e) {
            console.log(e);
        }

        setOpen(false);
        setConfirmLoading(false);
    }

    function handleCancel() {
        setOpen(false);
    }
    
    return (
        <>
            {contextHolder}
            <Modal
                title='Обновление пароля'
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={600}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Текущий пароль"
                        name="password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password onChange={event => setPassword(event.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Новый пароль"
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password onChange={event => setNewPassword(event.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Повторите новый пароль"
                        name="repeatedNewPassword"
                        rules={[{ required: true, message: 'Please repeat your new password!' }]}
                    >
                        <Input.Password onChange={event => setRepeatedNewPassword(event.target.value)} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}
