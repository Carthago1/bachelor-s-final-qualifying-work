import React, { useEffect, useState } from 'react';
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';
import httpService from '@/services/httpService';

const iconStyle: React.CSSProperties = {
    fontSize: 35,
    cursor: 'pointer',
    marginRight: 5,
}

interface IReactionPanelProps {
    videoId?: string;
    userId?: number;
}

export default function ReactionPanel({ videoId, userId }: IReactionPanelProps) {
    const [likeClicked, setLikeClicked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesClicked, setDislikesClicked] = useState(false);
    const [dislikesCount, setDislikesCount] = useState(0);

    useEffect(() => {
        async function fetchLikesData() {
            try {
                const response = await httpService.get<any>(`likes/?id_video=${videoId}`);
                setLikesCount(response.likes_count);
                setDislikesCount(response.dislikes_count);
                (response.data as Array<any>).forEach(el => {
                    if (el.id_user === userId) {
                        if (el.reaction === 'like') {
                            setLikeClicked(true);
                        } else if (el.reaction === 'dislike') {
                            setDislikesClicked(false);
                        }
                    }
                });
            } catch(error) {
                console.log(error);
            }
        }

        fetchLikesData();
    }, []);

    async function handleLikeClick() {
        // ЗАПРОС
        if (likeClicked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
            if (dislikesClicked) {
                setDislikesClicked(false);
                setDislikesCount(prev => prev - 1);
            }
        }
        setLikeClicked(!likeClicked);
    }

    async function handleDislikeClick() {
        // ЗАПРОС
        if (dislikesClicked) {
            setDislikesCount(prev => prev - 1);
        } else {
            setDislikesCount(prev => prev + 1);
            if (likeClicked) {
                setLikeClicked(false);
                setLikesCount(prev => prev - 1);
            }
        }
        setDislikesClicked(!dislikesClicked);
    }

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'end', gap: 15}}>
            <div onClick={handleLikeClick}>
                {likeClicked ? 
                    <LikeFilled style={iconStyle} /> :
                    <LikeOutlined style={iconStyle} />
                }
                <span style={{fontSize: 25}}>{likesCount}</span>
            </div>
            <div onClick={handleDislikeClick}>
                {dislikesClicked ?
                    <DislikeFilled style={iconStyle} /> :
                    <DislikeOutlined style={iconStyle} /> 
                }
                <span style={{fontSize: 25}}>{dislikesCount}</span>
            </div>
        </div>
        
    )
}
