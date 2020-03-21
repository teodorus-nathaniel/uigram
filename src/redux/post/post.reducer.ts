import { Post } from '../../@types/post.interfaces';
import { CHANGE_SAVED, CHANGE_LIKES_OR_DISLIKES } from './post.actions';
import PostActionType, {
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  LOAD_FEEDS_POSTS,
  LOAD_EXPLORE_POSTS
} from './post.actions';
import updateLikesAndDislikes from '../../utils/update-likes-and-dislikes';

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
    return {
      ...state,
      explore: state.explore.map((post) => {
        if (post.id === id) {
          operationCb(post);
        }
        return { ...post };
      }),
      feeds: state.feeds.map((post) => {
        if (post.id === id) {
          operationCb(post);
        }
        return { ...post };
      })
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
        const { like, dislike } = action.payload;
        return updateLikesAndDislikes(item, like, dislike);
      });
    default:
      return state;
  }
}
