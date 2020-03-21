import { IChangeLikesOrDislikesPayload } from './../post/post.actions';
import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';

export interface IAddOrRemovePostPayload {
  type: 'add' | 'remove';
  post: Post;
}

export const FETCH_SAVED_POSTS = 'FETCH_SAVED_POSTS';
export const SAVED_POST_FAILURE = 'SAVED_POST_FAILURE';
export const LOAD_SAVED_POSTS = 'LOAD_SAVED_POSTS';
export const ADD_OR_REMOVE_POST = 'ADD_OR_REMOVE_POST';
export const CHANGE_LIKES_OR_DISLIKES_SAVED_POSTS =
  'CHANGE_LIKES_OR_DISLIKES_SAVED_POSTS';

export const fetchSavedPosts = action(FETCH_SAVED_POSTS);
export const savedPostFailure = action(SAVED_POST_FAILURE, payload<Error>());
export const loadSavedPosts = action(LOAD_SAVED_POSTS, payload<Post[]>());
export const addOrRemovePost = action(
  ADD_OR_REMOVE_POST,
  payload<IAddOrRemovePostPayload>()
);
export const changeLikesOrDislikesSavedPosts = action(
  CHANGE_LIKES_OR_DISLIKES_SAVED_POSTS,
  payload<IChangeLikesOrDislikesPayload>()
);

type SavedPostsActionType =
  | ReturnType<typeof fetchSavedPosts>
  | ReturnType<typeof loadSavedPosts>
  | ReturnType<typeof savedPostFailure>
  | ReturnType<typeof addOrRemovePost>
  | ReturnType<typeof changeLikesOrDislikesSavedPosts>;

export default SavedPostsActionType;
