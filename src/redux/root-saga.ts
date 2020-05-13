import { all, call } from 'redux-saga/effects';
import { postSagas } from './post/post.sagas';
import savedPostsSagas from './saved-posts/saved-posts.sagas';
import postDetailSagas from './post-detail/post-detail.sagas';
import { commentsSagas } from './comments/comments.sagas';
import globalPostSagas from './global-post-actions/global-post-sagas';
import userSagas from './user/user.sagas';
import addPostSagas from './add-post/add-post.sagas';

export default function* rootSaga (){
  yield all([
    call(globalPostSagas),
    call(postSagas),
    call(savedPostsSagas),
    call(postDetailSagas),
    call(commentsSagas),
    call(userSagas),
    call(addPostSagas)
  ]);
}
