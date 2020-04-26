import {
  IChangeLikesOrDislikesPayload,
  IChangeSavedPayload
} from './global-post-actions';
import { Post } from './../../@types/post.interfaces';

export function changePostLikesOrDislikes<T extends Post> (
  post: T,
  payload: IChangeLikesOrDislikesPayload['data']
){
  const { id, like, dislike } = payload;
  if (post.id !== id) return { ...post };

  post.likeCount -= +!!post.liked;
  post.dislikeCount -= +!!post.disliked;
  post.liked = undefined;
  post.disliked = undefined;

  post.liked = !!like;
  post.disliked = !!dislike;

  post.likeCount += +!!like;
  post.dislikeCount += +!!dislike;

  return post;
}

export function changePostSaved (
  post: Post,
  payload: IChangeSavedPayload['data']
){
  if (post.id === payload.post.id) {
    post.saved = payload.saved;
  }
  return post;
}
