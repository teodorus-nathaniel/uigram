import React from 'react';
import LikeIcon from '../icons/like/like.component';

import './like-dislike.styles.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IChangeLikesOrDislikesPayload } from '../../redux/global-post-actions/global-post-actions';
import { fetchApi } from '../../redux/fetch/fetch.actions';

// TODO: kasih props buat kasi tau kalo itu comment, yang dilakuin beda
function LikeDislikePlain ({
  id,
  likeCount,
  dislikeCount,
  liked,
  disliked,
  className,
  size = 1.2,
  updateLikesOrDislikes
}: {
  id: string;
  likeCount: number;
  dislikeCount: number;
  disliked?: boolean;
  liked?: boolean;
  className?: string;
  size?: number;
  updateLikesOrDislikes: (
    payload: IChangeLikesOrDislikesPayload['data']
  ) => void;
}){
  return (
    <div className={`like-dislike ${className || ''}`}>
      <div className='like-dislike__item'>
        <LikeIcon
          size={size}
          color={liked ? '#00a3ff' : undefined}
          onClick={() => updateLikesOrDislikes({ like: !liked, id: id })}
        />
        <span>{likeCount}</span>
      </div>
      <div className='like-dislike__item'>
        <LikeIcon
          rotate={180}
          size={size}
          color={disliked ? '#00a3ff' : undefined}
          onClick={() => updateLikesOrDislikes({ dislike: !disliked, id: id })}
        />
        <span>{dislikeCount}</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLikesOrDislikes: (payload: IChangeLikesOrDislikesPayload['data']) =>
    dispatch(fetchApi({ name: 'CHANGE_LIKES_OR_DISLIKES', data: payload }))
});

const LikeDislike = connect(null, mapDispatchToProps)(LikeDislikePlain);
export default LikeDislike;
