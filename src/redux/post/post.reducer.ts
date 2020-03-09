import { Post } from '../../@types/post.interfaces';
import PostActionType from './post.actions';

interface IState {
	posts: Post[];
	post: Post | null;
	isFetching: boolean;
	error: Error | null;
}

const INITIAL_STATE = {
	posts: [],
	post: null,
	isFetching: false,
	error: null
};

export default function postReducer(
	state: IState = INITIAL_STATE,
	action: PostActionType
): IState {
	switch (action.type) {
		case 'FETCH_FEEDS_POSTS':
		case 'FETCH_EXPLORE_POSTS':
			return {
				...state,
				isFetching: true
			};
		case 'FETCH_POST_FAILURE':
			return {
				...state,
				isFetching: false,
				error: action.payload
			};
		case 'LOAD_POSTS':
			return {
				...state,
				posts: action.payload,
				isFetching: false
			};
		case 'LOAD_POST':
			return {
				...state,
				post: action.payload
			};
		default:
			return state;
	}
}
