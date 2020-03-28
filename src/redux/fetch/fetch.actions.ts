import {
  IChangeLikesOrDislikesPayload,
  IChangeSavedPayload
} from './../global-post-actions/global-post-actions';
import { action, payload } from 'ts-action';
import { IFetchExplorePayload, IFetchFeedsPayload } from '../post/post.actions';
import { IFetchCommentsPayload } from '../comments/comments.actions';
import { IFetchPostDetailPayload } from '../post-detail/post-detail.actions';
import { IFetchSavedPostsPayload } from '../saved-posts/saved-posts.actions';
import { IFetchUserPayload } from '../user/user.actions';

// FIXME: ama buat saga patternnya bkin func
export type IFetchApiPayload =
  | IFetchExplorePayload
  | IFetchFeedsPayload
  | IFetchCommentsPayload
  | IFetchPostDetailPayload
  | IFetchSavedPostsPayload
  | IChangeLikesOrDislikesPayload
  | IChangeSavedPayload
  | IFetchUserPayload;

export type IFetchApiNames =
  | IFetchExplorePayload['name']
  | IFetchFeedsPayload['name']
  | IFetchCommentsPayload['name']
  | IFetchPostDetailPayload['name']
  | IFetchSavedPostsPayload['name']
  | IChangeLikesOrDislikesPayload['name']
  | IChangeSavedPayload['name']
  | IFetchUserPayload['name'];

export const FETCH_API = 'FETCH_API';
export const FETCH_API_FAIL = 'FETCH_API_FAIL';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';

export const fetchApi = action(FETCH_API, payload<IFetchApiPayload>());
export const fetchApiFail = action(
  FETCH_API_FAIL,
  payload<{ name: IFetchApiNames; error: Error }>()
);
export const fetchApiSuccess = action(
  FETCH_API_SUCCESS,
  payload<IFetchApiNames>()
);

export type FetchActionType =
  | ReturnType<typeof fetchApi>
  | ReturnType<typeof fetchApiFail>
  | ReturnType<typeof fetchApiSuccess>;
