import { Post } from './../@types/post.interfaces';
export default function updateLikesAndDislikes (
  post: Post,
  like?: boolean,
  dislike?: boolean
){
  post.likeCount -= +!!post.liked;
  post.dislikeCount -= +!!post.disliked;
  post.liked = undefined;
  post.disliked = undefined;

  post.liked = !!like;
  post.disliked = !!dislike;

  post.likeCount += +!!like;
  post.dislikeCount += +!!dislike;

  return { ...post };
}
