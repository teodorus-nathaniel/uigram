import React, { useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Comment } from '../../@types/comment.interfaces';
import CommentParent from '../comment-parent/comment-parent.component';
import './comments-container.styles.scss';
import CommentActionAPI from '../../redux/comments/comments.actions';
import { useLocation } from 'react-router-dom';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import LoadingError from '../loading-error/loading-error.component';

interface IProps {
  postId: string;
  comments: Comment[];
  isFetching?: boolean;
  error?: string;
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
  const commentsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(
    () => {
      if (
        comments.length !== 0 &&
        location.hash === '#comments' &&
        commentsRef.current
      ) {
        window.scrollTo({
          behavior: 'smooth',
          top: commentsRef.current.getBoundingClientRect().top
        });
      }
    },
    [ commentsRef, location, comments ]
  );

  useEffect(
    () => {
      if (isFetching || error) return;

      fetchComments(postId);
      return () => {
        clearComments();
      };
    },
    [ clearComments, fetchComments, postId, isFetching, error ]
  );

  return (
    <div className='comments-container' ref={commentsRef}>
      <LoadingError isLoading={isFetching} error={error}>
        {comments.map((comment) => (
          <CommentParent key={comment.id} comment={comment} />
        ))}
      </LoadingError>
    </div>
  );
}

const mapStateToProps = ({
  comments: { comments },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  comments,
  isFetching: isFetching.COMMENTS,
  error: errors.COMMENTS
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchComments: (postId: string, page: number = 1, limit: number = 5) =>
    dispatch(fetchApi({ name: 'COMMENTS', data: { postId, page, limit } })),
  clearComments: () => dispatch(CommentActionAPI.clearComments())
});

const CommentsContainer = connect(mapStateToProps, mapDispatchToProps)(
  CommentsContainerPlain
);
export default CommentsContainer;
