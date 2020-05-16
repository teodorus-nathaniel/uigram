import AddPostActionType, {
  ADD_POST,
  CLEAR_TEMP_POST,
  ADD_TEMP_POST,
  CLEAR_ALL_STATE,
  REMOVE_POST,
  CHANGE_LINK,
  CHANGE_DESC,
  CHANGE_TITLE
} from './add-post.actions';

interface IState {
  images: { link: string; file?: File }[];
  tempImage: string;
  title: string;
  description: string;
  link: string;
  tempFile?: File;
}

const INITIAL_STATE: IState = {
  images: [],
  title: '',
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
        images: [
          ...state.images,
          { link: action.payload.image, file: action.payload.file }
        ]
      };
    case ADD_TEMP_POST:
      return {
        ...state,
        tempImage: action.payload.image,
        tempFile: action.payload.file
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
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    default:
      return state;
  }
}
