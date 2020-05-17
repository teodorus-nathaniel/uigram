import React from 'react';
import UserInfo from '../user-info/user-info.component';
import './comment-content.styles.scss';
import { Comment } from '../../@types/comment.interfaces';
import LikeDislike from '../like-dislike/like-dislike.component';
import ReplyIcon from '../icons/reply/reply.component';
import Timestamp from '../timestamp/timestamp.component';

interface IProps {
  comment: Comment;
  replyHandler?: () => void;
  animation?: boolean;
}

export default function CommentContent ({
  comment,
  replyHandler,
  animation
}: IProps){
  const {
    owner,
    id,
    content,
    liked,
    disliked,
    dislikeCount,
    likeCount,
    timestamp
  } = comment;

  return (
    <div className={`comment ${animation ? 'fade-in' : ''}`}>
      <div className="comment__info">
        <UserInfo user={owner} />
        <Timestamp timestamp={timestamp} className="comment__info__timestamp" />
      </div>
      <p>{content}</p>
      <div className="flex-row-space-between comment__additional-data">
        <LikeDislike
          forComment
          id={id}
          liked={liked}
          disliked={disliked}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
        />
        {replyHandler ? (
          <span onClick={replyHandler}>
            <ReplyIcon size={1.2} /> reply
          </span>
        ) : null}
      </div>
    </div>
  );
}
