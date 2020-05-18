import { put } from 'redux-saga/effects';
import { dummyArrayComments } from './../../dummy-datas/dummy-datas';
import {
  IFetchCommentsPayload,
  addComments,
  IFetchRepliesPayload,
  addReplies,
  ILikeOrDislikeCommentPayload,
  updateComments,
  IAddNewCommentPayload,
  clearComments,
  addNewComment,
  IAddNewReplyPayload,
  clearReplies,
  addNewReply
} from './comments.actions';
import { takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import createFetchFunction from '../utils/create-fetch-func';
import createFetchSagaPattern from '../fetch/fetch-saga-pattern-creator';
import getFetchInstance from '../utils/fetch';
import getDataFromResponse from '../utils/get-data-from-res';
import { fetchApi } from '../fetch/fetch.actions';

function* fetchCommentsAsync ({
  payload: { data: { page, limit, postId } }
}: {
  payload: IFetchCommentsPayload;
}){
  const res = yield getFetchInstance().get(
    `/posts/${postId}/comments?page=${page}&limit=${limit}`
  );
  const { comments } = getDataFromResponse(res);
  yield put(addComments({ comments, page, postId }));
}

function* fetchRepliesAsync ({
  payload: { data: { limit, page, parentId } }
}: {
  payload: IFetchRepliesPayload;
}){
  const res = yield getFetchInstance().get(
    `/posts/id/comments/${parentId}/replies?page=${page}&limit=${limit}`
  );

  const { replies } = getDataFromResponse(res);
  yield put(addReplies({ replies, page, parentId }));
}

function* likeDislikeCommentAsync ({
  payload: { data: { id, dislike, like } }
}: {
  payload: ILikeOrDislikeCommentPayload;
}){
  const res = yield getFetchInstance().patch(`/posts/id/comments/${id}/likes`, {
    like,
    dislike
  });

  const { comment } = getDataFromResponse(res);
  yield put(updateComments({ comment }));
}

function* addNewCommentAsync ({
  payload: { data }
}: {
  payload: IAddNewCommentPayload;
}){
  const res = yield getFetchInstance().post('/comments', data);

  const { comment } = yield getDataFromResponse(res);

  yield put(clearComments());
  yield put(
    fetchApi({
      name: 'COMMENTS',
      data: { limit: 5, page: 1, postId: data.postId }
    })
  );
  yield put(addNewComment(comment));
}

function* addNewReplyAsync ({
  payload: { data: { content, id, postId } }
}: {
  payload: IAddNewReplyPayload;
}){
  const res = yield getFetchInstance().post(`/comments/${id}/replies`, {
    content,
    postId
  });

  const { reply } = yield getDataFromResponse(res);

  yield put(clearReplies({ id }));
  yield put(
    fetchApi({ name: 'REPLIES', data: { parentId: id, limit: 5, page: 1 } })
  );
  yield put(addNewReply(reply));
}

function* watchFetchComments (){
  yield takeLatest(
    createFetchSagaPattern('COMMENTS'),
    createFetchFunction('COMMENTS', fetchCommentsAsync)
  );
}

function* watchFetchReplies (){
  yield takeLatest(
    createFetchSagaPattern('REPLIES'),
    createFetchFunction('REPLIES', fetchRepliesAsync)
  );
}

function* watchLikeDislikeComment (){
  yield takeLatest(
    createFetchSagaPattern('LIKE_DISLIKE_COMMENT'),
    createFetchFunction('LIKE_DISLIKE_COMMENT', likeDislikeCommentAsync)
  );
}

function* watchAddNewComment (){
  yield takeLatest(
    createFetchSagaPattern('ADD_NEW_COMMENT'),
    createFetchFunction('ADD_NEW_COMMENT', addNewCommentAsync)
  );
}

function* watchAddNewReply (){
  yield takeLatest(
    createFetchSagaPattern('ADD_NEW_REPLY'),
    createFetchFunction('ADD_NEW_REPLY', addNewReplyAsync)
  );
}

export function* commentsSagas (){
  yield all([
    call(watchFetchComments),
    call(watchFetchReplies),
    call(watchLikeDislikeComment),
    call(watchAddNewComment),
    call(watchAddNewReply)
  ]);
}
