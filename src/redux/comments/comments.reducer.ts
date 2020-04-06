import { Comment } from './../../@types/comment.interfaces';
import {
  CommentsActionType,
  LOAD_COMMENTS,
  CLEAR_COMMENTS
} from './comments.actions';

interface IState {
  comments: Comment[];
}

const INITIAL_STATE: IState = {
  comments: []
};

export default function commentsReducer (
  state: IState = INITIAL_STATE,
  action: CommentsActionType
): IState{
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [ ...state.comments, ...action.payload ]
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      };
    default:
      return state;
  }
}
