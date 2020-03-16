export enum LikeStatus {
    liked,
    disliked,
    noStatus
}

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
    likeStatus: LikeStatus;
    timestamp: Date;
}

export interface PostDetail extends Post {
    description: string;
    link: string;
}
