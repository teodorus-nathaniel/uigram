import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  loadExplorePosts,
  IFetchPostsPayload,
  loadFeedsPosts
} from './post.actions';
import { dummyArrayPost } from '../../dummy-datas/dummy-datas';
import catchAsync from '../utils/catch-async';
import {
  fetchApiFail,
  IFetchApiNames,
  fetchApiSuccess
} from '../fetch/fetch.actions';

function* fetchExplorePosts (name: IFetchApiNames, sort: string = 'date'){
  console.log({ sort });
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(loadExplorePosts(dummyArrayPost));
}
function* fetchFeedsPosts (name: IFetchApiNames){
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(loadFeedsPosts(dummyArrayPost));
}

function* fetchPosts ({
  payload: { name, data: { type, sort } }
}: {
  payload: IFetchPostsPayload;
}){
  console.log({ type, sort });
  switch (type) {
    case 'explore':
      yield fetchExplorePosts(name, sort);
      break;
    case 'feeds':
      yield fetchFeedsPosts(name);
      break;
  }
}

function* watchFetchFeeds (){
  yield takeLatest(
    (action: any) => action.payload.name === 'POSTS',
    catchAsync('POSTS', fetchPosts, fetchApiFail)
  );
}

export function* postSagas (){
  yield all([ call(watchFetchFeeds) ]);
}
