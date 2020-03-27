import { Comment } from './../../@types/comment.interfaces';
import { action, payload } from 'ts-action';

export interface IFetchCommentsPayload {
  name: 'COMMENTS';
  data: {
    postId: string;
    page: number;
    limit: number;
  };
}

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export const addComments = action(ADD_COMMENTS, payload<Comment[]>());
export const clearComments = action(CLEAR_COMMENTS);

export type CommentsActionType =
  | ReturnType<typeof addComments>
  | ReturnType<typeof clearComments>;

const CommentActionAPI = {
  clearComments
};

export default CommentActionAPI;
