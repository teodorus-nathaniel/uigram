import { all, call, takeLatest, put } from 'redux-saga/effects';
import {
  IChangeLikesOrDislikesPayload,
  changeLikesOrDislikes,
  IChangeSavedPayload,
  changeSaved
} from './global-post-actions';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';

function* updateLikesOrDislikesAsync ({
  payload: { name, data: { like, dislike, id } }
}: {
  payload: IChangeLikesOrDislikesPayload;
}){
  // TODO: API CALL
  // TODO: INI KALO DAPET DATA YANG BARU DARI BACKEND, PAYLOAD CHANGELIKED GANTI JADI POST ITU
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
  yield put(changeSaved(data));
}

function* watchUpdateLikesOrDislikes (){
  yield takeLatest(
    createFetchSagaPattern('CHANGE_LIKES_OR_DISLIKES'),
    createFetchFunction('CHANGE_LIKES_OR_DISLIKES', updateLikesOrDislikesAsync)
  );
}

function* watchAddOrRemoveSavedPost (){
  yield takeLatest(
    createFetchSagaPattern('CHANGE_SAVED'),
    createFetchFunction('CHANGE_SAVED', changeSavedAsync)
  );
}

export default function* globalPostSagas (){
  yield all([
    call(watchUpdateLikesOrDislikes),
    call(watchAddOrRemoveSavedPost)
  ]);
}
