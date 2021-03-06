import { loadSavedPosts, IFetchSavedPostsPayload } from './saved-posts.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';

function* fetchSavedPostsAsync ({
  payload: { data: { page } }
}: {
  payload: IFetchSavedPostsPayload;
}){
  const res = yield getFetchInstance().get(`/users/self/saved?page=${page}`);
  const { posts } = getDataFromResponse(res);
  yield put(
    loadSavedPosts({
      posts,
      page
    })
  );
}

function* watchFetchSavedPosts (){
  yield takeLatest(
    createFetchSagaPattern('SAVED_POSTS'),
    createFetchFunction('SAVED_POSTS', fetchSavedPostsAsync)
  );
}

export default function* savedPostsSagas (){
  yield all([ call(watchFetchSavedPosts) ]);
}
