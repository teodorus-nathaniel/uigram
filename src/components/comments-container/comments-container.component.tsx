import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import {
  fetchComments,
  clearComments
} from '../../redux/comments/comments.actions';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Comment } from '../../@types/comment.interfaces';
import Loading from '../loading/loading.component';
import ErrorMessage from '../error-message/error-message.component';
import CommentView from '../comment-view/comment-view.component';
import './comments-container.styles.scss';

interface IProps {
  postId: string;
  comments: Comment[];
  isFetching: boolean;
  error: Error | null;
  fetchComments: (postId: string, page?: number, limit?: number) => void;
  clearComments: () => void;
}

function CommentsContainerPlain ({
  postId,
  comments,
  isFetching,
  error,
  fetchComments,
  clearComments
}: IProps){
  useEffect(
    () => {
      fetchComments(postId);
      return () => {
        clearComments();
      };
    },
    [ clearComments, fetchComments, postId ]
  );

  return (
    <div className='comments-container'>
      {isFetching ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        comments.map((comment) => (
          <CommentView key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}

const mapStateToProps = ({
  comments: { comments, isFetching, error }
}: GlobalState) => ({
  comments,
  isFetching,
  error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchComments: (postId: string, page: number = 1, limit: number = 5) =>
    dispatch(fetchComments({ postId, page, limit })),
  clearComments: () => dispatch(clearComments())
});

const CommentsContainer = connect(mapStateToProps, mapDispatchToProps)(
  CommentsContainerPlain
);
export default CommentsContainer;
