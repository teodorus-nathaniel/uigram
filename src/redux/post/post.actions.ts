import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export interface IFetchPostsPayload {
  type: 'explore' | 'feeds';
  sort?: string;
}

export const FETCH_POSTS_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POSTS = 'FETCH_POSTS';
export const LOAD_FEEDS_POSTS = 'LOAD_FEEDS_POSTS';
export const LOAD_EXPLORE_POSTS = 'LOAD_EXPLORE_POSTS';
export const CHANGE_SAVED = 'CHANGE_SAVED';
export const CHANGE_LIKES_OR_DISLIKES = 'CHANGE_LIKES_OR_DISLIKES';

export const fetchPostFailure = action(FETCH_POSTS_FAILURE, payload<Error>());
export const fetchPosts = action(FETCH_POSTS, payload<IFetchPostsPayload>());
export const loadFeedsPosts = action(LOAD_FEEDS_POSTS, payload<Post[]>());
export const loadExplorePosts = action(LOAD_EXPLORE_POSTS, payload<Post[]>());
export const changeSaved = action(
  CHANGE_SAVED,
  payload<{ id: string; saved: boolean }>()
);
export const changeLikesOrDislikes = action(
  CHANGE_LIKES_OR_DISLIKES,
  payload<{
    id: string;
    likesChange: 1 | -1 | undefined;
    dislikesChange: 1 | -1 | undefined;
  }>()
);

type PostActionType =
  | ReturnType<typeof fetchPostFailure>
  | ReturnType<typeof fetchPosts>
  | ReturnType<typeof loadExplorePosts>
  | ReturnType<typeof loadFeedsPosts>
  | ReturnType<typeof changeSaved>
  | ReturnType<typeof changeLikesOrDislikes>;

export default PostActionType;
