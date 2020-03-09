import React from 'react';
import LikeIcon from '../icons/like/like.component';

import './like-dislike.styles.scss';
import { LikeStatus } from '../../@types/post.interfaces';

export default function LikeDislike({
	likeCount,
	dislikeCount,
	likeStatus
}: {
	likeCount: number;
	dislikeCount: number;
	likeStatus: LikeStatus;
}) {
	return (
		<div className="like-dislike">
			<div className="like-dislike__item">
				<LikeIcon
					size={1.2}
					color={likeStatus === LikeStatus.liked ? '#00a3ff' : undefined}
				/>
				<span>{likeCount}</span>
			</div>
			<div className="like-dislike__item">
				<LikeIcon
					rotate={180}
					size={1.2}
					color={likeStatus === LikeStatus.disliked ? '#00a3ff' : undefined}
				/>
				<span>{dislikeCount}</span>
			</div>
		</div>
	);
}
