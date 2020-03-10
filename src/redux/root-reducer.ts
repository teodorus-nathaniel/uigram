import { combineReducers } from 'redux';
import postReducer from './post/post.reducer';
import savedPostsReducer from './saved-posts/saved-posts.reducer';
import colorModeReducer from './color-mode/color-mode.reducer';

const reducers = {
	post: postReducer,
	savedPosts: savedPostsReducer,
	colorMode: colorModeReducer
};

const rootReducer = combineReducers(reducers);

export type GlobalState = ReturnType<typeof rootReducer>;
export default rootReducer;
