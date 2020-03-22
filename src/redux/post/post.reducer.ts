import { Post } from './../../@types/post.interfaces';
import { CHANGE_LIKES_OR_DISLIKES } from './../global-post-actions/global-post-actions';
import {
  PostActionType,
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  LOAD_FEEDS_POSTS,
  LOAD_EXPLORE_POSTS
} from './post.actions';
import {
  GlobalPostActionType,
  CHANGE_SAVED
} from '../global-post-actions/global-post-actions';
import {
  changePostLikesOrDislikes,
  changePostSaved
} from '../global-post-actions/global-post-reducer-helper';

interface IState {
  explore: Post[];
  feeds: Post[];
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE = {
  explore: [],
  feeds: [],
  isFetching: false,
  error: null
};

export default function postReducer (
  state: IState = INITIAL_STATE,
  action: PostActionType | GlobalPostActionType
): IState{
  function updateExploreAndFeeds (operationCb: (item: Post) => Post){
    return {
      ...state,
      explore: state.explore.map((post) => {
        return operationCb(post);
      }),
      feeds: state.feeds.map((post) => {
        return operationCb(post);
      })
    };
  }

  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case LOAD_FEEDS_POSTS:
      return {
        ...state,
        feeds: action.payload,
        isFetching: false,
        error: null
      };
    case LOAD_EXPLORE_POSTS:
      return {
        ...state,
        explore: action.payload,
        isFetching: false,
        error: null
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
    default:
      return state;
  }
}
