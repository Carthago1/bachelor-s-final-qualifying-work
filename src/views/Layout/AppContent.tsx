import React, { useState, Dispatch, SetStateAction } from 'react';
import { Layout, Row, Col, Empty, Input } from 'antd';
import VideoCard from '@/components/VideoCard';
import { Link } from 'react-router-dom';
import { IContent } from './AppLayout';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#a5a47f91',
    padding: '1rem',
};

interface IContentProps {
    content: IContent[];
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

export default function AppContent({content, search, setSearch}: IContentProps) {

    return (
        <Layout.Content style={contentStyle}>
            {content.length !== 0 && 
                <Input 
                    placeholder='Введите название видео'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{marginBottom: 10}}
                />
            }
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
