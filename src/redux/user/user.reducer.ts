import { User } from '../../@types/user.interfaces';
import { UserActionType, LOAD_USER, LOGIN } from './user.actions';

interface IState {
  self: User | null;
  user: User | null;
  token: string;
}

const INITIAL_STATE: IState = {
  self: null,
  user: null,
  token: ''
};

export default function userReducer (
  state: IState = INITIAL_STATE,
  action: UserActionType
): IState{
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        self: action.payload.user
      };
    default:
      return state;
  }
}
