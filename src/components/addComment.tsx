import React, { useState, Dispatch, SetStateAction } from 'react';
import { Input, Button } from 'antd';
import { Comment } from '@/views/VideoView';
import httpService from '@/services/httpService';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface IAddCommentProps {
    comments: Comment[];
    setComments: Dispatch<SetStateAction<Comment[]>>;
    videoId?: string;
}

export default function AddComment({ comments, setComments, videoId }: IAddCommentProps) {
    const { user } = useSelector((state: RootState) => state.user);
    const [input, setInput] = useState('');
    const [buttonsVisibility, setButtonsVisibility] = useState(false);
    
    async function processAddition() {
        try {
            const response = await httpService.post<Comment>('comment/', {
                content: input,
                id_author: user?.id,
                id_video: videoId,
            });

            setComments([response, ...comments]);
            setButtonsVisibility(false);
            setInput('');
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Input.TextArea 
                placeholder='Введите комментарий'
                autoSize
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={() => setButtonsVisibility(true)}
            >
            </Input.TextArea>
            {buttonsVisibility &&
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 20}}>
                    <Button type='default' onClick={() => {
                        setButtonsVisibility(false);
                        setInput('');
                    }}>
                        Отмена
                    </Button>
                    <Button type='primary' onClick={processAddition}>Оставить комментарий</Button>
                </div>
            }
        </>
    )
}
