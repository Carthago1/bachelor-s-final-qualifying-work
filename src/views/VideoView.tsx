import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Layout, Spin } from 'antd';
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

interface Fio {
    first_name: string;
    last_name: string;
    patronymic: string;
}

export interface Comment {
    id: number;
    content: string;
    id_author: number;
    id_video: number;
    fio: Fio;
    creation_date: string;
}

interface VideoData {
    id: number,
    file_link: string;
    id_discipline: number;
    id_teacher: number;
    title: string;
    upload_date: string;
}

export default function VideoView() {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { authorized } = useSelector((state: RootState) => state.user);
    const { user } = useSelector((state: RootState) => state.user);
    const [comments, setComments] = useState<Comment[]>([]);
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(true);

    async function onDeleteClick(commentId: number) {
        try {
            await httpService.delete(`comment/${commentId}/`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!authorized) {
            navigate('/login');
        }

        async function fetchVideoData() {
            try {
                const response = await httpService.get<VideoData>(`video/${videoId}/`);
                setVideoData(response);
            } catch(error) {
                console.log(error);
            }
        }

        async function fetchComments() {
            try {
                const response = await httpService.get<Comment[]>(`comment/?id_video=${videoId}`);
                setComments(response);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchVideoData();
        fetchComments();
    }, []);

    if (loading) {
        return <Spin fullscreen/>
    }

    return (
        <Layout>
            <AppHeader />
                <Layout.Content style={contentStyle}>
                    <div style={containerStyle}>
                        <VideoPlayer videoSource={videoData?.file_link} />
                        <AddComment comments={comments} setComments={setComments} videoId={videoId} />
                        <Divider />
                        {comments.map(comment => (
                            <VideoComment 
                                key={comment.id} 
                                comment={comment} 
                                userId={user?.id}
                                authorVideoId={videoData?.id_teacher}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                </Layout.Content>
        </Layout>
    )
}
