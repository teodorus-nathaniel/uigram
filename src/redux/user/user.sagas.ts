import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import { call, all, takeLatest, put } from 'redux-saga/effects';
import {
  IFetchUserPayload,
  loadUser,
  ILoginPayload,
  login,
  IRegisterPayload,
  IFetchUserPostsPayload,
  loadUserPosts
} from './user.actions';
import catchAsync from '../utils/catch-async';
import { dummyUser } from '../../dummy-datas/dummy-datas';
import { fetchApiFail, fetchApiSuccess } from '../fetch/fetch.actions';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from './../utils/fetch';
import checkResponseStatus from '../utils/check-response-status';

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

function* loginAsync ({ payload: { data, name } }: { payload: ILoginPayload }){
  const res = yield getFetchInstance().post('/login', data);
  if (checkResponseStatus(res)) {
    const { data } = res.data;
    yield put(fetchApiSuccess(name));
    yield put(login(data));
  } else {
    throw new Error(res.data.message);
  }
}

function* registerAsync ({
  payload: { data, name }
}: {
  payload: IRegisterPayload;
}){
  const res = yield getFetchInstance().post('/register', data);
  if (checkResponseStatus(res)) {
    const { data } = res.data;
    yield put(fetchApiSuccess(name));
    yield put(login(data));
  }
}

function* fetchUserPostsAsync ({
  payload: { name, data: { id, page, self } }
}: {
  payload: IFetchUserPostsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  yield put(fetchApiSuccess(name));
  yield put(
    loadUserPosts({
      page,
      posts: dummyArrayPost(page),
      self
    })
  );
}

function* watchFetchUser (){
  yield takeLatest(
    createFetchSagaPattern('USER'),
    catchAsync('USER', fetchUserAsync, fetchApiFail)
  );
}

function* watchLogin (){
  yield takeLatest(
    createFetchSagaPattern('LOGIN'),
    catchAsync('LOGIN', loginAsync, fetchApiFail)
  );
}

function* watchRegister (){
  yield takeLatest(
    createFetchSagaPattern('REGISTER'),
    catchAsync('REGISTER', registerAsync, fetchApiFail)
  );
}

function* watchFetchUserPosts (){
  yield takeLatest(
    createFetchSagaPattern('FETCH_USER_POSTS'),
    catchAsync('FETCH_USER_POSTS', fetchUserPostsAsync, fetchApiFail)
  );
}

export default function* userSagas (){
  yield all([
    call(watchFetchUser),
    call(watchLogin),
    call(watchRegister),
    call(watchFetchUserPosts)
  ]);
}
