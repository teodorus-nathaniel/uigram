import { Post } from './../../@types/post.interfaces';
import SavedPostsActionType, {
  FETCH_SAVED_POSTS,
  LOAD_SAVED_POSTS,
  SAVED_POST_FAILURE,
  ADD_OR_REMOVE_POST,
  CHANGE_LIKES_OR_DISLIKES_SAVED_POSTS
} from './saved-posts.actions';
import updateLikesAndDislikes from '../../utils/update-likes-and-dislikes';

interface IState {
  savedPosts: Post[];
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE: IState = {
  savedPosts: [],
  isFetching: false,
  error: null
};

export default function savedPostsReducer (
  state: IState = INITIAL_STATE,
  action: SavedPostsActionType
): IState{
  switch (action.type) {
    case FETCH_SAVED_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case LOAD_SAVED_POSTS:
      return {
        ...state,
        savedPosts: action.payload,
        isFetching: false,
        error: null
      };
    case ADD_OR_REMOVE_POST:
      const { type, post } = action.payload;
      let newSavedPosts = [ ...state.savedPosts ];
      if (type === 'add') {
        newSavedPosts.push(post);
      } else {
        newSavedPosts = newSavedPosts.filter((el) => el.id !== post.id);
      }
      return {
        ...state,
        savedPosts: newSavedPosts
      };
    case SAVED_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case CHANGE_LIKES_OR_DISLIKES_SAVED_POSTS:
      const newPosts = state.savedPosts.map((post) => {
        if (post.id !== action.payload.id) return { ...post };

        const { like, dislike } = action.payload;
        return updateLikesAndDislikes(post, like, dislike);
      });
      return {
        ...state,
        savedPosts: newPosts
      };
    default:
      return state;
  }
}
