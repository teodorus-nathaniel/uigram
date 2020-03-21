import React from 'react';
import { PostDetail } from '../../@types/post.interfaces';
import LikeDislike from '../like-dislike/like-dislike.component';
import moment from 'moment';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import CommentIcon from '../icons/comment/comment.component';
import getAddToSavedListener from '../../utils/get-add-to-saved-listener';
import {
  addOrRemovePost,
  IAddOrRemovePostPayload
} from '../../redux/saved-posts/saved-posts.actions';
import './post-details.styles.scss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CommentsContainer from '../comments-container/comments-container.component';
import UserInfo from '../user-info/user-info.component';

interface IProps {
  post: PostDetail;
  addOrRemovePost: (payload: IAddOrRemovePostPayload) => void;
}

function PostDetailsPlain ({ post, addOrRemovePost }: IProps){
  const handleBookmarkAddClick = getAddToSavedListener(post, addOrRemovePost);

  const {
    title,
    link,
    commentsCount,
    id,
    saved,
    disliked,
    liked,
    description,
    dislikeCount,
    likeCount,
    owner,
    timestamp
  } = post;

  return (
    <div className='details'>
      <div className='flex-column details__info'>
        <div className='flex-column'>
          <h1>{title}</h1>
          <div className='flex-row-space-between'>
            <a href={link}>visit website</a>
            <span className='details__timestamp'>
              {moment(timestamp).fromNow()}
            </span>
          </div>
        </div>
        <div className='flex-row-space-between'>
          <LikeDislike
            size={1.4}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            liked={liked}
            disliked={disliked}
            id={id}
          />
          {saved ? (
            <BookmarkIcon
              onClick={handleBookmarkAddClick}
              color='#00a3ff'
              size={1.2}
            />
          ) : (
            <BookmarkAddIcon onClick={handleBookmarkAddClick} size={1.4} />
          )}
        </div>
      </div>

      <div className='flex-column'>
        <span className='details__title'>Description</span>
        <p className='details__description'>{description}</p>
      </div>

      <div className='details__owner flex-column'>
        <span className='details__title'>Posted by</span>
        <UserInfo user={owner} />
      </div>

      <div className='comments'>
        <div className='flex-row comments__comments-count'>
          <CommentIcon size={1.4} />
          <span>{commentsCount} comments</span>
        </div>
        <div className='insert-comment flex-column'>
          <textarea placeholder='add a comment...' rows={3} />
          <button>Comment</button>
        </div>
        <CommentsContainer postId={id} />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOrRemovePost: (payload: IAddOrRemovePostPayload) =>
    dispatch(addOrRemovePost(payload))
});

const PostDetails = connect(null, mapDispatchToProps)(PostDetailsPlain);
export default PostDetails;
