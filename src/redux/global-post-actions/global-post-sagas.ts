import { all, call, takeLatest, put } from 'redux-saga/effects';
import {
  IChangeLikesOrDislikesPayload,
  changeLikesOrDislikes,
  IChangeSavedPayload,
  changeSaved
} from './global-post-actions';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';

function* updateLikesOrDislikesAsync ({
  payload: { data: { like, dislike, id } }
}: {
  payload: IChangeLikesOrDislikesPayload;
}){
  yield getFetchInstance().patch(`/posts/${id}/likes`, {
    like,
    dislike
  });

  yield put(changeLikesOrDislikes({ like, dislike, id }));
}

function* changeSavedAsync ({
  payload: { data }
}: {
  payload: IChangeSavedPayload;
}){
  const { post, saved } = data;

  let res;
  if (saved) {
    res = yield getFetchInstance().patch('/users/self/add-saved', {
      id: post.id
    });
  } else {
    res = yield getFetchInstance().patch('/users/self/delete-saved', {
      id: post.id
    });
  }

  const { modifiedCount } = getDataFromResponse(res);
  if (modifiedCount <= 0) {
    console.log('saved post not updated');
    return;
  }

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
