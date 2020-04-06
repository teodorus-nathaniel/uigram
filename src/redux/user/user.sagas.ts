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
import createFetchFunction from '../utils/create-fetch-func';
import { dummyUser } from '../../dummy-datas/dummy-datas';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from './../utils/fetch';
import checkResponseStatus from '../utils/check-response-status';

function* fetchUserAsync ({
  payload: { data: { id } }
}: {
  payload: IFetchUserPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  dummyUser.id = id;
  yield put(loadUser(dummyUser));
}

function* loginAsync ({ payload: { data } }: { payload: ILoginPayload }){
  const res = yield getFetchInstance().post('/login', data);
  if (checkResponseStatus(res)) {
    const { data } = res.data;
    yield put(login(data));
  } else {
    throw new Error(res.data.message);
  }
}

function* registerAsync ({ payload: { data } }: { payload: IRegisterPayload }){
  const res = yield getFetchInstance().post('/register', data);
  if (checkResponseStatus(res)) {
    const { data } = res.data;
    yield put(login(data));
  }
}

function* fetchUserPostsAsync ({
  payload: { data: { id, page, self } }
}: {
  payload: IFetchUserPostsPayload;
}){
  // TODO: API CALL
  yield new Promise((resolve) => setTimeout(resolve, 2000));
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
    createFetchFunction('USER', fetchUserAsync)
  );
}

function* watchLogin (){
  yield takeLatest(
    createFetchSagaPattern('LOGIN'),
    createFetchFunction('LOGIN', loginAsync)
  );
}

function* watchRegister (){
  yield takeLatest(
    createFetchSagaPattern('REGISTER'),
    createFetchFunction('REGISTER', registerAsync)
  );
}

function* watchFetchUserPosts (){
  yield takeLatest(
    createFetchSagaPattern('FETCH_USER_POSTS'),
    createFetchFunction('FETCH_USER_POSTS', fetchUserPostsAsync)
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
