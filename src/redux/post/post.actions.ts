import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

// FIXME: PISAHIN EXPLORE AMA FEEDS
export interface IFetchPostsPayload {
  name: 'POSTS';
  data: {
    type: 'explore' | 'feeds';
    sort?: string;
  };
}

export const LOAD_FEEDS_POSTS = 'LOAD_FEEDS_POSTS';
export const LOAD_EXPLORE_POSTS = 'LOAD_EXPLORE_POSTS';

export const loadFeedsPosts = action(LOAD_FEEDS_POSTS, payload<Post[]>());
export const loadExplorePosts = action(LOAD_EXPLORE_POSTS, payload<Post[]>());

export type PostActionType =
  | ReturnType<typeof loadExplorePosts>
  | ReturnType<typeof loadFeedsPosts>;
