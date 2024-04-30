import React from 'react';
import { useParams } from 'react-router-dom';

export default function VideoView() {
    const { videoId } = useParams();
    return (
        <h1>{`Страница видео с id ${videoId}`}</h1>
    )
}
