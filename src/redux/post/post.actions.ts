import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export interface IFetchFeedsPayload {
  name: 'FEEDS';
  data: {
    page: number;
  };
}

export interface IFetchExplorePayload {
  name: 'EXPLORE';
  data: {
    sort?: string;
    page: number;
  };
}

export const LOAD_FEEDS_POSTS = 'LOAD_FEEDS_POSTS';
export const LOAD_EXPLORE_POSTS = 'LOAD_EXPLORE_POSTS';

export const loadFeedsPosts = action(
  LOAD_FEEDS_POSTS,
  payload<{ posts: Post[]; page: number }>()
);
export const loadExplorePosts = action(
  LOAD_EXPLORE_POSTS,
  payload<{ sort?: string; posts: Post[]; page: number }>()
);

export type PostActionType =
  | ReturnType<typeof loadExplorePosts>
  | ReturnType<typeof loadFeedsPosts>;
