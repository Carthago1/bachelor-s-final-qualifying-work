import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Layout } from 'antd';
import httpService from '@/services/httpService';

import AppHeader from './Layout/AppHeader';
import VideoPlayer from '@/components/VideoPlayer';
import AddComment from '@/components/addComment';
import VideoComment from '@/components/VideoComment';

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding: '1rem',
};

const containerStyle: React.CSSProperties = {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
}

export interface Comment {
    id: number;
    content: string;
    id_author: number;
    id_video: number;
}

export default function VideoView() {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { authorized } = useSelector((state: RootState) => state.user);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (!authorized) {
            navigate('/login');
        }

        async function fetchComments() {
            try {
                const response = await httpService.get<Comment[]>(`comment/?id_video=${videoId}`);
                setComments(response);
            } catch(error) {
                console.log(error);
            }
        }

        fetchComments();
    }, []);

    return (
        <Layout>
            <AppHeader />
                <Layout.Content style={contentStyle}>
                    <div style={containerStyle}>
                        <VideoPlayer />
                        <AddComment comments={comments} setComments={setComments} videoId={videoId} />
                        <Divider />
                        {comments.map(comment => (
                            <VideoComment content={comment.content} authorId={comment.id_author} />
                        ))}
                    </div>
                </Layout.Content>
        </Layout>
    )
}
