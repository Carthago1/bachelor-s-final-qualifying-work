import React, { useState } from 'react';
import { Comment } from '@/views/VideoView';
import getInitialsFullName from '@/utils/getInitialsFullName';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import httpService from '@/services/httpService';

interface IVideoCommentProps {
    comment: Comment;
    userId?: number;
    authorVideoId?: number;
    onDeleteClick: (commentId: number) => void;
}

export default function VideoComment({ comment, userId, authorVideoId, onDeleteClick }: IVideoCommentProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [commentContent, setCommentContent] = useState(comment.content);
    const [editedCommentContent, setEditedCommentContent] = useState(comment.content);
    const [messageApi, contextHolder] = message.useMessage();
    
    function handleEditClose() {
        setIsEdit(prev => !prev);
        if (isEdit) {
            setEditedCommentContent(commentContent);
        }
    }

    async function handleCommentSave() {
        try {
            await httpService.put(`comment/${comment.id}/`, {
                id_video: comment.id_video,
                content: editedCommentContent
            });
            setCommentContent(editedCommentContent);
            setIsEdit(false);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Произошла ошибка, попробуйте позднее'
            });
        }
    }
    
    return (
        <div style={{width: '100%', display: 'flex', gap: 10, flexDirection: 'column'}}>
            {contextHolder}
            <div style={{fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {getInitialsFullName(comment.fio.first_name, comment.fio.last_name, comment.fio.patronymic)}
                    {comment.id_author === authorVideoId && <CheckOutlined style={{marginLeft: 10}} />}
                </div>
                {userId === comment.id_author && 
                    <div>
                        <EditOutlined style={{cursor: 'pointer', marginRight: 10}} onClick={handleEditClose} />
                        <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => onDeleteClick(comment.id)} />
                    </div>
                }
            </div>
            <div style={{fontSize: '1rem'}}>
                {isEdit ? (
                    <>
                        <Input value={editedCommentContent} onChange={e => setEditedCommentContent(e.target.value)} />
                        <div style={{marginTop: 10, display: 'flex', gap: 10, justifyContent: 'end'}}>
                            <Button type='default' onClick={handleEditClose}>Отмена</Button>
                            <Button type='primary' onClick={handleCommentSave}>Сохранить</Button>
                        </div>
                    </>
                    ):
                    commentContent
                }
            </div>
        </div>
    )
}
