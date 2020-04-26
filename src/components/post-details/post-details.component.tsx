import React from 'react';
import { PostDetail } from '../../@types/post.interfaces';
import LikeDislike from '../like-dislike/like-dislike.component';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import CommentIcon from '../icons/comment/comment.component';
import getAddToSavedListener from '../../utils/get-add-to-saved-listener';
import './post-details.styles.scss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CommentsContainer from '../comments-container/comments-container.component';
import UserInfo from '../user-info/user-info.component';
import ArrowIcon from '../icons/arrow/arrow.component';
import { useHistory } from 'react-router-dom';
import CommentTextArea from '../comment-textarea/comment-textarea.component';
import Timestamp from '../timestamp/timestamp.component';
import { IChangeSavedPayload } from '../../redux/global-post-actions/global-post-actions';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import FollowButton from '../follow-button/follow-button.component';

interface IProps {
  post: PostDetail;
  updateSaved: (payload: IChangeSavedPayload['data']) => void;
}

function PostDetailsPlain ({ post, updateSaved }: IProps){
  const handleBookmarkAddClick = getAddToSavedListener(post, updateSaved);
  const history = useHistory();

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
    <div className="details">
      <ArrowIcon className="back-icon" onClick={() => history.goBack()} />
      <div className="flex-column details__info">
        <div className="flex-column">
          <h1>{title}</h1>
          <div className="flex-row-space-between">
            <a href={link}>visit website</a>
            <Timestamp timestamp={timestamp} className="details__timestamp" />
          </div>
        </div>
        <div className="flex-row-space-between">
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
              color="#00a3ff"
              size={1.2}
            />
          ) : (
            <BookmarkAddIcon onClick={handleBookmarkAddClick} size={1.4} />
          )}
        </div>
      </div>

      <div className="flex-column">
        <span className="details__title">Description</span>
        <p className="details__description">{description}</p>
      </div>

      <div className="details__owner flex-column">
        <span className="details__title">Posted by</span>
        <div className="details__owner__container">
          <UserInfo user={owner} />
          <FollowButton owner={owner} />
        </div>
      </div>

      <div className="comments">
        <div className="flex-row comments__comments-count">
          <CommentIcon size={1.4} />
          <span>{commentsCount} comments</span>
        </div>
        <CommentTextArea />
        <CommentsContainer postId={id} />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSaved: (payload: IChangeSavedPayload['data']) =>
    dispatch(fetchApi({ name: 'CHANGE_SAVED', data: payload }))
});

const PostDetails = connect(null, mapDispatchToProps)(PostDetailsPlain);
export default PostDetails;
