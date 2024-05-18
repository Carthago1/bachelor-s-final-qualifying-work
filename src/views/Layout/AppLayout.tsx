import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import httpService from '@/services/httpService';

export interface IContent {
    id: number;
    title: string;
    link: string;
    date: Date;
    previewURL?: string;
    description?: string;
}
  
export default function AppLayout() {
    const discipline = useSelector((state: RootState) => state.discipline);
    const [content, setContent] = useState<Array<IContent>>([]);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await httpService.get<any[]>(`video/?id_discipline=${discipline.selectedDiscipline}`);
                const videos: IContent[] = response.map(video => {
                    return {
                        id: video.id,
                        title: video.title,
                        link: `/video/${video.id}`,
                        date: video.upload_date,
                        previewURL: video.preview_image,
                        description: video.description,
                    }
                });

                setContent(videos);
            } catch(error) {
                console.log(error);
            }
        }

        if (discipline.selectedDiscipline) {
            fetchVideos();
        }
    }, [discipline.selectedDiscipline]);

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider content={content} setContent={setContent} />
                <AppContent content={content} />
            </Layout>
        </Layout>
    )
}
