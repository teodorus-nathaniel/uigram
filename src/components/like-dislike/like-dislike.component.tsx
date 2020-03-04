import React from 'react';
import LikeIcon from '../icons/like/like.component';

import './like-dislike.styles.scss';

export default function LikeDislike() {
	return (
		<div className="like-dislike">
			<div className="like-dislike__item">
				<LikeIcon size={1.2} />
				<span>1k</span>
			</div>
			<div className="like-dislike__item">
				<LikeIcon rotate={180} size={1.2} />
				<span>15</span>
			</div>
		</div>
	);
}
