import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

import AppHeader from './Layout/AppHeader';
import VideoPlayer from '@/components/VideoPlayer';
import AddComment from '@/components/addComment';

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

export default function VideoView() {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { authorized } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!authorized) {
            navigate('/login');
        }
    })

    return (
        <Layout>
            <AppHeader />
                <Layout.Content style={contentStyle}>
                    {/* <h1>{`Страница видео с id ${videoId}`}</h1> */}
                    <div style={containerStyle}>
                        <VideoPlayer />
                        <AddComment />
                    </div>
                </Layout.Content>
        </Layout>
    )
}
