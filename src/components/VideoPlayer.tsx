import React, { useState, useRef, useEffect } from 'react';
import httpService from '@/services/httpService';

interface IVideoPlayerProps {
    videoSource?: string;
    videoId?: string;
    userId?: number;
}

export default function VideoPlayer({videoSource, videoId, userId}: IVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasSentRequest, setHasSentRequest] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) {
            return;
        }

        const handleTimeUpdate = async () => {
            const duration = videoElement.duration;

            if (duration && videoElement.currentTime / duration >= 0.8 && !hasSentRequest) {
                try {
                    setHasSentRequest(true);
                    await httpService.post('view/', {
                        id_video: videoId,
                        id_user: userId,
                    });
                } catch(error) {
                    console.log(error);
                }
            }
        }

        const handleLoadedMetadata = () => {
            setIsVideoLoaded(true);
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        if (!isVideoLoaded && videoSource) {
            videoElement.src = videoSource;
            videoElement.load();
        }

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
    }, [videoSource, hasSentRequest]);

    return (
        // <video ref={videoRef} controls preload="metadata" style={{width: '75%'}} autoPlay={!!videoSource}>
        <video ref={videoRef} controls preload="metadata" style={{width: '75%'}}>
            <source src={videoSource} type="video/mp4"/>
        </video>
    )
}
