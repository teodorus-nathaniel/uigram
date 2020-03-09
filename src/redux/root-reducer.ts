import { combineReducers } from 'redux';
import postReducer from './post/post.reducer';

const reducers = {
	post: postReducer
};

const rootReducer = combineReducers(reducers);

export type GlobalState = ReturnType<typeof rootReducer>;
export default rootReducer;
