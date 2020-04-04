import React, { useState } from 'react';
import { Comment } from '../../@types/comment.interfaces';
import './comment-parent.styles.scss';
import useAnimation from '../../effects/useAnimation.effect';
import { useInView } from 'react-intersection-observer';
import AvatarIcon from './../../assets/images/avatar.png';
import Textbox from '../textbox/textbox.component';
import Button from '../button/button.component';
import { dummyArrayComments } from '../../dummy-datas/dummy-datas';
import CommentContent from '../comment-content/comment-content.component';

interface IProps {
  comment: Comment;
}

export default function CommentParent ({ comment }: IProps){
  const [ showReplies, setShowReplies ] = useState(false);
  const [ showReplyInput, setShowReplyInput ] = useState(false);

  const [ ref, , entry ] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  useAnimation(entry!, { opacity: 1 }, 0.8);

  const { repliesCount } = comment;

  return (
    <div className='comment-container' ref={ref}>
      <CommentContent
        comment={comment}
        replyHandler={() => setShowReplyInput(true)}
      />

      <div
        className='user-reply-input'
        style={{ display: showReplyInput ? 'flex' : 'none' }}>
        <div className='user-reply-input__user-info'>
          <img src={AvatarIcon} alt='' />
          <Textbox placeholder='add reply...' />
        </div>
        <div className='user-reply-input__buttons'>
          <Button
            className='cancel-btn'
            onClick={() => setShowReplyInput(false)}>
            Cancel
          </Button>
          <Button className='reply-btn'>Reply</Button>
        </div>
      </div>

      <span
        style={{ display: repliesCount === 0 ? 'none' : 'inline' }}
        className='reply-count cursor'
        onClick={() => setShowReplies(!showReplies)}>
        {showReplies ? 'Hide' : 'Show'} {repliesCount} replies
      </span>

      <div
        className='replies'
        style={{ display: showReplies ? 'flex' : 'none' }}>
        {dummyArrayComments(1)
          .slice(2)
          .map((comment) => (
            <CommentContent key={comment.id} comment={comment} animation />
          ))}
      </div>
    </div>
  );
}
