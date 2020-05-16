import { Post } from './../../@types/post.interfaces';
import { User } from '../../@types/user.interfaces';
import {
  UserActionType,
  LOAD_USER,
  LOGIN,
  LOAD_USER_POSTS,
  UNFOLLOW_USER,
  FOLLOW_USER,
  USER_CHECKED
} from './user.actions';
import { getCookie } from '../utils/cookie';

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
  isChecked: boolean;
}

const INITIAL_STATE: IState = {
  self: { data: null, posts: { data: [], page: 0 } },
  user: { data: null, posts: { data: [], page: 0 } },
  token: getCookie('token'),
  isChecked: false
};

export default function userReducer (
  state: IState = INITIAL_STATE,
  action: UserActionType
): IState{
  function updateUser (updateCb: (user: User) => void, attrib: string){
    let target: 'user' | 'self' = 'user';
    if (attrib === 'self') target = 'self';

    if (
      (target === 'self' && !state.self.data) ||
      (target === 'user' && (!state.user.data || attrib !== state.user.data.id))
    ) {
      return state[target];
    }

    let newUser: User | null = null;
    if (state[target] && state[target].data) {
      const user = state[target].data;
      if (user) {
        newUser = { ...user };
        updateCb(newUser);
      }
    }

    return {
      ...state[target],
      data: newUser
    };
  }

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

    case USER_CHECKED:
      return {
        ...state,
        isChecked: true
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

    case UNFOLLOW_USER:
      const newUnfollowSelf = updateUser((user) => {
        user.followingCount -= 1;
      }, 'self');

      const newUnfollowUser = updateUser((user) => {
        user.followersCount -= 1;
        user.followed = false;
      }, action.payload);

      return {
        ...state,
        user: newUnfollowUser,
        self: newUnfollowSelf
      };

    case FOLLOW_USER:
      const newFollowSelf = updateUser((user) => {
        user.followingCount += 1;
      }, 'self');

      const newFollowUser = updateUser((user) => {
        user.followersCount += 1;
        user.followed = true;
      }, action.payload);

      return {
        ...state,
        user: newFollowUser,
        self: newFollowSelf
      };

    default:
      return state;
  }
}
