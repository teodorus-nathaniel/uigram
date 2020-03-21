import { Comment } from './../../@types/comment.interfaces';
import { action, payload } from 'ts-action';

export interface IFetchCommentsPayload {
  postId: string;
  page: number;
  limit: number;
}

export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export const fetchCommentsFailure = action(
  FETCH_COMMENTS_FAILURE,
  payload<Error>()
);
export const fetchComments = action(
  FETCH_COMMENTS,
  payload<IFetchCommentsPayload>()
);
export const addComments = action(ADD_COMMENTS, payload<Comment[]>());
export const clearComments = action(CLEAR_COMMENTS);

type CommentsActionType =
  | ReturnType<typeof fetchCommentsFailure>
  | ReturnType<typeof fetchComments>
  | ReturnType<typeof addComments>
  | ReturnType<typeof clearComments>;

export default CommentsActionType;
