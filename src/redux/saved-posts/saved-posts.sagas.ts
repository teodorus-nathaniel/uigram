import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import {
  FETCH_SAVED_POSTS,
  savedPostFailure,
  loadSavedPosts
} from './saved-posts.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';

function* fetchSavedPostsAsync (){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(loadSavedPosts(dummyArrayPost.filter((post) => post.saved)));
}

function* watchFetchSavedPosts (){
  yield takeLatest(
    FETCH_SAVED_POSTS,
    catchAsync(fetchSavedPostsAsync, savedPostFailure)
  );
}

export default function* savedPostsSagas (){
  yield all([ call(watchFetchSavedPosts) ]);
}
