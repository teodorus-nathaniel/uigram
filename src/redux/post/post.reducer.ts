import { Post } from '../../@types/post.interfaces';
import PostActionType from './post.actions';

interface IState {
  explore: Post[];
  feeds: Post[];
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE = {
  explore: [],
  feeds: [],
  isFetching: false,
  error: null
};

export default function postReducer (
  state: IState = INITIAL_STATE,
  action: PostActionType
): IState{
  switch (action.type) {
    case 'FETCH_POSTS':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_POST_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case 'LOAD_FEEDS_POSTS':
      return {
        ...state,
        feeds: action.payload,
        isFetching: false,
        error: null
      };
    case 'LOAD_EXPLORE_POSTS':
      return {
        ...state,
        explore: action.payload,
        isFetching: false,
        error: null
      };
    default:
      return state;
  }
}
