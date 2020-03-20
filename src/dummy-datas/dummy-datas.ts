import { Post, PostDetail } from '../@types/post.interfaces';
import PostImage from './../assets/images/page.jpg';
import AvatarImage from './../assets/images/avatar.jpg';

export const dummyPost: Post = {
  id: '1',
  title: 'Figma UI',
  img: [ PostImage ],
  owner: {
    id: '2',
    username: 'Teodorus'
  },
  likeCount: 12,
  dislikeCount: 10,
  liked: true,
  commentsCount: 120,
  timestamp: new Date(),
  saved: true
};

export const dummyArrayPost: Post[] = Array.from({
  length: 25
}).map((_, idx) => {
  const data = { ...dummyPost };
  data.id = idx + '';
  const rand = Math.floor(Math.random() * 3);
  data.liked = rand === 1;
  data.disliked = rand === 2;
  data.saved = Boolean(Math.floor(Math.random() * 2));
  return data;
});

export const dummyPostDetail: PostDetail = {
  id: '1',
  title: 'Figma UI',
  img: [ PostImage ],
  owner: {
    id: '2',
    username: 'Teodorus',
    profilePic: AvatarImage
  },
  likeCount: 0,
  dislikeCount: 0,
  likes: [],
  dislikes: [],
  saved: true,
  liked: true,
  commentsCount: 120,
  timestamp: new Date(),
  description: 'baki kabur menyelamatkan kota',
  link: 'google.com'
};
