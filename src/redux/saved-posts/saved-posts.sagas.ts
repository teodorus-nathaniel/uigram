import { fetchApiFail, fetchApiSuccess } from './../fetch/fetch.actions';
import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import { loadSavedPosts, IFetchSavedPostsPayload } from './saved-posts.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* fetchSavedPostsAsync ({
  payload: { name, data: { page } }
}: {
  payload: IFetchSavedPostsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(
    loadSavedPosts({
      posts: dummyArrayPost(0).filter((post) => post.saved),
      page
    })
  );
}

function* watchFetchSavedPosts (){
  yield takeLatest(
    createFetchSagaPattern('SAVED_POSTS'),
    catchAsync('SAVED_POSTS', fetchSavedPostsAsync, fetchApiFail)
  );
}

export default function* savedPostsSagas (){
  yield all([ call(watchFetchSavedPosts) ]);
}
