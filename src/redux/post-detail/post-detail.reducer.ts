import { PostDetail } from '../../@types/post.interfaces';
import PostDetailActionType, {
  CHANGE_POST_DETAIL_SAVED
} from './post-detail.actions';
import {
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAILURE,
  LOAD_POST_DETAIL
} from './post-detail.actions';

interface IState {
  postDetail: PostDetail | null;
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE: IState = {
  postDetail: null,
  isFetching: false,
  error: null
};

export default function postDetailReducer (
  state: IState = INITIAL_STATE,
  action: PostDetailActionType
): IState{
  switch (action.type) {
    case FETCH_POST_DETAIL:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_POST_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case LOAD_POST_DETAIL:
      return {
        ...state,
        postDetail: action.payload,
        error: null,
        isFetching: false
      };
    case CHANGE_POST_DETAIL_SAVED:
      if (!state.postDetail) return state;

      if (state.postDetail.id === action.payload.id) {
        state.postDetail.saved = action.payload.saved;
      }

      return {
        ...state,
        postDetail: { ...state.postDetail }
      };
    default:
      return state;
  }
}
