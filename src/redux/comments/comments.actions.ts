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

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export const loadComments = action(LOAD_COMMENTS, payload<Comment[]>());
export const clearComments = action(CLEAR_COMMENTS);

export type CommentsActionType =
  | ReturnType<typeof loadComments>
  | ReturnType<typeof clearComments>;

const CommentActionAPI = {
  clearComments
};

export default CommentActionAPI;
