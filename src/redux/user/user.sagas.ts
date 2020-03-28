import { call, all, takeLatest, put } from 'redux-saga/effects';
import { IFetchUserPayload, loadUser } from './user.actions';
import catchAsync from '../utils/catch-async';
import { dummyUser } from '../../dummy-datas/dummy-datas';
import { fetchApiFail, fetchApiSuccess } from '../fetch/fetch.actions';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* fetchUserAsync ({
  payload: { data: { id }, name }
}: {
  payload: IFetchUserPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  dummyUser.id = id;
  yield put(fetchApiSuccess(name));
  yield put(loadUser(dummyUser));
}

function* watchFetchUser (){
  // TODO: ERROR HANDLING
  yield takeLatest(
    createFetchSagaPattern('USER'),
    catchAsync('USER', fetchUserAsync, fetchApiFail)
  );
}

export default function* userSagas (){
  yield all([ call(watchFetchUser) ]);
}
