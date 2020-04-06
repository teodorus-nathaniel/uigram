import { put } from 'redux-saga/effects';
import { dummyArrayComments } from './../../dummy-datas/dummy-datas';
import { IFetchCommentsPayload, loadComments } from './comments.actions';
import { takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* fetchCommentsAsync ({
  payload: { data: { page, limit, postId } }
}: {
  payload: IFetchCommentsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(loadComments(dummyArrayComments(0)));
}

function* watchFetchComments (){
  yield takeLatest(
    createFetchSagaPattern('COMMENTS'),
    createFetchFunction('COMMENTS', fetchCommentsAsync)
  );
}

export function* commentsSagas (){
  yield all([ call(watchFetchComments) ]);
}
