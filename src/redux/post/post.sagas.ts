import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  loadExplorePosts,
  loadFeedsPosts,
  IFetchExplorePayload,
  IFetchFeedsPayload
} from './post.actions';
import { dummyArrayPost } from '../../dummy-datas/dummy-datas';
import catchAsync from '../utils/catch-async';
import { fetchApiFail, fetchApiSuccess } from '../fetch/fetch.actions';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* fetchExplorePosts ({
  payload: { name, data: { sort } }
}: {
  payload: IFetchExplorePayload;
}){
  console.log({ sort });
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(loadExplorePosts({ sort, posts: dummyArrayPost }));
}

function* fetchFeedsPosts ({
  payload: { name }
}: {
  payload: IFetchFeedsPayload;
}){
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(loadFeedsPosts(dummyArrayPost));
}

function* watchFetchFeeds (){
  yield takeLatest(
    createFetchSagaPattern('FEEDS'),
    catchAsync('FEEDS', fetchFeedsPosts, fetchApiFail)
  );
}

function* watchFetchExplore (){
  yield takeLatest(
    createFetchSagaPattern('EXPLORE'),
    catchAsync('EXPLORE', fetchExplorePosts, fetchApiFail)
  );
}

export function* postSagas (){
  yield all([ call(watchFetchFeeds), call(watchFetchExplore) ]);
}
