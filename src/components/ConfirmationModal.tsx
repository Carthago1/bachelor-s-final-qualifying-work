import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Button } from 'antd';

interface IConfirmationModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSuccess: () => void;
}

export default function ConfirmationModal({ open, setOpen, onSuccess }: IConfirmationModalProps) {
    function handleCancel() {
        setOpen(false);
    }

    async function handleOk() {
        setOpen(false);
        onSuccess();
    }

    return (
        <Modal
            open={open}
            title="Подтверждение"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button type="primary" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button type='primary' danger onClick={handleOk}>
                    Да
                </Button>
            ]}
        >
            <h1>Вы уверены?</h1>
        </Modal>
    )
}
