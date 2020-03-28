import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export interface IFetchFeedsPayload {
  name: 'FEEDS';
}

export interface IFetchExplorePayload {
  name: 'EXPLORE';
  data: {
    sort?: string;
  };
}

export const LOAD_FEEDS_POSTS = 'LOAD_FEEDS_POSTS';
export const LOAD_EXPLORE_POSTS = 'LOAD_EXPLORE_POSTS';

export const loadFeedsPosts = action(LOAD_FEEDS_POSTS, payload<Post[]>());
export const loadExplorePosts = action(
  LOAD_EXPLORE_POSTS,
  payload<{ sort?: string; posts: Post[] }>()
);

export type PostActionType =
  | ReturnType<typeof loadExplorePosts>
  | ReturnType<typeof loadFeedsPosts>;
