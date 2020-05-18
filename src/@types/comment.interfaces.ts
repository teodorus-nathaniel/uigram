import { UserBasicInfo } from './user.interfaces';
export interface Comment {
  id: string;
  owner: UserBasicInfo;
  content: string;
  postId: string;
  likeCount: number;
  dislikeCount: number;
  repliesCount: number;
  timestamp: number;
  liked?: boolean;
  parent?: string;
  disliked?: boolean;
  replies?: {
    page: number;
    data: Comment[];
  };
}
