import React from 'react';

interface IVideoCommentProps {
    // id: number;
    content: string;
    authorId: number;
}

export default function VideoComment({ content, authorId }: IVideoCommentProps) {
    return (
        <div style={{width: '100%', display: 'flex', gap: '10px', flexDirection: 'column'}}>
            <div style={{fontSize: '1.5rem'}}>
                Автор: {authorId}
            </div>
            <div style={{fontSize: '1rem'}}>
                {content}
            </div>
        </div>
    )
}
