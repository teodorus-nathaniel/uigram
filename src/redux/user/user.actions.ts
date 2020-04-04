import { Post } from './../../@types/post.interfaces';
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

export interface IFetchUserPostsPayload {
  name: 'FETCH_USER_POSTS';
  data: {
    page: number;
    id: string;
    self?: boolean;
  };
}

export const LOAD_USER = 'LOAD_USER';
export const LOGIN = 'LOGIN';
export const LOAD_USER_POSTS = 'LOAD_USER_POSTS';

export const loadUser = action(LOAD_USER, payload<User>());
export const login = action(LOGIN, payload<{ user: User; token: string }>());
export const loadUserPosts = action(
  LOAD_USER_POSTS,
  payload<{ page: number; self?: boolean; posts: Post[] }>()
);

export type UserActionType =
  | ReturnType<typeof loadUser>
  | ReturnType<typeof login>
  | ReturnType<typeof loadUserPosts>;
