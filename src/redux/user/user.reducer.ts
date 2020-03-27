import { User } from '../../@types/user.interfaces';
import { UserActionType, LOAD_USER } from './user.actions';

interface IState {
  self: User | null;
  user: User | null;
}

const INITIAL_STATE: IState = {
  self: null,
  user: null
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
    default:
      return state;
  }
}
