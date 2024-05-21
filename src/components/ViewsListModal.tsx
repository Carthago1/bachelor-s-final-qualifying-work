import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Button, List } from 'antd';
import { ViewsData } from '@/views/VideoView';

interface IViewsListModal {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    viewsData: ViewsData[];
}

export default function ViewsListModal({ open, setOpen, viewsData }: IViewsListModal) {
    function handleOk() {
        console.log('ok');
        setOpen(false);
    }

    function handleCancel() {
        console.log('cancel');
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            title="Студенты, просмотревшие видео"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button type="primary" onClick={handleOk}>
                    Закрыть
                </Button>
            ]}
        >
            {viewsData.length === 0 ? <p>Видео пока что никто не посмотрел</p> :
                <List
                style={{width: '100%'}}
                size="large"
                bordered
                dataSource={viewsData}
                renderItem={(view) => (
                    <List.Item>
                            {`${view.fio.last_name} ${view.fio.first_name} ${view.fio.patronymic && view.fio.patronymic}`}
                        </List.Item>)}
                />
            }
        </Modal>
    )
}
