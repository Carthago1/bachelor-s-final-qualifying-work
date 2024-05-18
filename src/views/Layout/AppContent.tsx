import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Empty } from 'antd';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import VideoCard from '@/components/VideoCard';
import { Link } from 'react-router-dom';
import httpService from '@/services/httpService';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#a5a47f91',
    padding: '1rem',
};

interface IContent {
    id: number;
    title: string;
    link: string;
    date: Date;
    previewURL?: string;
}

export default function AppContent() {
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
        <Layout.Content style={contentStyle}>
            <Row justify={'space-evenly'} gutter={[0, 20]}>
                {content.length ? content.map((cont, index) => {
                    const key = `col-${index}`;
                    return (
                        <Col
                            key={key}
                            xs={{ flex: '100%' }}
                            sm={{ flex: '50%' }}
                            md={{ flex: '40%' }}
                            lg={{ flex: '20%' }}
                            xl={{ flex: '10%' }}
                        >
                            {<Link to={`/video/${cont.id}`}>
                                <VideoCard title={cont.title} date={cont.date} src={cont.previewURL} />
                            </Link>}
                        </Col>
                    );
                }) : 
                    <Empty description='Здесь пока что пусто, выберете другой предмет' />
                }
            </Row>
        </Layout.Content>
    )
}
