import { Comment } from './../../@types/comment.interfaces';
import CommentsActionType, {
  CLEAR_COMMENTS,
  ADD_COMMENTS,
  ADD_REPLIES,
  UPDATE_COMMENTS
} from './comments.actions';

interface IState {
  comments: Comment[];
  page: number;
  postId: string;
}

const INITIAL_STATE: IState = {
  comments: [],
  page: 0,
  postId: ''
};

export default function commentsReducer (
  state: IState = INITIAL_STATE,
  action: CommentsActionType
): IState{
  switch (action.type) {
    case ADD_COMMENTS:
      return {
        ...state,
        comments: [ ...state.comments, ...action.payload.comments ],
        page: action.payload.page,
        postId: action.payload.postId
      };

    case ADD_REPLIES:
      const newComments = [ ...state.comments ];
      const commentIdx = newComments.findIndex(
        (el) => el.id === action.payload.parentId
      );

      if (commentIdx !== -1) {
        const prevReplies = state.comments[commentIdx].replies;
        const newComment = {
          ...state.comments[commentIdx],
          replies: {
            data: [
              ...(prevReplies ? prevReplies.data : []),
              ...action.payload.replies
            ],
            page: action.payload.page
          }
        };

        newComments.splice(commentIdx, 1, newComment);
      }

      return {
        ...state,
        comments: newComments
      };

    case UPDATE_COMMENTS:
      const updatedComments = [ ...state.comments ];
      for (let i = 0; i < updatedComments.length; i++) {
        let found = false;
        if (updatedComments[i].id === action.payload.comment.id) {
          updatedComments.splice(i, 1, {
            ...action.payload.comment,
            replies: updatedComments[i].replies
          });
          break;
        }

        const replies = updatedComments[i].replies;

        if (replies) {
          for (let j = 0; j < replies.data.length; j++) {
            if (replies.data[j].id === action.payload.comment.id) {
              found = true;
              replies.data.splice(j, 1, action.payload.comment);
              break;
            }
          }
        }

        if (found) break;
      }

      return {
        ...state,
        comments: updatedComments
      };

    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
        page: 0
      };

    default:
      return state;
  }
}
