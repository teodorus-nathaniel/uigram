import { fetchApiFail, fetchApiSuccess } from './../fetch/fetch.actions';
import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import { loadSavedPosts, IFetchSavedPostsPayload } from './saved-posts.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';

function* fetchSavedPostsAsync ({
  payload: { name }
}: {
  payload: IFetchSavedPostsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(loadSavedPosts(dummyArrayPost.filter((post) => post.saved)));
}

function* watchFetchSavedPosts (){
  yield takeLatest(
    (action: any) => action.payload.name === 'SAVED_POSTS',
    catchAsync('SAVED_POSTS', fetchSavedPostsAsync, fetchApiFail)
  );
}

export default function* savedPostsSagas (){
  yield all([ call(watchFetchSavedPosts) ]);
}
