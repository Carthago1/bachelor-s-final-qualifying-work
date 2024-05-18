import React, { useState, useRef, useEffect } from 'react';

interface IVideoPlayerProps {
    videoSource?: string;
}

export default function VideoPlayer({videoSource}: IVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) {
            return;
        }

        const handleTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);
            console.log(videoElement.currentTime);
        }

        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, []);

    return (
        <video ref={videoRef} controls preload="metadata" style={{width: '75%'}}>
            <source src={videoSource} type="video/mp4"/>
        </video>
    )
}
