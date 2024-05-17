import React from 'react';
import { Comment } from '@/views/VideoView';
import getInitialsFullName from '@/utils/getInitialsFullName';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

interface IVideoCommentProps {
    comment: Comment;
    userId?: number;
    authorVideoId?: number;
    onDeleteClick: (commentId: number) => void;
}

export default function VideoComment({ comment, userId, authorVideoId, onDeleteClick }: IVideoCommentProps) {
    return (
        <div style={{width: '100%', display: 'flex', gap: '10px', flexDirection: 'column'}}>
            <div style={{fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {getInitialsFullName(comment.fio.first_name, comment.fio.last_name, comment.fio.patronymic)}
                    {comment.id_author === authorVideoId && <CheckOutlined style={{marginLeft: 10}} />}
                </div>
                {userId === comment.id_author && 
                    <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => onDeleteClick(comment.id)} />}
            </div>
            <div style={{fontSize: '1rem'}}>
                {comment.content}
            </div>
        </div>
    )
}
