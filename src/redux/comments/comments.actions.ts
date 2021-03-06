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

export interface IFetchRepliesPayload {
  name: 'REPLIES';
  data: {
    parentId: string;
    page: number;
    limit: number;
  };
}

export interface ILikeOrDislikeCommentPayload {
  name: 'LIKE_DISLIKE_COMMENT';
  data: {
    id: string;
    like?: boolean;
    dislike?: boolean;
  };
}

export interface IAddNewCommentPayload {
  name: 'ADD_NEW_COMMENT';
  data: {
    postId: string;
    content: string;
  };
}

export interface IAddNewReplyPayload {
  name: 'ADD_NEW_REPLY';
  data: {
    id: string;
    content: string;
    postId: string;
  };
}

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';
export const ADD_REPLIES = 'ADD_REPLIES';
export const CLEAR_REPLIES = 'CLEAR_REPLIES';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const ADD_NEW_REPLY = 'ADD_NEW_REPLY';

export const addComments = action(
  ADD_COMMENTS,
  payload<{ comments: Comment[]; page: number; postId: string }>()
);
export const clearComments = action(CLEAR_COMMENTS);
export const addReplies = action(
  ADD_REPLIES,
  payload<{ replies: Comment[]; page: number; parentId: string }>()
);
export const clearReplies = action(CLEAR_REPLIES, payload<{ id: string }>());
export const updateComments = action(
  UPDATE_COMMENTS,
  payload<{ comment: Comment }>()
);
export const addNewComment = action(ADD_NEW_COMMENT, payload<Comment>());
export const addNewReply = action(ADD_NEW_REPLY, payload<Comment>());

type CommentsActionType =
  | ReturnType<typeof addComments>
  | ReturnType<typeof clearComments>
  | ReturnType<typeof addReplies>
  | ReturnType<typeof updateComments>
  | ReturnType<typeof clearReplies>
  | ReturnType<typeof addNewReply>;

export default CommentsActionType;
