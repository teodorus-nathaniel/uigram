import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  loadExplorePosts,
  fetchPostFailure,
  IFetchPostsPayload,
  loadFeedsPosts,
  changeLikesOrDislikes
} from './post.actions';
import { dummyArrayPost } from '../../dummy-datas/dummy-datas';
import {
  FETCH_POSTS,
  UPDATE_LIKES_OR_DISLIKES,
  IChangeLikesOrDislikesPayload
} from './post.actions';
import catchAsync from '../utils/catch-async';
import { changeLikesOrDislikesSavedPosts } from '../saved-posts/saved-posts.actions';

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

function* updateLikesOrDislikes ({
  payload: { like, dislike, id }
}: {
  payload: IChangeLikesOrDislikesPayload;
}){
  // TODO: API CALL
  yield put(changeLikesOrDislikes({ like, dislike, id }));
  yield put(changeLikesOrDislikesSavedPosts({ like, dislike, id }));
}

function* watchFetchFeeds (){
  yield takeLatest(FETCH_POSTS, catchAsync(fetchPosts, fetchPostFailure));
}

function* watchUpdateLikesOrDislikes (){
  yield takeLatest(
    UPDATE_LIKES_OR_DISLIKES,
    // TODO: ERROR HANDLING
    catchAsync(updateLikesOrDislikes, function (err){})
  );
}

export function* postSagas (){
  yield all([ call(watchFetchFeeds), call(watchUpdateLikesOrDislikes) ]);
}
