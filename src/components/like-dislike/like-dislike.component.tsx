import React from "react";
import LikeIcon from "../icons/like/like.component";

import "./like-dislike.styles.scss";
import { LikeStatus } from "../../@types/post.interfaces";

export default function LikeDislike({
    likeCount,
    dislikeCount,
    likeStatus,
    className,
    size = 1.2
}: {
    likeCount: number;
    dislikeCount: number;
    likeStatus: LikeStatus;
    className?: string;
    size?: number;
}) {
    const spanSize = size - size / 4;

    return (
        <div className={`like-dislike ${className}`}>
            <div className="like-dislike__item">
                <LikeIcon
                    size={size}
                    color={
                        likeStatus === LikeStatus.liked ? "#00a3ff" : undefined
                    }
                />
                <span style={{ fontSize: `${spanSize}em` }}>{likeCount}</span>
            </div>
            <div className="like-dislike__item">
                <LikeIcon
                    rotate={180}
                    size={size}
                    color={
                        likeStatus === LikeStatus.disliked
                            ? "#00a3ff"
                            : undefined
                    }
                />
                <span style={{ fontSize: `${spanSize}em` }}>
                    {dislikeCount}
                </span>
            </div>
        </div>
    );
}
