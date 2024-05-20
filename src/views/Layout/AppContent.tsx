import React, { useState, Dispatch, SetStateAction } from 'react';
import { Layout, Row, Col, Empty, Input, Dropdown, Button } from 'antd';
import VideoCard from '@/components/VideoCard';
import { Link } from 'react-router-dom';
import { IContent } from './AppLayout';
import type { MenuProps } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#a5a47f91',
    padding: '1rem',
};

interface IContentProps {
    content: IContent[];
    setContent: Dispatch<SetStateAction<IContent[]>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    order: 'increasing' | 'decreasing';
    setOrder: Dispatch<SetStateAction<'increasing' | 'decreasing'>>;
}

export default function AppContent({content, search, setSearch, setContent, order, setOrder}: IContentProps) {
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
            setContent([...content].reverse());
            console.log(content);
        }

        if (e.key === '2' && order === 'increasing') {
            setOrder('decreasing');
            setContent([...content].reverse());
            console.log(content);
        }
    }
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
    }

    return (
        <Layout.Content style={contentStyle}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 10, gap: 10}}>
                <Input 
                    placeholder='Введите название видео'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Dropdown menu={menuProps}>
                    <Button>
                        <AlignLeftOutlined />
                        Упорядочить
                    </Button>
                </Dropdown>
            </div>
            <Row justify={'space-evenly'} gutter={[0, 20]}>
                {content.length ? content.map(cont => {
                    const key = `${cont.id}`;
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
