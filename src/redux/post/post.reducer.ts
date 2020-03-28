import { Post } from './../../@types/post.interfaces';
import { CHANGE_LIKES_OR_DISLIKES } from './../global-post-actions/global-post-actions';
import {
  PostActionType,
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
  exploreSort?: string;
  feeds: Post[];
}

const INITIAL_STATE: IState = {
  explore: [],
  feeds: []
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
    case LOAD_FEEDS_POSTS:
      return {
        ...state,
        feeds: action.payload
      };
    case LOAD_EXPLORE_POSTS:
      return {
        ...state,
        exploreSort: action.payload.sort,
        explore: action.payload.posts
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
