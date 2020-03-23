import { call, all, takeLatest, put } from 'redux-saga/effects';
import { FETCH_USER, IFetchUserPayload, loadUser } from './user.actions';
import catchAsync from '../utils/catch-async';
import { dummyUser } from '../../dummy-datas/dummy-datas';

function* fetchUserAsync ({ payload: { id } }: { payload: IFetchUserPayload }){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  dummyUser.id = id;
  yield put(loadUser(dummyUser));
}

function* watchFetchUser (){
  // TODO: ERROR HANDLING
  yield takeLatest(FETCH_USER, catchAsync(fetchUserAsync, () => {}));
}

export default function* userSagas (){
  yield all([ call(watchFetchUser) ]);
}
