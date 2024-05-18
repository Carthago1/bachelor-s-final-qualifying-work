import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import httpService from '@/services/httpService';

interface IAddVideoProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddVideo({ open, setOpen }: IAddVideoProps) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { discipline } = useSelector((state: RootState) => state.discipline);
    const { user } = useSelector((state: RootState) => state.user);
    const options = discipline.map(discipline => {
        return {
            value: discipline.id,
            label: discipline.name,
        }
    })
    const [file, setFile] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState('');

    async function handleOk() {
        setConfirmLoading(true);
        const formData = new FormData();
        formData.append('file_link', file);
        formData.append('title', title);
        formData.append('id_discipline', selected);
        formData.append('id_teacher', `${user?.id}`);
        
        try {
            const response = await httpService.post('video/', formData);
        } catch(error) {
            console.log(error);
        }
        
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    }

    function handleCancel() {
        setOpen(false);
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    const handleChangeFile = ({ fileList }: any) => {
        if (fileList.length > 0) {
            setFile(fileList[0].originFileObj);
        }
    }

    return (
        <Modal
            title='Добавление видео'
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={600}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Название">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Дисциплина">
                    <Select value={selected} onChange={(e) => setSelected(e)} >
                        {options.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>))
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="Описание">
                    <Input.TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                
                <Form.Item label="Видео" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload 
                        accept='.mp4' 
                        listType='picture-card'
                        maxCount={1}
                        onChange={handleChangeFile}
                        beforeUpload={() => false}
                    >
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>

            </Form>
        </Modal>
    )
}
