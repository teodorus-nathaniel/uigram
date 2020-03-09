import { takeLatest, put, all, call } from 'redux-saga/effects';
import { loadPosts, fetchPostFailure } from './post.actions';
import { dummyArrayPost } from '../../dummy-datas/dummy-datas';
import { FETCH_FEEDS_POSTS, FETCH_EXPLORE_POSTS } from './post.actions';

function* fetchExplorePostsAsync() {
	try {
		yield new Promise((resolve) => setTimeout(resolve, 2000));
		yield put(loadPosts(dummyArrayPost));
	} catch (error) {
		yield put(fetchPostFailure(error));
	}
}
function* fetchFeedsPostsAsync() {
	try {
		yield new Promise((resolve) => setTimeout(resolve, 2000));
		yield put(loadPosts(dummyArrayPost));
	} catch (error) {
		yield put(fetchPostFailure(error));
	}
}

function* watchFetchFeedsPosts() {
	yield takeLatest(FETCH_FEEDS_POSTS, fetchExplorePostsAsync);
}
function* watchFetchExplorePosts() {
	yield takeLatest(FETCH_EXPLORE_POSTS, fetchFeedsPostsAsync);
}

export function* postSagas() {
	yield all([ call(watchFetchExplorePosts), call(watchFetchFeedsPosts) ]);
}
