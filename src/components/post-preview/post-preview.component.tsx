import React from 'react';

import './post-preview.styles.scss';
import CommentIcon from '../icons/comment/comment.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import LikeDislike from '../like-dislike/like-dislike.component';
import { Link } from 'react-router-dom';
import { Post } from '../../@types/post.interfaces';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../effects/useAnimation.effect';
import moment from 'moment';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { addOrRemovePost } from '../../redux/saved-posts/saved-posts.actions';
import { selectIsSaved } from '../../redux/saved-posts/saved-posts.selectors';

interface IProps {
  post: Post;
  saved?: boolean;
}

function PostPreviewPlain ({ post, saved }: IProps){
  const [ ref, , entry ] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  // FIXME: ini gimana saved nya dari mana, ini aneh savednya musti ? ama kalo gini musti fetch saved dl dari awal
  const handleBookmarkAddClick = () => {
    if (saved) {
      addOrRemovePost({ type: 'remove', post: post });
    } else {
      addOrRemovePost({ type: 'add', post: post });
    }
  };

  useAnimation(entry!, { opacity: 1 }, 0.8);

  const {
    id,
    title,
    owner,
    img,
    likeCount,
    dislikeCount,
    commentsCount,
    likeStatus,
    timestamp
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
            likeStatus={likeStatus}
          />
        </div>
      </div>
      <div className='post-preview__additional'>
        <div className='post-preview__additional__container'>
          <div className='post-preview__additional__container__comments'>
            <CommentIcon size={1.2} />
            <span>{commentsCount} comments</span>
          </div>
          <BookmarkAddIcon onClick={handleBookmarkAddClick} size={1.2} />
        </div>
        <span>{moment(timestamp).fromNow()}</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state: GlobalState, ownProps: IProps) => ({
  saved: selectIsSaved(ownProps.post.id)(state)
});

const PostPreview = connect(mapStateToProps)(PostPreviewPlain);
export default PostPreview;
