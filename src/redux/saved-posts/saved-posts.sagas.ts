import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import {
  FETCH_SAVED_POSTS,
  savedPostFailure,
  loadSavedPosts,
  ADD_OR_REMOVE_POST,
  IAddOrRemovePostPayload
} from './saved-posts.actions';
import { all, call, takeLatest, put, takeEvery } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';

function* fetchSavedPostsAsync (){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(loadSavedPosts(dummyArrayPost));
}

function* addOrRemovePostAsync ({ type, post }: IAddOrRemovePostPayload){
  // TODO: API CALL, pake type ama id buat remove ato add yang di db
  yield new Promise((resolve) => setTimeout(resolve, 500));
}

function* watchAddOrRemoveSavedPost (){
  yield takeEvery(
    ADD_OR_REMOVE_POST,
    catchAsync(addOrRemovePostAsync, savedPostFailure)
  );
}

function* watchFetchSavedPosts (){
  yield takeLatest(
    FETCH_SAVED_POSTS,
    catchAsync(fetchSavedPostsAsync, savedPostFailure)
  );
}

export default function* savedPostsSagas (){
  yield all([ call(watchFetchSavedPosts), call(watchAddOrRemoveSavedPost) ]);
}
