import { User } from '../../@types/user.interfaces';
import {
  UserActionType,
  LOAD_USER,
  FETCH_USER,
  FETCH_USER_FAILURE
} from './user.actions';

interface IState {
  self: User | null;
  user: User | null;
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE: IState = {
  self: null,
  user: null,
  isFetching: false,
  error: null
};

export default function userReducer (
  state: IState = INITIAL_STATE,
  action: UserActionType
): IState{
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: null
      };
    default:
      return state;
  }
}
