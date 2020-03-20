import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export interface IFetchPostsPayload {
  type: 'explore' | 'feeds';
  sort?: string;
}
export interface IChangeLikesOrDislikesPayload {
  id: string;
  like?: boolean;
  dislike?: boolean;
}

export const FETCH_POSTS_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POSTS = 'FETCH_POSTS';
export const LOAD_FEEDS_POSTS = 'LOAD_FEEDS_POSTS';
export const LOAD_EXPLORE_POSTS = 'LOAD_EXPLORE_POSTS';
export const CHANGE_SAVED = 'CHANGE_SAVED';
export const UPDATE_LIKES_OR_DISLIKES = 'UPDATE_LIKES_OR_DISLIKES';
export const CHANGE_LIKES_OR_DISLIKES = 'CHANGE_LIKES_OR_DISLIKES';

export const fetchPostFailure = action(FETCH_POSTS_FAILURE, payload<Error>());
export const fetchPosts = action(FETCH_POSTS, payload<IFetchPostsPayload>());
export const loadFeedsPosts = action(LOAD_FEEDS_POSTS, payload<Post[]>());
export const loadExplorePosts = action(LOAD_EXPLORE_POSTS, payload<Post[]>());
export const changeSaved = action(
  CHANGE_SAVED,
  payload<{ id: string; saved: boolean }>()
);
export const updateLikesOrDislikes = action(
  UPDATE_LIKES_OR_DISLIKES,
  payload<IChangeLikesOrDislikesPayload>()
);
export const changeLikesOrDislikes = action(
  CHANGE_LIKES_OR_DISLIKES,
  payload<IChangeLikesOrDislikesPayload>()
);

type PostActionType =
  | ReturnType<typeof fetchPostFailure>
  | ReturnType<typeof fetchPosts>
  | ReturnType<typeof loadExplorePosts>
  | ReturnType<typeof loadFeedsPosts>
  | ReturnType<typeof changeSaved>
  | ReturnType<typeof updateLikesOrDislikes>
  | ReturnType<typeof changeLikesOrDislikes>;

export default PostActionType;
