import { all, call } from 'redux-saga/effects';
import { postSagas } from './post/post.sagas';
import savedPostsSagas from './saved-posts/saved-posts.sagas';
import postDetailSagas from './post-detail/post-detail.sagas';
import { commentsSagas } from './comments/comments.sagas';

export default function* rootSaga (){
  yield all([
    call(postSagas),
    call(savedPostsSagas),
    call(postDetailSagas),
    call(commentsSagas)
  ]);
}
