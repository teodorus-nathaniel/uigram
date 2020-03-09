import { action, payload } from 'ts-action';
import { Post } from '../../@types/post.interfaces';
import { IFetchStart, IFetchFailure } from '../utilities.interfaces';

export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const fetchPostFailure = action(FETCH_POST_FAILURE, payload<Error>());

export const FETCH_FEEDS_POSTS = 'FETCH_FEEDS_POSTS';
export const fetchFeedsPosts = action(FETCH_FEEDS_POSTS);
export const FETCH_EXPLORE_POSTS = 'FETCH_EXPLORE_POSTS';
export const fetchExplorePosts = action(FETCH_EXPLORE_POSTS);

export const LOAD_POSTS = 'LOAD_POSTS';
export const loadPosts = action(LOAD_POSTS, payload<Post[]>());
interface ILoadAllPosts {
	type: typeof LOAD_POSTS;
	payload: Post[];
}

export const LOAD_POST = 'LOAD_POST';
export const loadPost = action(LOAD_POST, payload<Post>());
export interface ILoadPost {
	type: typeof LOAD_POST;
	payload: Post;
}

type PostActionType =
	| ILoadAllPosts
	| ILoadPost
	| IFetchStart<typeof FETCH_EXPLORE_POSTS>
	| IFetchStart<typeof FETCH_FEEDS_POSTS>
	| IFetchFailure<typeof FETCH_POST_FAILURE>;

export default PostActionType;
