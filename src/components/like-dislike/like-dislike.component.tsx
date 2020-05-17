import React from 'react';
import LikeIcon from '../icons/like/like.component';

import './like-dislike.styles.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IChangeLikesOrDislikesPayload } from '../../redux/global-post-actions/global-post-actions';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { ILikeOrDislikeCommentPayload } from '../../redux/comments/comments.actions';

function LikeDislikePlain ({
  id,
  likeCount,
  dislikeCount,
  liked,
  disliked,
  className,
  size = 1.2,
  forComment,
  updateLikesOrDislikes,
  updateLikesOrDislikesComment
}: {
  id: string;
  likeCount: number;
  dislikeCount: number;
  disliked?: boolean;
  liked?: boolean;
  className?: string;
  size?: number;
  forComment?: boolean;
  updateLikesOrDislikes: (
    payload: IChangeLikesOrDislikesPayload['data']
  ) => void;
  updateLikesOrDislikesComment: (
    payload: ILikeOrDislikeCommentPayload['data']
  ) => void;
}){
  return (
    <div className={`like-dislike ${className || ''}`}>
      <div className="like-dislike__item">
        <LikeIcon
          size={size}
          color={liked ? '#00a3ff' : undefined}
          onClick={() => {
            const payload = { like: !liked, id: id };
            if (forComment) updateLikesOrDislikesComment(payload);
            else updateLikesOrDislikes(payload);
          }}
        />
        <span>{likeCount}</span>
      </div>
      <div className="like-dislike__item">
        <LikeIcon
          rotate={180}
          size={size}
          color={disliked ? '#00a3ff' : undefined}
          onClick={() => {
            const payload = { dislike: !disliked, id: id };
            if (forComment) updateLikesOrDislikesComment(payload);
            updateLikesOrDislikes(payload);
          }}
        />
        <span>{dislikeCount}</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLikesOrDislikes: (payload: IChangeLikesOrDislikesPayload['data']) =>
    dispatch(fetchApi({ name: 'CHANGE_LIKES_OR_DISLIKES', data: payload })),
  updateLikesOrDislikesComment: (
    payload: ILikeOrDislikeCommentPayload['data']
  ) => dispatch(fetchApi({ name: 'LIKE_DISLIKE_COMMENT', data: payload }))
});

const LikeDislike = connect(null, mapDispatchToProps)(LikeDislikePlain);
export default LikeDislike;
