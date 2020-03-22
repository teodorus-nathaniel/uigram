import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  loadExplorePosts,
  fetchPostFailure,
  IFetchPostsPayload,
  loadFeedsPosts
} from './post.actions';
import { dummyArrayPost } from '../../dummy-datas/dummy-datas';
import { FETCH_POSTS } from './post.actions';
import catchAsync from '../utils/catch-async';

function* fetchExplorePosts (sort: string = 'date'){
  console.log({ sort });
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(loadExplorePosts(dummyArrayPost));
}
function* fetchFeedsPosts (){
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(loadFeedsPosts(dummyArrayPost));
}

function* fetchPosts ({
  payload: { type, sort }
}: {
  payload: IFetchPostsPayload;
}){
  switch (type) {
    case 'explore':
      yield fetchExplorePosts(sort);
      break;
    case 'feeds':
      yield fetchFeedsPosts();
      break;
  }
}

function* watchFetchFeeds (){
  yield takeLatest(FETCH_POSTS, catchAsync(fetchPosts, fetchPostFailure));
}

export function* postSagas (){
  yield all([ call(watchFetchFeeds) ]);
}
