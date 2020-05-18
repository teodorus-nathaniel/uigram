import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  loadExplorePosts,
  loadFeedsPosts,
  IFetchExplorePayload,
  IFetchFeedsPayload
} from './post.actions';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';

function* fetchExplorePosts ({
  payload: { data: { sort, page } }
}: {
  payload: IFetchExplorePayload;
}){
  const res = yield getFetchInstance().get(`/posts?sort=${sort}&page=${page}`);
  const { posts } = getDataFromResponse(res);

  yield put(
    loadExplorePosts({
      sort,
      posts: posts,
      page
    })
  );
}

function* fetchFeedsPosts ({
  payload: { data: { page } }
}: {
  payload: IFetchFeedsPayload;
}){
  const res = yield getFetchInstance().get(`/posts/self/feeds?page=${page}`);
  const { posts } = getDataFromResponse(res);

  yield put(
    loadFeedsPosts({
      posts: posts,
      page
    })
  );
}

function* watchFetchFeeds (){
  yield takeLatest(
    createFetchSagaPattern('FEEDS'),
    createFetchFunction('FEEDS', fetchFeedsPosts)
  );
}

function* watchFetchExplore (){
  yield takeLatest(
    createFetchSagaPattern('EXPLORE'),
    createFetchFunction('EXPLORE', fetchExplorePosts)
  );
}

export function* postSagas (){
  yield all([ call(watchFetchFeeds), call(watchFetchExplore) ]);
}
