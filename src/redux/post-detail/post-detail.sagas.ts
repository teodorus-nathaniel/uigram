import { all, takeLatest, put, call } from 'redux-saga/effects';
import createFetchFunction from '../utils/create-fetch-func';
import { loadPostDetail, IFetchPostDetailPayload } from './post-detail.actions';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';

function* fetchPostDetailAsync ({
  payload: { data: { id } }
}: {
  payload: IFetchPostDetailPayload;
}){
  const res = yield getFetchInstance().get(`/posts/${id}`);
  const { post } = getDataFromResponse(res);
  if (!post) throw new Error('Post data not found');

  yield put(loadPostDetail(post));
}

function* watchFetchPostDetail (){
  yield takeLatest(
    createFetchSagaPattern('POST_DETAIL'),
    createFetchFunction('POST_DETAIL', fetchPostDetailAsync)
  );
}

export default function* postDetailSagas (){
  yield all([ call(watchFetchPostDetail) ]);
}
