import { ADD_NEW_COMMENT, ADD_NEW_REPLY } from './../comments/comments.actions';
import { FOLLOW_USER, UNFOLLOW_USER } from './../user/user.actions';
import { PostDetail } from '../../@types/post.interfaces';
import { PostDetailActionType, LOAD_POST_DETAIL } from './post-detail.actions';
import {
  GlobalPostActionType,
  CHANGE_SAVED,
  CHANGE_LIKES_OR_DISLIKES
} from '../global-post-actions/global-post-actions';
import { changePostLikesOrDislikes } from '../global-post-actions/global-post-reducer-helper';

interface IState {
  postDetail: PostDetail | null;
}

const INITIAL_STATE: IState = {
  postDetail: null
};

export default function postDetailReducer (
  state: IState = INITIAL_STATE,
  action: PostDetailActionType | GlobalPostActionType
): IState{
  const updatePostDetail = (
    updateCb: (post: PostDetail) => PostDetail,
    id: string
  ) => {
    if (!state.postDetail || id !== state.postDetail.owner.id)
      return state.postDetail;
    return updateCb({ ...state.postDetail });
  };

  switch (action.type) {
    case LOAD_POST_DETAIL:
      return {
        ...state,
        postDetail: action.payload
      };
    case CHANGE_SAVED:
      if (!state.postDetail) return state;
      if (state.postDetail.id !== action.payload.post.id) return state;

      const newPostDetail = { ...state.postDetail };
      newPostDetail.saved = action.payload.saved;

      return {
        ...state,
        postDetail: newPostDetail
      };
    case CHANGE_LIKES_OR_DISLIKES:
      if (!state.postDetail) return state;
      if (state.postDetail.id !== action.payload.id) return state;

      return {
        ...state,
        postDetail: {
          ...changePostLikesOrDislikes(state.postDetail, action.payload)
        }
      };

    case FOLLOW_USER:
      const newPostDetailFollow = updatePostDetail((post) => {
        post.owner.followed = true;
        return post;
      }, action.payload);
      return {
        ...state,
        postDetail: newPostDetailFollow
      };

    case UNFOLLOW_USER:
      const newPostDetailUnfollow = updatePostDetail((post) => {
        post.owner.followed = false;
        return post;
      }, action.payload);
      return {
        ...state,
        postDetail: newPostDetailUnfollow
      };

    case ADD_NEW_REPLY:
    case ADD_NEW_COMMENT:
      if (!state.postDetail || action.payload.postId !== state.postDetail.id)
        return state;
      return {
        ...state,
        postDetail: {
          ...state.postDetail,
          commentsCount: state.postDetail.commentsCount + 1
        }
      };

    default:
      return state;
  }
}
