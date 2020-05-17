import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Comment } from '../../@types/comment.interfaces';
import './comment-parent.styles.scss';
import useAnimation from '../../effects/useAnimation.effect';
import { useInView } from 'react-intersection-observer';
import AvatarIcon from './../../assets/images/avatar.png';
import Textbox from '../textbox/textbox.component';
import Button from '../button/button.component';
import { dummyArrayComments } from '../../dummy-datas/dummy-datas';
import CommentContent from '../comment-content/comment-content.component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import Loading from '../loading/loading.component';

interface IProps {
  comment: Comment;
  fetchReplies: (parentId: string, page: number, limit?: number) => void;
}

function CommentParentPlain ({ comment, fetchReplies }: IProps){
  const [ showReplies, setShowReplies ] = useState(false);
  const [ showReplyInput, setShowReplyInput ] = useState(false);
  const hasFetch = useRef(false);

  const [ ref, , entry ] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  useAnimation(entry!, { opacity: 1 }, 0.8);
  const { repliesCount } = comment;

  useEffect(
    () => {
      if (hasFetch.current === false && showReplies === true) {
        fetchReplies(comment.id, 1);
        hasFetch.current = true;
      }
    },
    [ showReplies, fetchReplies, comment ]
  );

  return (
    <div className="comment-container" ref={ref}>
      <CommentContent
        comment={comment}
        replyHandler={() => setShowReplyInput(true)}
      />
      <div
        className="user-reply-input"
        style={{ display: showReplyInput ? 'flex' : 'none' }}>
        <div className="user-reply-input__user-info">
          <img src={AvatarIcon} alt="" />
          <Textbox placeholder="add reply..." />
        </div>
        <div className="user-reply-input__buttons">
          <Button
            className="cancel-btn"
            onClick={() => setShowReplyInput(false)}>
            Cancel
          </Button>
          <Button className="reply-btn">Reply</Button>
        </div>
      </div>

      <span
        style={{ display: repliesCount === 0 ? 'none' : 'inline' }}
        className="reply-count cursor"
        onClick={() => setShowReplies(!showReplies)}>
        {showReplies ? 'Hide' : 'Show'} {repliesCount} replies
      </span>

      <div
        className="replies"
        style={{ display: showReplies ? 'flex' : 'none' }}>
        {comment.replies ? (
          <Fragment>
            {comment.replies.data.map((comment) => (
              <CommentContent key={comment.id} comment={comment} animation />
            ))}
            {comment.repliesCount - comment.replies.data.length > 0 ? (
              <span
                className="reply-count cursor"
                onClick={() =>
                  fetchReplies(comment.id, comment.replies!.page + 1)}>
                Load {comment.repliesCount - comment.replies.data.length} more
                comments
              </span>
            ) : null}
          </Fragment>
        ) : (
          <Loading size={50} />
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchReplies: (parentId: string, page: number, limit = 5) =>
    dispatch(fetchApi({ name: 'REPLIES', data: { page, limit, parentId } }))
});

const CommentParent = connect(null, mapDispatchToProps)(CommentParentPlain);
export default CommentParent;
