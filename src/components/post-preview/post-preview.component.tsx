import React from 'react';

import './post-preview.styles.scss';
import CommentIcon from '../icons/comment/comment.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import LikeDislike from '../like-dislike/like-dislike.component';
import { Link, useHistory } from 'react-router-dom';
import { Post } from '../../@types/post.interfaces';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../effects/useAnimation.effect';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import getAddToSavedListener from '../../utils/get-add-to-saved-listener';
import Timestamp from '../timestamp/timestamp.component';
import { IChangeSavedPayload } from '../../redux/global-post-actions/global-post-actions';
import { fetchApi } from '../../redux/fetch/fetch.actions';

interface IProps {
  post: Post;
  updateSaved: (payload: IChangeSavedPayload['data']) => void;
}

function PostPreviewPlain ({ post, updateSaved }: IProps){
  const [ ref, , entry ] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleBookmarkAddClick = getAddToSavedListener(post, updateSaved);

  const history = useHistory();

  useAnimation(entry!, { opacity: 1 }, 0.8);

  const {
    id,
    title,
    owner,
    images,
    likeCount,
    dislikeCount,
    commentsCount,
    liked,
    disliked,
    timestamp,
    saved
  } = post;
  return (
    <div className='post-preview not-visible' ref={ref}>
      <div className='post-preview__content-container'>
        <Link to={`/post-detail/${id}`} className='image-container'>
          <div className='img-hover-hitbox' />
          <img src={images[0]} alt='page' />
        </Link>
        <div className='post-preview__content'>
          <div className='post-preview__info'>
            <span className='post-preview__title'>{title}</span>
            <span className='post-preview__detail'>
              by{' '}
              <Link to={`/user/${owner.id}`} className='post-preview__author'>
                {owner.username}
              </Link>
            </span>
          </div>
          <LikeDislike
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            liked={liked}
            disliked={disliked}
            id={id}
          />
        </div>
      </div>
      <div className='post-preview__additional'>
        <div className='post-preview__additional__container'>
          <div className='post-preview__additional__container__comments'>
            <CommentIcon
              size={1.2}
              onClick={() => history.push(`/post-detail/${id}#comments`)}
            />
            <span>{commentsCount} comments</span>
          </div>
          <BookmarkAddIcon
            onClick={handleBookmarkAddClick}
            size={1.2}
            color={saved ? '#00a3ff' : undefined}
          />
        </div>
        <Timestamp timestamp={timestamp} />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSaved: (payload: IChangeSavedPayload['data']) =>
    dispatch(fetchApi({ name: 'CHANGE_SAVED', data: payload }))
});

const PostPreview = connect(null, mapDispatchToProps)(PostPreviewPlain);
export default PostPreview;
