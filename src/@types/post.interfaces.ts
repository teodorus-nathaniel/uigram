// export enum LikeStatus {
//     liked,
//     disliked,
//     noStatus
// }

export interface Post {
  id: string;
  title: string;
  owner: {
    id: string;
    username: string;
    profilePic?: string;
  };
  img: string;
  likeCount: number;
  dislikeCount: number;
  commentsCount: number;
  liked?: boolean;
  disliked?: boolean;
  timestamp: Date;
  saved: boolean;
}

export interface PostDetail extends Post {
  likes: string[];
  dislikes: string[];
  description: string;
  link: string;
}
