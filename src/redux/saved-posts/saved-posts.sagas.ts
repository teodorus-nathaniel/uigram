import { changePostDetailSaved } from './../post-detail/post-detail.actions';
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
import { changeSaved } from '../post/post.actions';

function* fetchSavedPostsAsync (){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(loadSavedPosts(dummyArrayPost.filter((post) => post.saved)));
}

function* addOrRemovePostAsync ({
  payload: { type, post }
}: {
  payload: IAddOrRemovePostPayload;
}){
  // TODO: API CALL, pake type ama id buat remove ato add yang di db
  console.log({ type, post });
  yield put(changeSaved({ id: post.id, saved: type === 'add' }));
  yield put(changePostDetailSaved({ id: post.id, saved: type === 'add' }));

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
