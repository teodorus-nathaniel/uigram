import { call, all, takeLatest, put } from 'redux-saga/effects';
import {
  IFetchUserPayload,
  loadUser,
  ILoginPayload,
  login,
  IRegisterPayload,
  IFetchUserPostsPayload,
  loadUserPosts,
  IFollowUserPayload,
  IUnfollowUserPayload,
  followUser,
  unfollowUser,
  userChecked,
  LOGOUT,
  IUpdateUserPayload,
  loadSelf
} from './user.actions';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from './../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';
import store from '../store';
import { setCookie } from '../utils/cookie';

function* loginUserFromResponse (res: any){
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
  if (self) {
    const { data } = store.getState().user.self;
    if (data) id = data.id;
    else {
      throw new Error('You need to login first!');
    }
  }

  const res = yield getFetchInstance().get(`/users/${id}/posts?page=${page}`);
  const { posts } = getDataFromResponse(res);

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

    yield loginUserFromResponse(res);
  } catch (error) {
    yield setCookie('token', '', -99999);
  } finally {
    yield put(userChecked());
  }
}

function* followUserAsync ({
  payload: { data: { id } }
}: {
  payload: IFollowUserPayload;
}){
  yield getFetchInstance().patch(`/users/${id}/follow`);
  yield put(followUser(id));
}

function* unfollowUserAsync ({
  payload: { data: { id } }
}: {
  payload: IUnfollowUserPayload;
}){
  yield getFetchInstance().patch(`/users/${id}/unfollow`);
  yield put(unfollowUser(id));
}

function* watchFetchUser (){
  yield takeLatest(
    createFetchSagaPattern('USER'),
    createFetchFunction('USER', fetchUserAsync)
  );
}

function* logout (){
  yield setCookie('token', '', -99999);
}

function* updateUserAsync ({
  payload: { data }
}: {
  payload: IUpdateUserPayload;
}){
  const bodyFormData = new FormData();
  if (data.fullname) bodyFormData.set('fullname', data.fullname);
  if (data.username) bodyFormData.set('username', data.username);
  if (data.status) bodyFormData.set('status', data.status);
  if (data.profilePic) bodyFormData.set('profilePic', data.profilePic);
  const res = yield getFetchInstance().patch('/users/self', bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  const { user } = getDataFromResponse(res);
  yield put(loadSelf(user));
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
  yield takeLatest(
    createFetchSagaPattern('CHECK_USER'),
    createFetchFunction('CHECK_USER', checkUserAsync)
  );
}

function* watchFollowUser (){
  yield takeLatest(
    createFetchSagaPattern('FOLLOW_USER'),
    createFetchFunction('FOLLOW_USER', followUserAsync)
  );
}
function* watchUnfollowUser (){
  yield takeLatest(
    createFetchSagaPattern('UNFOLLOW_USER'),
    createFetchFunction('UNFOLLOW_USER', unfollowUserAsync)
  );
}

function* watchLogout (){
  yield takeLatest(LOGOUT, logout);
}

function* watchUpdateUser (){
  yield takeLatest(
    createFetchSagaPattern('UPDATE_USER'),
    createFetchFunction('UPDATE_USER', updateUserAsync)
  );
}

export default function* userSagas (){
  yield all([
    call(watchFetchUser),
    call(watchLogin),
    call(watchRegister),
    call(watchFetchUserPosts),
    call(watchCheckUser),
    call(watchFollowUser),
    call(watchUnfollowUser),
    call(watchLogout),
    call(watchUpdateUser)
  ]);
}
