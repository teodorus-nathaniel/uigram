import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export const FETCH_SAVED_POSTS = 'FETCH_SAVED_POSTS';
export const SAVED_POST_FAILURE = 'SAVED_POST_FAILURE';
export const LOAD_SAVED_POSTS = 'LOAD_SAVED_POSTS';

export const fetchSavedPosts = action(FETCH_SAVED_POSTS);
export const savedPostFailure = action(SAVED_POST_FAILURE, payload<Error>());
export const loadSavedPosts = action(LOAD_SAVED_POSTS, payload<Post[]>());

export type SavedPostsActionType =
  | ReturnType<typeof fetchSavedPosts>
  | ReturnType<typeof loadSavedPosts>
  | ReturnType<typeof savedPostFailure>;

const SavedPostActionAPI = {
  fetchSavedPosts
};

export default SavedPostActionAPI;
