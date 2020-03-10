import { Post, LikeStatus } from '../@types/post.interfaces';
import PostImage from './../assets/images/Capture.png';

export const dummyPost: Post = {
	id: '1',
	title: 'Figma UI',
	img: PostImage,
	owner: {
		id: '2',
		username: 'Teodorus'
	},
	likeCount: 12,
	dislikeCount: 10,
	likeStatus: LikeStatus.liked,
	commentsCount: 120,
	timestamp: new Date(),
	saved: true
};

export const dummyArrayPost: Post[] = Array.from({
	length: 25
}).map((_, idx) => {
	const data = { ...dummyPost };
	data.id = idx + '';
	data.likeStatus = Math.floor(Math.random() * 3);
	data.saved = Boolean(Math.floor(Math.random() * 2));
	return data;
});