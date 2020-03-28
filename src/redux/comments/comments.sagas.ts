import { put } from 'redux-saga/effects';
import { dummyArrayComments } from './../../dummy-datas/dummy-datas';
import { IFetchCommentsPayload, addComments } from './comments.actions';
import { takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';
import { fetchApiFail, fetchApiSuccess } from '../fetch/fetch.actions';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* fetchCommentsAsync ({
  payload: { name, data: { page, limit, postId } }
}: {
  payload: IFetchCommentsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(addComments(dummyArrayComments));
}

function* watchFetchComments (){
  yield takeLatest(
    createFetchSagaPattern('COMMENTS'),
    catchAsync('COMMENTS', fetchCommentsAsync, fetchApiFail)
  );
}

export function* commentsSagas (){
  yield all([ call(watchFetchComments) ]);
}
