import { action, payload } from 'ts-action';
import { PostDetail } from '../../@types/post.interfaces';

export const FETCH_POST_DETAIL_FAILURE = 'FETCH_POST_DETAIL_FAILURE';
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';
export const LOAD_POST_DETAIL = 'LOAD_POST_DETAIL';
export const CHANGE_POST_DETAIL_SAVED = 'CHANGE_POST_DETAIL_SAVED';

export const fetchPostDetailFailure = action(
  FETCH_POST_DETAIL_FAILURE,
  payload<Error>()
);
export const fetchPostDetail = action(FETCH_POST_DETAIL, payload<string>());
export const loadPostDetail = action(LOAD_POST_DETAIL, payload<PostDetail>());

export type PostDetailActionType =
  | ReturnType<typeof fetchPostDetailFailure>
  | ReturnType<typeof fetchPostDetail>
  | ReturnType<typeof loadPostDetail>;

const PostDetailActionAPI = {
  fetchPostDetail
};

export default PostDetailActionAPI;
