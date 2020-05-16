import { Post } from './../../@types/post.interfaces';
import { CHANGE_LIKES_OR_DISLIKES } from './../global-post-actions/global-post-actions';
import {
  PostActionType,
  LOAD_FEEDS_POSTS,
  LOAD_EXPLORE_POSTS,
  CLEAR_EXPLORE_POSTS
} from './post.actions';
import {
  GlobalPostActionType,
  CHANGE_SAVED
} from '../global-post-actions/global-post-actions';
import {
  changePostLikesOrDislikes,
  changePostSaved
} from '../global-post-actions/global-post-reducer-helper';
import { FOLLOW_USER, UNFOLLOW_USER } from '../user/user.actions';

interface IState {
  explore: { posts: Post[]; page: number; sort?: string };
  feeds: { posts: Post[]; page: number };
}

const INITIAL_STATE: IState = {
  explore: { posts: [], page: 0 },
  feeds: { posts: [], page: 0 }
};

export default function postReducer (
  state: IState = INITIAL_STATE,
  action: PostActionType | GlobalPostActionType
): IState{
  function updateExploreAndFeeds (operationCb: (item: Post) => Post): IState{
    return {
      ...state,
      explore: {
        ...state.explore,
        posts: state.explore.posts.map((post) => {
          let newPost = { ...post };
          return operationCb(newPost);
        })
      },
      feeds: {
        ...state.feeds,
        posts: state.feeds.posts.map((post) => {
          let newPost = { ...post };
          return operationCb(newPost);
        })
      }
    };
  }

  switch (action.type) {
    case LOAD_FEEDS_POSTS:
      const newFeeds = action.payload;
      if (action.payload.page > 1)
        newFeeds.posts = [ ...state.feeds.posts, ...newFeeds.posts ];

      return {
        ...state,
        feeds: newFeeds
      };
    case LOAD_EXPLORE_POSTS:
      const newExplore = action.payload;
      if (action.payload.page > 1)
        newExplore.posts = [ ...state.explore.posts, ...newExplore.posts ];

      return {
        ...state,
        explore: newExplore
      };
    case CHANGE_SAVED:
      return updateExploreAndFeeds((item) =>
        changePostSaved(item, action.payload)
      );
    case CHANGE_LIKES_OR_DISLIKES:
      return updateExploreAndFeeds((item) => {
        const { like, dislike } = action.payload;
        return changePostLikesOrDislikes(item, {
          like,
          dislike,
          id: action.payload.id
        });
      });
    case FOLLOW_USER:
      return updateExploreAndFeeds((item) => {
        if (item.owner.id === action.payload) {
          item.owner.followed = true;
        }
        return item;
      });
    case UNFOLLOW_USER:
      return updateExploreAndFeeds((item) => {
        if (item.owner.id === action.payload) {
          item.owner.followed = false;
        }
        return item;
      });
    case CLEAR_EXPLORE_POSTS:
      return {
        ...state,
        explore: {
          posts: [],
          page: 0
        }
      };
    default:
      return state;
  }
}
