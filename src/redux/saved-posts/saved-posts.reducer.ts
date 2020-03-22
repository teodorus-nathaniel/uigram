import { Post } from './../../@types/post.interfaces';
import {
  SavedPostsActionType,
  FETCH_SAVED_POSTS,
  LOAD_SAVED_POSTS,
  SAVED_POST_FAILURE
} from './saved-posts.actions';
import {
  GlobalPostActionType,
  CHANGE_SAVED,
  CHANGE_LIKES_OR_DISLIKES
} from '../global-post-actions/global-post-actions';
import { changePostLikesOrDislikes } from '../global-post-actions/global-post-reducer-helper';

interface IState {
  savedPosts: Post[];
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE: IState = {
  savedPosts: [],
  isFetching: false,
  error: null
};

export default function savedPostsReducer (
  state: IState = INITIAL_STATE,
  action: SavedPostsActionType | GlobalPostActionType
): IState{
  switch (action.type) {
    case FETCH_SAVED_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case LOAD_SAVED_POSTS:
      return {
        ...state,
        savedPosts: action.payload,
        isFetching: false,
        error: null
      };
    case CHANGE_SAVED:
      const { saved, post } = action.payload;
      let newSavedPosts = [ ...state.savedPosts ];
      if (saved) {
        newSavedPosts.push(post);
      } else {
        newSavedPosts = newSavedPosts.filter((el) => el.id !== post.id);
      }
      return {
        ...state,
        savedPosts: newSavedPosts
      };
    case SAVED_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case CHANGE_LIKES_OR_DISLIKES:
      const newPosts = state.savedPosts.map((post) => {
        return changePostLikesOrDislikes(post, action.payload);
      });
      return {
        ...state,
        savedPosts: newPosts
      };
    default:
      return state;
  }
}
