import AddPostActionType, {
  ADD_POST,
  CLEAR_TEMP_POST,
  ADD_TEMP_POST,
  CLEAR_ALL_STATE,
  REMOVE_POST,
  CHANGE_LINK,
  CHANGE_DESC
} from './add-post.actions';

interface IState {
  images: string[];
  tempImage: string;
  description: string;
  link: string;
}

const INITIAL_STATE: IState = {
  images: [],
  tempImage: '',
  description: '',
  link: ''
};

export default function addPostReducer (
  state: IState = INITIAL_STATE,
  action: AddPostActionType
): IState{
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        images: [ ...state.images, action.payload.image ]
      };
    case ADD_TEMP_POST:
      return {
        ...state,
        tempImage: action.payload.image
      };
    case CLEAR_TEMP_POST:
      return {
        ...state,
        tempImage: ''
      };
    case CLEAR_ALL_STATE:
      return {
        ...state,
        description: '',
        link: '',
        tempImage: '',
        images: []
      };
    case REMOVE_POST:
      const newImages = [ ...state.images ];
      newImages.splice(action.payload.index, 1);
      return {
        ...state,
        images: newImages
      };
    case CHANGE_LINK:
      return {
        ...state,
        link: action.payload
      };
    case CHANGE_DESC:
      return {
        ...state,
        description: action.payload
      };
    default:
      return state;
  }
}
