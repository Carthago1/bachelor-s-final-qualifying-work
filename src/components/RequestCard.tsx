import React from 'react';
import { ISupportRequest, IRequestStatuses } from '@/views/AdminView';
import { Card, Button } from 'antd';
import httpService from '@/services/httpService';

interface IRequstCardProps {
    request: ISupportRequest;
    onUpdateStatus: (requestId: number, newStatus: IRequestStatuses) => void;
}

export default function RequestCard({request, onUpdateStatus}: IRequstCardProps) {
    const convertedDate = new Date(request.creation_date);
    const formatedDate = `${convertedDate.getDate()}.${convertedDate.getMonth() + 1}.${convertedDate.getFullYear()}`
    const formattedTime = `${convertedDate.getHours()}:${convertedDate.getMinutes()}`;

    async function editRequestStatus(status: IRequestStatuses) {
        await httpService.put(`requests/${request.id}/`, {
            title: request.title,
            content: request.content,
            id_user: request.id_user,
            status,
        });

        onUpdateStatus(request.id, status);
    }

    async function handleAcceptClick() {
        try {
            await editRequestStatus('Done');
        } catch(error) {
            console.error(error);
        }
    }

    async function handleDenyClick() {
        try {
            await editRequestStatus('Denied');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card 
            title={`${request.fio.last_name} ${request.fio.first_name} ${request.fio.patronymic && request.fio.patronymic}`} 
            bordered={false} 
            style={{ width: 600 }}
        >
            <p style={{fontWeight: 'bold'}}>Тема:</p>
            <p>{request.title}</p>
            <p style={{fontWeight: 'bold'}}>Обращение:</p>
            <p>{request.content}</p>
            <p style={{fontWeight: 'bold'}}>Статус: {request.status === 'Pending' ?
                'ожидает рассмотрения' : request.status === 'Denied' ? 'отклонен' : 'одобрен'}
            </p>
            <p style={{fontWeight: 'bold'}}>Дата обращения: {`${formatedDate} ${formattedTime}`}</p>
            {request.status === 'Pending' &&
                <div style={{display: 'flex', gap: 10, justifyContent: 'end'}}>
                    <Button type='primary' onClick={handleAcceptClick}>Подтвердить</Button>
                    <Button type='primary' danger onClick={handleDenyClick}>Отказать</Button>
                </div>
            }
        </Card>
    )
}
