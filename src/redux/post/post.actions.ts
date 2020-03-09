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

export const fetchPostFailure = action(FETCH_POSTS_FAILURE, payload<Error>());
export const fetchPosts = action(FETCH_POSTS, payload<IFetchPostsPayload>());
export const loadFeedsPosts = action(LOAD_FEEDS_POSTS, payload<Post[]>());
export const loadExplorePosts = action(LOAD_EXPLORE_POSTS, payload<Post[]>());

type PostActionType =
  | ReturnType<typeof fetchPostFailure>
  | ReturnType<typeof fetchPosts>
  | ReturnType<typeof loadExplorePosts>
  | ReturnType<typeof loadFeedsPosts>;

export default PostActionType;
