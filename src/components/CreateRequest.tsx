import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import httpService from '@/services/httpService';

interface ICreateRequestProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    userId?: number;
}

type FieldType = {
    title?: string;
    requestContent?: string;
};

export default function CreateRequest({ open, setOpen, userId }: ICreateRequestProps) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [requestContent, setRequestContent] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    function handleCancel() {
        setOpen(false);
    }

    async function handleOk() {
        setConfirmLoading(true);
        try {
            await httpService.post('requests/', {
                title,
                content: requestContent,
                id_user: userId,
            });
            messageApi.open({
                type: 'success',
                content: 'Обращение успешно отправлено',
            });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Произошла ошибка, попробуйте позднее'
            });
        }
        setConfirmLoading(false);
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Modal
                title='Обращение'
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={600}
            >
                <Form
                    name='basic'
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete='off'
                    layout='vertical'
                >
                    <Form.Item<FieldType>
                        label='Тема'
                        name='title'
                        rules={[{ required: true, message: 'Введите тему' }]}
                    >
                        <Input value={title} onChange={e => setTitle(e.target.value)} style={{width: '100%'}} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label='Текст сообщения'
                        name='requestContent'
                        rules={[{ required: true, message: 'Введите запрос' }]}
                    >
                        <Input.TextArea rows={4} value={requestContent} onChange={e => setRequestContent(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )    
}
