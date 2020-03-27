import { combineReducers } from 'redux';
import postReducer from './post/post.reducer';
import savedPostsReducer from './saved-posts/saved-posts.reducer';
import colorModeReducer from './color-mode/color-mode.reducer';
import postDetailReducer from './post-detail/post-detail.reducer';
import commentsReducer from './comments/comments.reducer';
import userReducer from './user/user.reducer';
import fetchReducer from './fetch/fetch.reducer';

const reducers = {
  fetchController: fetchReducer,
  post: postReducer,
  savedPosts: savedPostsReducer,
  colorMode: colorModeReducer,
  postDetail: postDetailReducer,
  comments: commentsReducer,
  user: userReducer
};

const rootReducer = combineReducers(reducers);

export type GlobalState = ReturnType<typeof rootReducer>;
export default rootReducer;
