import {
  all,
  call,
  takeLeading,
  put,
  takeLatest,
  select
} from 'redux-saga/effects';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import createFetchFunction from '../utils/create-fetch-func';
import { IAddPostUsingUrlPayload, addTempPost } from './add-post.actions';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';
import { GlobalState } from '../root-reducer';

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

function* postNewPostAsync (){
  const getAddPostData = ({ addPost }: GlobalState) => addPost;
  const state: ReturnType<typeof getAddPostData> = yield select(getAddPostData);

  if (state.images.length === 0) return;

  const bodyData = new FormData();
  state.images.forEach(({ link, file }, idx) => {
    if (file) {
      bodyData.append('files', file);
      bodyData.append('images', `files--${idx}`);
    } else {
      bodyData.append('images', link);
    }
  });
  bodyData.set('title', state.title);
  bodyData.set('description', state.description);
  bodyData.set('link', state.link);
  const res = yield getFetchInstance().post('/posts', bodyData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(res);
}

function* watchAddUrl (){
  yield takeLeading(
    createFetchSagaPattern('ADD_URL_POST'),
    createFetchFunction('ADD_URL_POST', addUrlAsync)
  );
}

function* watchPostNewPost (){
  yield takeLatest(
    createFetchSagaPattern('POST_NEW_POST'),
    createFetchFunction('POST_NEW_POST', postNewPostAsync)
  );
}

export default function* addPostSagas (){
  yield all([ call(watchAddUrl), call(watchPostNewPost) ]);
}
