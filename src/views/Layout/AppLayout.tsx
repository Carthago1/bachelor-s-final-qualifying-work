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
    const [order, setOrder] = useState<'increasing' | 'decreasing'>('increasing');
    const [search, setSearch] = useState('');
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    async function fetchVideos(query?: string) {
        try {
            const response = await httpService.get<any[]>(`video/?id_discipline=${discipline.selectedDiscipline}&title=${search}`);
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

    const debounce = (func: () => void, delay: number) => {
        if (timer) {
            clearTimeout(timer);
        }

        setTimer(setTimeout(func, delay));
    }

    useEffect(() => {
        if (discipline.selectedDiscipline) {
            fetchVideos();
        }
    }, [discipline.selectedDiscipline]);

    useEffect(() => {
        debounce(() => {
            if (discipline.selectedDiscipline) {
                fetchVideos(search);
            }
        }, 500);

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [search]);

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider content={content} setContent={setContent} order={order} setOrder={setOrder} />
                <AppContent
                    content={content} 
                    search={search} 
                    setSearch={setSearch} 
                    setContent={setContent}
                    order={order}
                    setOrder={setOrder} 
                />
            </Layout>
        </Layout>
    )
}
