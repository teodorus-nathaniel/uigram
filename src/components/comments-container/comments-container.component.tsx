import React, { useEffect, useRef, Fragment, useCallback } from 'react';
import { Dispatch } from 'redux';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Comment } from '../../@types/comment.interfaces';
import CommentParent from '../comment-parent/comment-parent.component';
import './comments-container.styles.scss';
import { clearComments } from '../../redux/comments/comments.actions';
import { useLocation } from 'react-router-dom';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import ErrorMessage from '../error-message/error-message.component';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../loading/loading.component';

interface IProps {
  postId: string;
  comments: Comment[];
  currentPostId: string;
  page: number;
  isFetching?: boolean;
  error?: string;
  fetchComments: (postId: string, page?: number, limit?: number) => void;
  clearComments: () => void;
}

const noDataMessage = 'Be the first to comment!';

function CommentsContainerPlain ({
  postId,
  comments,
  isFetching,
  error,
  fetchComments,
  currentPostId,
  page,
  clearComments
}: IProps){
  const commentsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hasFetch = useRef(false);

  useEffect(
    () => {
      if (postId !== currentPostId) {
        clearComments();
        fetchComments(postId, 1);
        hasFetch.current = true;
      }
    },
    [ clearComments, fetchComments, postId, currentPostId ]
  );

  const fetchNext = useCallback(
    () => {
      fetchComments(postId, page + 1);
    },
    [ postId, page, fetchComments ]
  );

  useEffect(
    () => {
      if (
        hasFetch.current &&
        !isFetching &&
        location.hash === '#comments' &&
        commentsRef.current
      ) {
        setTimeout(() => {
          if (commentsRef.current)
            window.scrollTo({
              behavior: 'smooth',
              top: commentsRef.current.getBoundingClientRect().top
            });
        }, 200);
      }
    },
    [ location, comments, isFetching ]
  );

  return (
    <div className="comments-container" ref={commentsRef}>
      {comments.length === 0 && isFetching === false && !error ? (
        <ErrorMessage message={noDataMessage} size={2} />
      ) : (
        <Fragment>
          <InfiniteScroll
            className="comments-container__content"
            dataLength={comments.length}
            next={fetchNext}
            hasMore={true}
            scrollThreshold="500px"
            loader={null}>
            {comments.map((comment: Comment) => (
              <CommentParent key={comment.id} comment={comment} />
            ))}
          </InfiniteScroll>
          {isFetching ? (
            <Loading size={100} />
          ) : error ? (
            <ErrorMessage size={1.3} message={error} />
          ) : null}
        </Fragment>
      )}
    </div>
  );
}

const mapStateToProps = ({
  comments: { comments, page, postId },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  comments,
  page,
  currentPostId: postId,
  isFetching: isFetching.COMMENTS,
  error: errors.COMMENTS
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchComments: (postId: string, page: number = 1, limit: number = 5) =>
    dispatch(fetchApi({ name: 'COMMENTS', data: { postId, page, limit } })),
  clearComments: () => dispatch(clearComments())
});

const CommentsContainer = connect(mapStateToProps, mapDispatchToProps)(
  CommentsContainerPlain
);
export default CommentsContainer;
