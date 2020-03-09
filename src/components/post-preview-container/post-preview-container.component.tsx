import React from 'react';
import PostPreview from '../post-preview/post-preview.component';
import './post-preview-container.styles.scss';
import { dummyArrayPost } from '../../dummy-datas/dummy-datas';
import { Post } from '../../@types/post.interfaces';

export default function PostPreviewContainer() {
	const dummyData = dummyArrayPost;
	return (
		<div className="post-preview-container">
			{dummyData.map((post: Post) => <PostPreview key={post.id} post={post} />)}
		</div>
	);
}
