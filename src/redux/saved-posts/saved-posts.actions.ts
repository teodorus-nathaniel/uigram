import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export interface IFetchSavedPostsPayload {
  name: 'SAVED_POSTS';
  data: {
    page: number;
  };
}

export const LOAD_SAVED_POSTS = 'LOAD_SAVED_POSTS';

export const loadSavedPosts = action(
  LOAD_SAVED_POSTS,
  payload<{ posts: Post[]; page: number }>()
);

export type SavedPostsActionType = ReturnType<typeof loadSavedPosts>;
