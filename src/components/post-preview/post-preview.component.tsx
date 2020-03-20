import React from 'react';

import './post-preview.styles.scss';
import CommentIcon from '../icons/comment/comment.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import LikeDislike from '../like-dislike/like-dislike.component';
import { Link, useHistory } from 'react-router-dom';
import { Post } from '../../@types/post.interfaces';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../effects/useAnimation.effect';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  addOrRemovePost,
  IAddOrRemovePostPayload
} from '../../redux/saved-posts/saved-posts.actions';
import { Dispatch } from 'redux';

interface IProps {
  post: Post;
  addOrRemovePost: (payload: IAddOrRemovePostPayload) => void;
}

function PostPreviewPlain ({ post, addOrRemovePost }: IProps){
  const [ ref, , entry ] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleBookmarkAddClick = () => {
    if (saved) {
      addOrRemovePost({ type: 'remove', post: post });
    } else {
      addOrRemovePost({ type: 'add', post: post });
    }
  };

  const history = useHistory();

  useAnimation(entry!, { opacity: 1 }, 0.8);

  const {
    id,
    title,
    owner,
    img,
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
          <img src={img} alt='page' />
        </Link>
        <div className='post-preview__content'>
          <div className='post-preview__info'>
            <span className='post-preview__title'>{title}</span>
            <span className='post-preview__detail'>
              by{' '}
              <Link to='/author' className='post-preview__author'>
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
        <span>{moment(timestamp).fromNow()}</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOrRemovePost: (payload: IAddOrRemovePostPayload) =>
    dispatch(addOrRemovePost(payload))
});

const PostPreview = connect(null, mapDispatchToProps)(PostPreviewPlain);
export default PostPreview;
