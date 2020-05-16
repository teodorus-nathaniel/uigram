import { Post } from './../../@types/post.interfaces';
import { action, payload } from 'ts-action';
import { User } from '../../@types/user.interfaces';

export interface ICheckUserPayload {
  name: 'CHECK_USER';
}

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

export interface IFollowUserPayload {
  name: 'FOLLOW_USER';
  data: {
    id: string;
  };
}
export interface IUnfollowUserPayload {
  name: 'UNFOLLOW_USER';
  data: {
    id: string;
  };
}

export interface IUpdateUserPayload {
  name: 'UPDATE_USER';
  data: {
    profilePic?: File;
    username?: string;
    fullname?: string;
    status?: string;
  };
}

export const LOAD_USER = 'LOAD_USER';
export const LOGIN = 'LOGIN';
export const CHECK_USER = 'CHECK_USER';
export const LOAD_USER_POSTS = 'LOAD_USER_POSTS';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const USER_CHECKED = 'USER_CHECKED';
export const LOGOUT = 'LOGOUT';

export const loadUser = action(LOAD_USER, payload<User>());
export const login = action(LOGIN, payload<{ user: User; token: string }>());
export const loadUserPosts = action(
  LOAD_USER_POSTS,
  payload<{ page: number; self?: boolean; posts: Post[] }>()
);
export const followUser = action(FOLLOW_USER, payload<string>());
export const unfollowUser = action(UNFOLLOW_USER, payload<string>());
export const userChecked = action(USER_CHECKED);
export const logout = action(LOGOUT);

export type UserActionType =
  | ReturnType<typeof loadUser>
  | ReturnType<typeof login>
  | ReturnType<typeof loadUserPosts>
  | ReturnType<typeof followUser>
  | ReturnType<typeof unfollowUser>
  | ReturnType<typeof userChecked>
  | ReturnType<typeof logout>;
