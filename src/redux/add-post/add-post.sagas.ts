import { all, call, takeLeading, put } from 'redux-saga/effects';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import createFetchFunction from '../utils/create-fetch-func';
import { IAddPostUsingUrlPayload, addTempPost } from './add-post.actions';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';

function* addUrlAsync ({
  payload: { data: { url } }
}: {
  payload: IAddPostUsingUrlPayload;
}){
  const res = yield getFetchInstance().post('/screenshot', {
    url
  });

  const { url: imageUrl } = getDataFromResponse(res);
  yield put(addTempPost({ image: imageUrl }));
}

function* watchAddUrl (){
  yield takeLeading(
    createFetchSagaPattern('ADD_URL_POST'),
    createFetchFunction('ADD_URL_POST', addUrlAsync)
  );
}

export default function* addPostSagas (){
  yield all([ call(watchAddUrl) ]);
}
