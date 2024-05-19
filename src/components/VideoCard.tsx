import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import im from '../assets/video.jpg';
import { Spin } from 'antd';

interface IVideoCard {
    alt?: string;
    src?: string;
    title: string;
    date: Date;
}

export default function VideoCard({ alt, src, title, date }: IVideoCard) {
    const convertedDate = new Date(date);
    const formatedDate = `${convertedDate.getDate()}.${convertedDate.getMonth() + 1}.${convertedDate.getFullYear()}`

    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState<string | undefined>(src ? src : im);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => setLoading(false);
            img.onerror = () => {
                setImgSrc(im);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [src]);
    
    return (
        <>
            {loading && <Spin fullscreen />}
            <Card
                hoverable
                style={{width: 240, height: 300}}
                cover={<img alt={alt} src={imgSrc} style={{height: 200, objectFit: 'cover'}} />}
            >
                <Card.Meta title={title} description={formatedDate} />
            </Card>
        </>
    )
}
