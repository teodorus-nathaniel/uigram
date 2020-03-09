import { all, call } from 'redux-saga/effects';
import { postSagas } from './post/post.sagas';
import savedPostsSagas from './saved-posts/saved-posts.sagas';

export default function* rootSaga (){
  yield all([ call(postSagas), call(savedPostsSagas) ]);
}
