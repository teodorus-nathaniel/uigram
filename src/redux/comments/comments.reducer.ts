import { Comment } from './../../@types/comment.interfaces';
import {
  CommentsActionType,
  ADD_COMMENTS,
  FETCH_COMMENTS,
  FETCH_COMMENTS_FAILURE,
  CLEAR_COMMENTS
} from './comments.actions';

interface IState {
  comments: Comment[];
  error: Error | null;
  isFetching: boolean;
}

const INITIAL_STATE: IState = {
  comments: [],
  error: null,
  isFetching: false
};

export default function commentsReducer (
  state: IState = INITIAL_STATE,
  action: CommentsActionType
): IState{
  switch (action.type) {
    case ADD_COMMENTS:
      return {
        ...state,
        isFetching: false,
        error: null,
        comments: [ ...state.comments, ...action.payload ]
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
        isFetching: false,
        error: null
      };
    default:
      return state;
  }
}
