import { UserBasicInfo } from './user.interfaces';
export interface Comment {
  id: string;
  owner: UserBasicInfo;
  content: string;
  likeCount: number;
  dislikeCount: number;
  repliesCount: number;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
}
