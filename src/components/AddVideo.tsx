import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';

interface IAddVideoProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddVideo({ open, setOpen }: IAddVideoProps) {
    const [confirmLoading, setConfirmLoading] = useState(false);

    function handleOk() {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    }

    function handleCancel() {
        setOpen(false);
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
            123
        </Modal>
    )
}
