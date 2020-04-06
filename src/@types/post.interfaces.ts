import { UserBasicInfo } from './user.interfaces';

export interface Post {
  id: string;
  title: string;
  owner: UserBasicInfo;
  images: string[];
  likeCount: number;
  dislikeCount: number;
  commentsCount: number;
  liked?: boolean;
  disliked?: boolean;
  timestamp: number;
  saved: boolean;
}

export interface PostDetail extends Post {
  likes: string[];
  dislikes: string[];
  description: string;
  link: string;
}
