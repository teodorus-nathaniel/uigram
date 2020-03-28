import { all, call, takeLatest, put } from 'redux-saga/effects';
import {
  IChangeLikesOrDislikesPayload,
  changeLikesOrDislikes,
  IChangeSavedPayload,
  changeSaved
} from './global-post-actions';
import catchAsync from '../utils/catch-async';
import { fetchApiFail, fetchApiSuccess } from '../fetch/fetch.actions';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* updateLikesOrDislikesAsync ({
  payload: { name, data: { like, dislike, id } }
}: {
  payload: IChangeLikesOrDislikesPayload;
}){
  // TODO: API CALL
  // TODO: INI KALO DAPET DATA YANG BARU DARI BACKEND, PAYLOAD CHANGELIKED GANTI JADI POST ITU
  yield put(fetchApiSuccess(name));
  yield put(changeLikesOrDislikes({ like, dislike, id }));
}

function* changeSavedAsync ({
  payload: { name, data }
}: {
  payload: IChangeSavedPayload;
}){
  // TODO: API CALL, pake type ama id buat remove ato add yang di db
  const { post, saved } = data;
  console.log({ saved, post });
  yield put(fetchApiSuccess(name));
  yield put(changeSaved(data));
}

function* watchUpdateLikesOrDislikes (){
  yield takeLatest(
    createFetchSagaPattern('CHANGE_LIKES_OR_DISLIKES'),
    catchAsync(
      'CHANGE_LIKES_OR_DISLIKES',
      updateLikesOrDislikesAsync,
      fetchApiFail
    )
  );
}

function* watchAddOrRemoveSavedPost (){
  yield takeLatest(
    createFetchSagaPattern('CHANGE_SAVED'),
    catchAsync('CHANGE_SAVED', changeSavedAsync, fetchApiFail)
  );
}

export default function* globalPostSagas (){
  yield all([
    call(watchUpdateLikesOrDislikes),
    call(watchAddOrRemoveSavedPost)
  ]);
}
