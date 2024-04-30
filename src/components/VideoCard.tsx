import React from 'react';
import { Card } from 'antd';
import im from '../assets/video.jpg';

interface IVideoCard {
    alt?: string;
    src?: string;
    title: string;
    date: Date;
}

export default function VideoCard({ alt, src, title, date }: IVideoCard) {
    return (
        <Card
            hoverable
            style={{width: 240}}
            cover={<img alt={alt} src={src ? src : im} />}
        >
            <Card.Meta title={title} description={date.toString()} />
        </Card>
    )
}
