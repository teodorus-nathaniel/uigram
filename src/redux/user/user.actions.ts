import { action, payload } from 'ts-action';
import { User } from '../../@types/user.interfaces';

export interface IFetchUserPayload {
  name: 'USER';
  data: {
    id: string;
  };
}

export const LOAD_USER = 'LOAD_USER';
export const loadUser = action(LOAD_USER, payload<User>());

export type UserActionType = ReturnType<typeof loadUser>;
