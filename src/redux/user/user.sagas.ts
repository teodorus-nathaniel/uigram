import { dummyArrayPost } from './../../dummy-datas/dummy-datas';
import { call, all, takeLatest, put } from 'redux-saga/effects';
import {
  IFetchUserPayload,
  loadUser,
  ILoginPayload,
  login,
  IRegisterPayload,
  IFetchUserPostsPayload,
  loadUserPosts,
  CHECK_USER
} from './user.actions';
import createFetchFunction from '../utils/create-fetch-func';
import { dummyUser } from '../../dummy-datas/dummy-datas';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from './../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';
import store from '../store';
import { setCookie } from '../utils/cookie';

function* loginUserFromResponse (res: any){
  console.log(res);
  const { user, token } = getDataFromResponse(res);
  setCookie('token', token, 7);
  yield put(
    login({
      user,
      token
    })
  );
}

function* fetchUserAsync ({
  payload: { data: { id } }
}: {
  payload: IFetchUserPayload;
}){
  // yield new Promise((resolve) => setTimeout(resolve, 2000));
  // dummyUser.id = id;
  // yield put(loadUser(dummyUser));

  const res = yield getFetchInstance().get(`/users/${id}`);
  const { user } = getDataFromResponse(res);
  yield put(loadUser(user));
}

function* loginAsync ({ payload: { data } }: { payload: ILoginPayload }){
  const res = yield getFetchInstance().post('/login', data);
  yield loginUserFromResponse(res);
}

function* registerAsync ({ payload: { data } }: { payload: IRegisterPayload }){
  const res = yield getFetchInstance().post('/register', data);
  yield loginUserFromResponse(res);
}

function* fetchUserPostsAsync ({
  payload: { data: { id, page, self } }
}: {
  payload: IFetchUserPostsPayload;
}){
  // yield new Promise((resolve) => setTimeout(resolve, 2000));
  // yield put(
  //   loadUserPosts({
  //     page,
  //     posts: dummyArrayPost(page),
  //     self
  //   })
  // );
  if (self) {
    const { data } = store.getState().user.self;
    if (data) id = data.id;
    else {
      throw new Error('You need to login first!');
    }
  }

  const res = yield getFetchInstance().get(`/users/${id}/posts?page=${page}`);
  const { posts } = getDataFromResponse(res);
  console.log(posts);

  yield put(
    loadUserPosts({
      page,
      posts,
      self
    })
  );
}

function* checkUserAsync (){
  try {
    const { token } = yield store.getState().user;
    if (token === '') return;
    const res = yield getFetchInstance().post('/check-user', {
      token
    });
    console.log(res);

    yield loginUserFromResponse(res);
  } catch (error) {
    yield setCookie('token', '', -10);
    console.log(error);
  }
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

function* watchCheckUser (){
  yield takeLatest(CHECK_USER, checkUserAsync);
}

export default function* userSagas (){
  yield all([
    call(watchFetchUser),
    call(watchLogin),
    call(watchRegister),
    call(watchFetchUserPosts),
    call(watchCheckUser)
  ]);
}
