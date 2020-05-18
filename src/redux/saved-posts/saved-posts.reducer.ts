import { Post } from './../../@types/post.interfaces';
import { SavedPostsActionType, LOAD_SAVED_POSTS } from './saved-posts.actions';
import {
  GlobalPostActionType,
  CHANGE_SAVED,
  CHANGE_LIKES_OR_DISLIKES
} from '../global-post-actions/global-post-actions';
import { changePostLikesOrDislikes } from '../global-post-actions/global-post-reducer-helper';
import { ADD_NEW_COMMENT, ADD_NEW_REPLY } from '../comments/comments.actions';

interface IState {
  savedPosts: {
    posts: Post[];
    page: number;
  };
}

const INITIAL_STATE: IState = {
  savedPosts: { posts: [], page: 0 }
};

export default function savedPostsReducer (
  state: IState = INITIAL_STATE,
  action: SavedPostsActionType | GlobalPostActionType
): IState{
  switch (action.type) {
    case LOAD_SAVED_POSTS:
      let newSaved = action.payload;
      if (action.payload.page > 1) {
        newSaved.posts = [ ...state.savedPosts.posts, ...newSaved.posts ];
      }
      return {
        ...state,
        savedPosts: newSaved
      };
    case CHANGE_SAVED:
      const { saved, post } = action.payload;
      let newSavedPosts = [ ...state.savedPosts.posts ];
      if (saved) {
        newSavedPosts.push(post);
      } else {
        newSavedPosts = newSavedPosts.filter((el) => el.id !== post.id);
      }
      return {
        ...state,
        savedPosts: { ...state.savedPosts, posts: newSavedPosts }
      };
    case CHANGE_LIKES_OR_DISLIKES:
      const newPosts = state.savedPosts.posts.map((post) => {
        return changePostLikesOrDislikes(post, action.payload);
      });
      return {
        ...state,
        savedPosts: { ...state.savedPosts, posts: newPosts }
      };
    case ADD_NEW_REPLY:
    case ADD_NEW_COMMENT:
      const newPostsComments = state.savedPosts.posts.map((post) => {
        if (post.id === action.payload.postId)
          return { ...post, commentsCount: post.commentsCount + 1 };
        return post;
      });

      return {
        ...state,
        savedPosts: { ...state.savedPosts, posts: newPostsComments }
      };
    default:
      return state;
  }
}
