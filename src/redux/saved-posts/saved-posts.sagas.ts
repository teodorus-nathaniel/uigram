import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import { loadSavedPosts, IFetchSavedPostsPayload } from './saved-posts.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* fetchSavedPostsAsync ({
  payload: { data: { page } }
}: {
  payload: IFetchSavedPostsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
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
    createFetchFunction('SAVED_POSTS', fetchSavedPostsAsync)
  );
}

export default function* savedPostsSagas (){
  yield all([ call(watchFetchSavedPosts) ]);
}
