import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import VideoCard from '@/components/VideoCard';
import { Link } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#0958d9',
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
        // ЗАПРОС
        setContent([
            {
                id: 1,
                title: 'Лекция 1',
                link: '/video/1',
                date: new Date(),
            },
            {
                id: 2,
                title: 'Лекция 2',
                link: '/video/2',
                date: new Date(),
            }
        ])
    }, [discipline.selectedDiscipline]);

    return (
        <Layout.Content style={contentStyle}>
            <Row justify={'space-evenly'} gutter={[0, 20]}>
                {content.map((cont, index) => {
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
                })}
            </Row>
        </Layout.Content>
    )
}
