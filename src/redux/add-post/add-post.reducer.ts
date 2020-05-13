import AddPostActionType, {
  ADD_POST,
  CLEAR_URL_POST,
  ADD_URL_POST,
  CLEAR_ALL_STATE
} from './add-post.actions';

interface IState {
  images: string[];
  urlImage: string;
}

const INITIAL_STATE: IState = {
  images: [
    'https://www.creativerooms.se/cr12/wp-content/uploads/2018/02/Login3-portrait-kopiera-2.png',
    'https://www.creativerooms.se/cr12/wp-content/uploads/2018/02/Login3-portrait-kopiera-2.png'
  ],
  urlImage: ''
};

export default function addPostReducer (
  state: IState = INITIAL_STATE,
  action: AddPostActionType
){
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        images: [ ...state.images, action.payload.image ]
      };
    case ADD_URL_POST:
      return {
        ...state,
        urlImage: action.payload.image
      };
    case CLEAR_URL_POST:
      return {
        ...state,
        urlImage: ''
      };
    case CLEAR_ALL_STATE:
      return {
        urlImage: '',
        images: []
      };
    default:
      return state;
  }
}
