import { all, takeLatest, put, call } from 'redux-saga/effects';
import catchAsync from '../utils/catch-async';
import { loadPostDetail, IFetchPostDetailPayload } from './post-detail.actions';
import { dummyPostDetail } from '../../dummy-datas/dummy-datas';
import { fetchApiFail, fetchApiSuccess } from '../fetch/fetch.actions';

function* fetchPostDetailAsync ({
  payload: { data: { id }, name }
}: {
  payload: IFetchPostDetailPayload;
}){
  console.log(id);
  yield new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  yield put(fetchApiSuccess(name));
  yield put(loadPostDetail(dummyPostDetail));
}

function* watchFetchPostDetail (){
  yield takeLatest(
    (action: any) => action.payload.name === 'POST_DETAIL',
    catchAsync('POST_DETAIL', fetchPostDetailAsync, fetchApiFail)
  );
}

export default function* postDetailSagas (){
  yield all([ call(watchFetchPostDetail) ]);
}
