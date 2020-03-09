import React from 'react';

import './post-preview.styles.scss';
import CommentIcon from '../icons/comment/comment.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import LikeDislike from '../like-dislike/like-dislike.component';
import { Link } from 'react-router-dom';
import { Post } from '../../@types/post.interfaces';

export default function PostPreview({ post }: { post: Post }) {
	const {
		id,
		title,
		owner,
		img,
		likeCount,
		dislikeCount,
		commentsCount,
		likeStatus,
		timestamp
	} = post;
	return (
		<div className="post-preview">
			<div className="post-preview__content-container">
				<Link to={`/post-detail/${id}`}>
					<div className="img-hover-hitbox" />
					<img src={img} alt="page" />
				</Link>
				<div className="post-preview__content">
					<div className="post-preview__info">
						<span className="post-preview__title">{title}</span>
						<span className="post-preview__detail">
							by{' '}
							<Link to="/author" className="post-preview__author">
								{owner.username}
							</Link>
						</span>
					</div>
					<LikeDislike
						likeCount={likeCount}
						dislikeCount={dislikeCount}
						likeStatus={likeStatus}
					/>
				</div>
			</div>
			<div className="post-preview__additional">
				<div className="post-preview__comments">
					<CommentIcon size={1.2} />
					<span>{commentsCount} comments</span>
				</div>
				<BookmarkAddIcon size={1.2} />
			</div>
		</div>
	);
}
