import { action, payload } from 'ts-action';
import { User } from '../../@types/user.interfaces';

export interface IFetchUserPayload {
  name: 'USER';
  data: {
    id: string;
  };
}

export interface ILoginPayload {
  name: 'LOGIN';
  data: {
    email: string;
    password: string;
  };
}

export interface IRegisterPayload {
  name: 'REGISTER';
  data: {
    email: string;
    password: string;
    username: string;
    fullname: string;
  };
}

export const LOAD_USER = 'LOAD_USER';
export const LOGIN = 'LOGIN';
export const loadUser = action(LOAD_USER, payload<User>());
export const login = action(LOGIN, payload<{ user: User; token: string }>());

export type UserActionType =
  | ReturnType<typeof loadUser>
  | ReturnType<typeof login>;
