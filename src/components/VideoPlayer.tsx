import React from 'react';

interface IVideoPlayerProps {
    videoSource?: string;
}

export default function VideoPlayer({videoSource}: IVideoPlayerProps) {
    return (
        <video controls preload="metadata" style={{width: '75%'}}>
            <source src={videoSource} type="video/mp4"/>
        </video>
    )
}
