import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Layout, Spin, Dropdown, Button } from 'antd';
import httpService from '@/services/httpService';

import AppHeader from './Layout/AppHeader';
import VideoPlayer from '@/components/VideoPlayer';
import AddComment from '@/components/addComment';
import VideoComment from '@/components/VideoComment';
import type { MenuProps } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';
import getCommentDeclension from '@/utils/getCommentDeclension';
import ReactionPanel from '@/components/ReactionPanel';
import ViewsListModal from '@/components/ViewsListModal';


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
    description: string;
}

export interface ViewsData {
    fio: Fio;
    id: number;
    id_user: number;
    id_video: number;
}

export default function VideoView() {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { authorized } = useSelector((state: RootState) => state.user);
    const { user } = useSelector((state: RootState) => state.user);
    const [comments, setComments] = useState<Comment[]>([]);
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<'increasing' | 'decreasing'>('increasing');
    const [isDescriptionShow, setIsDescriptionShow] = useState(false);
    const [modal, setModal] = useState(false);
    const [viewsData, setViewsData] = useState<ViewsData[]>([]);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Сначала новые'
        },
        {
            key: '2',
            label: 'Сначала старые'
        }
    ]

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '1' && order === 'decreasing') {
            setOrder('increasing');
            setComments([...comments].reverse());
        }

        if (e.key === '2' && order === 'increasing') {
            setOrder('decreasing');
            setComments([...comments].reverse());
        }
    }
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
    }

    async function onDeleteClick(commentId: number) {
        try {
            await httpService.delete(`comment/${commentId}/`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch(error) {
            console.log(error);
        }
    }

    async function handleViewsButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.nativeEvent.stopImmediatePropagation();
        event.preventDefault();
        try {
            const response = await httpService.get<ViewsData[]>(`view/?id_video=${videoId}`);
            setViewsData(response);
            setModal(true);
        } catch (error) {
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
                    <VideoPlayer videoSource={videoData?.file_link} videoId={videoId} userId={user?.id} />
                    {user?.isProfessor && 
                        <Button type='default' onClick={handleViewsButtonClick}>Просмотры</Button>
                    }
                    <ReactionPanel videoId={videoId} userId={user?.id} />
                    <div style={{width: '100%'}}>
                        <p style={{fontWeight: 'bold', fontSize: 20}}>{videoData?.title}</p>
                        {isDescriptionShow ? 
                            <p>{videoData?.description}</p> :
                            <span style={{cursor: 'pointer', color: 'gray'}} onClick={() => setIsDescriptionShow(true)}>Показать описание</span>
                        }
                    </div>
                    <AddComment comments={comments} setComments={setComments} videoId={videoId} order={order} />
                    <div style={{width: '100%', display: 'flex', gap: 10}}>
                        <p style={{fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>{getCommentDeclension(comments.length)}</p>
                        <Dropdown menu={menuProps}>
                            <Button>
                                <AlignLeftOutlined />
                                Упорядочить
                            </Button>
                        </Dropdown>
                    </div>
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
                <ViewsListModal open={modal} setOpen={setModal} viewsData={viewsData} />
            </Layout.Content>
        </Layout>
    )
}
