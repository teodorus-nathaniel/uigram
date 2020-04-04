import { Post } from './../../@types/post.interfaces';
import { User } from '../../@types/user.interfaces';
import {
  UserActionType,
  LOAD_USER,
  LOGIN,
  LOAD_USER_POSTS
} from './user.actions';

interface IState {
  self: {
    data: User | null;
    posts: { data: Post[]; page: number };
  };
  user: {
    data: User | null;
    posts: { data: Post[]; page: number };
  };
  token: string;
}

const INITIAL_STATE: IState = {
  self: { data: null, posts: { data: [], page: 0 } },
  user: { data: null, posts: { data: [], page: 0 } },
  token: ''
};

export default function userReducer (
  state: IState = INITIAL_STATE,
  action: UserActionType
): IState{
  switch (action.type) {
    case LOAD_USER_POSTS:
      const modify = action.payload.self ? 'self' : 'user';
      const newPosts =
        action.payload.page === 1
          ? action.payload.posts
          : [ ...state[modify].posts.data, ...action.payload.posts ];

      return {
        ...state,
        [modify]: {
          ...state[modify],
          posts: {
            ...state[modify].posts,
            data: newPosts,
            page: action.payload.page
          }
        }
      };
    case LOAD_USER:
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload
        }
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        self: {
          ...state.self,
          data: action.payload.user
        }
      };
    default:
      return state;
  }
}
