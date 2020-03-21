import { put } from 'redux-saga/effects';
import { dummyArrayComments } from './../../dummy-datas/dummy-datas';
import {
  FETCH_COMMENTS,
  fetchCommentsFailure,
  IFetchCommentsPayload,
  addComments
} from './comments.actions';
import { takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';

function* fetchCommentsAsync ({ page, limit, postId }: IFetchCommentsPayload){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(addComments(dummyArrayComments));
}

function* watchFetchComments (){
  yield takeLatest(
    FETCH_COMMENTS,
    catchAsync(fetchCommentsAsync, fetchCommentsFailure)
  );
}

export function* commentsSagas (){
  yield all([ call(watchFetchComments) ]);
}
