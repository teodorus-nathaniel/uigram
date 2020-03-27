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
        postDetail: changePostLikesOrDislikes(state.postDetail, action.payload)
      };
    default:
      return state;
  }
}
