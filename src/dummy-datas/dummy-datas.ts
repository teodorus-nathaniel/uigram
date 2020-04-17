import { User } from './../@types/user.interfaces';
import { Comment } from './../@types/comment.interfaces';
import { Post, PostDetail } from '../@types/post.interfaces';
import PostImage from './../assets/images/page.jpg';
import page from './../assets/images/Capture.png';
import AvatarImage from './../assets/images/avatar.png';

export const dummyPost: Post = {
  id: '1',
  title: 'Figma UI',
  images: [ PostImage, page ],
  owner: {
    id: '2',
    username: 'Teodorus'
  },
  likeCount: 12,
  dislikeCount: 10,
  liked: true,
  commentsCount: 120,
  timestamp: +(new Date().getTime() / 1000).toFixed(0),
  saved: true
};

export const dummyArrayPost = (page: number) =>
  Array.from({
    length: 25
  }).map((_, idx) => {
    const data = { ...dummyPost };
    data.id = idx + page * 25 + '';
    const rand = Math.floor(Math.random() * 3);
    data.liked = rand === 1;
    data.disliked = rand === 2;
    data.saved = Boolean(Math.floor(Math.random() * 2));
    return data;
  });

export const dummyPostDetail = (id: string): PostDetail => ({
  id,
  title: 'Figma UI',
  images: [ PostImage, page, PostImage ],
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
  timestamp: +(new Date().getTime() / 1000).toFixed(0),
  description:
    'baki kabur menyelamatkan kota lorem ipsum baki kabur bos menyelamatkan kota baktown dengan baju dari bakstore',
  link: 'google.com'
});

export const dummyComment: Comment = {
  id: '1',
  content:
    'lorem ipsum baki kabur bos menyelamatkan kota baktown dengan baju dari bakstore',
  dislikeCount: 20,
  likeCount: 1,
  owner: {
    id: 'isadjf',
    username: 'Teodorus'
  },
  repliesCount: 5,
  timestamp: +(new Date().getTime() / 1000).toFixed(0)
};

export const dummyArrayComments = (page: number) =>
  Array.from({
    length: 5
  }).map((_, idx) => {
    const rand = Math.floor(Math.random() * 3);
    const comment = { ...dummyComment };

    if (Math.random() > 0.5) comment.repliesCount = 0;
    comment.id = idx + page * 5 + '';
    comment.liked = rand === 1;
    comment.disliked = rand === 2;

    return comment;
  });

export const dummyUser: User = {
  email: 'nathankurnia26@gmail.com',
  followersCount: 10,
  followingCount: 100,
  fullname: 'Teodorus Nathaniel',
  id: 'asdf',
  status: 'Front end developer',
  username: 'Teodorus'
};
