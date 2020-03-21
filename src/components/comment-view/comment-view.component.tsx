import React from 'react';
import { Comment } from '../../@types/comment.interfaces';
import LikeDislike from '../like-dislike/like-dislike.component';
import './comment-view.styles.scss';
import UserInfo from '../user-info/user-info.component';
import moment from 'moment';

interface IProps {
  comment: Comment;
}

export default function CommentView ({ comment }: IProps){
  const {
    id,
    content,
    liked,
    dislikeCount,
    likeCount,
    owner,
    repliesCount,
    timestamp,
    disliked
  } = comment;

  return (
    <div className='comment'>
      <div className='flex-row-space-between'>
        <UserInfo user={owner} />
        <LikeDislike
          id={id}
          liked={liked}
          disliked={disliked}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
        />
      </div>
      <p>{content}</p>
      <div className='flex-row-space-between comment__additional-data'>
        <span className='comment__additional-data__replies'>
          {repliesCount === 0 ? '' : `${repliesCount} replies`}{' '}
        </span>
        <span className='comment__additional-data__timestamp'>
          {moment(timestamp).fromNow()}
        </span>
      </div>
    </div>
  );
}
