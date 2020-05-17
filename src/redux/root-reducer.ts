import { combineReducers } from 'redux';
import postReducer from './post/post.reducer';
import savedPostsReducer from './saved-posts/saved-posts.reducer';
import colorModeReducer from './color-mode/color-mode.reducer';
import postDetailReducer from './post-detail/post-detail.reducer';
import commentsReducer from './comments/comments.reducer';
import userReducer from './user/user.reducer';
import fetchReducer from './fetch/fetch.reducer';
import addPostReducer from './add-post/add-post.reducer';
import { LOGOUT } from './user/user.actions';

const reducers = {
  fetchController: fetchReducer,
  post: postReducer,
  savedPosts: savedPostsReducer,
  colorMode: colorModeReducer,
  postDetail: postDetailReducer,
  comments: commentsReducer,
  user: userReducer,
  addPost: addPostReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    state = { user: state.user };
  }

  return appReducer(state, action);
};

export type GlobalState = ReturnType<typeof appReducer>;
export default rootReducer;
