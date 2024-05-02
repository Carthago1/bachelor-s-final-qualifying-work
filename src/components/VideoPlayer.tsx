import React from 'react';
import { Layout } from 'antd';

export default function VideoPlayer() {
    return (
        <video controls preload="metadata" style={{width: '75%'}}>
            <source src="http://localhost:8000/videos/example.mp4" type="video/mp4"/>
        </video>
    )
}
