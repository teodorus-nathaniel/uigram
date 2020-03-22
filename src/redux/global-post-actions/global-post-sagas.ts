import { all, call, takeLatest, put } from 'redux-saga/effects';
import {
  UPDATE_LIKES_OR_DISLIKES,
  IChangeLikesOrDislikesPayload,
  changeLikesOrDislikes,
  IChangeSavedPayload,
  changeSaved,
  UPDATE_SAVED
} from './global-post-actions';
import catchAsync from '../utils/catch-async';

function* updateLikesOrDislikesAsync ({
  payload: { like, dislike, id }
}: {
  payload: IChangeLikesOrDislikesPayload;
}){
  // TODO: API CALL
  yield put(changeLikesOrDislikes({ like, dislike, id }));
}

function* changeSavedAsync ({ payload }: { payload: IChangeSavedPayload }){
  // TODO: API CALL, pake type ama id buat remove ato add yang di db
  const { post, saved } = payload;
  console.log({ saved, post });
  yield put(changeSaved(payload));
}

function* watchUpdateLikesOrDislikes (){
  yield takeLatest(
    UPDATE_LIKES_OR_DISLIKES,
    // TODO: ERROR HANDLING
    catchAsync(updateLikesOrDislikesAsync, function (err){})
  );
}

function* watchAddOrRemoveSavedPost (){
  yield takeLatest(
    UPDATE_SAVED,
    // TODO: ERROR HANDLING
    catchAsync(changeSavedAsync, function (err){})
  );
}

export default function* globalPostSagas (){
  yield all([
    call(watchUpdateLikesOrDislikes),
    call(watchAddOrRemoveSavedPost)
  ]);
}
