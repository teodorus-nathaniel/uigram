import { Post } from '../../@types/post.interfaces';
import { CHANGE_SAVED, CHANGE_LIKES_OR_DISLIKES } from './post.actions';
import PostActionType, {
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  LOAD_FEEDS_POSTS,
  LOAD_EXPLORE_POSTS
} from './post.actions';

interface IState {
  explore: Post[];
  feeds: Post[];
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE = {
  explore: [],
  feeds: [],
  isFetching: false,
  error: null
};

export default function postReducer (
  state: IState = INITIAL_STATE,
  action: PostActionType
): IState{
  function updateExploreAndFeeds (
    id: string,
    operationCb: (item: Post) => void
  ){
    const exploreItem = state.explore.find((el) => el.id === id);
    const feedsItem = state.feeds.find((el) => el.id === id);
    if (exploreItem) operationCb(exploreItem);
    if (feedsItem) operationCb(feedsItem);

    return {
      ...state,
      explore: state.explore.map((el) => ({ ...el })),
      feeds: state.feeds.map((el) => ({ ...el }))
    };
  }

  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case LOAD_FEEDS_POSTS:
      return {
        ...state,
        feeds: action.payload,
        isFetching: false,
        error: null
      };
    case LOAD_EXPLORE_POSTS:
      return {
        ...state,
        explore: action.payload,
        isFetching: false,
        error: null
      };
    case CHANGE_SAVED:
      return updateExploreAndFeeds(
        action.payload.id,
        (item) => (item.saved = action.payload.saved)
      );
    case CHANGE_LIKES_OR_DISLIKES:
      return updateExploreAndFeeds(action.payload.id, (item) => {
        const { likesChange, dislikesChange } = action.payload;
        if (likesChange) item.likeCount += likesChange;
        if (dislikesChange) item.dislikeCount += dislikesChange;
      });
    default:
      return state;
  }
}
