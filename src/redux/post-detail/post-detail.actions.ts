import { action, payload } from 'ts-action';
import { PostDetail } from '../../@types/post.interfaces';
import { unfollowUser, followUser } from '../user/user.actions';

export interface IFetchPostDetailPayload {
  name: 'POST_DETAIL';
  data: {
    id: string;
  };
}
export const LOAD_POST_DETAIL = 'LOAD_POST_DETAIL';
export const CHANGE_POST_DETAIL_SAVED = 'CHANGE_POST_DETAIL_SAVED';

export const loadPostDetail = action(LOAD_POST_DETAIL, payload<PostDetail>());

export type PostDetailActionType =
  | ReturnType<typeof loadPostDetail>
  | ReturnType<typeof followUser>
  | ReturnType<typeof unfollowUser>;
