import {
  IFetchApiNames,
  FetchActionType,
  FETCH_API,
  FETCH_API_FAIL,
  FETCH_API_SUCCESS
} from './fetch.actions';

interface IState {
  isFetching: { [key in IFetchApiNames]?: boolean };
  errors: { [key in IFetchApiNames]?: null | Error };
}

const INITIAL_STATE: IState = {
  isFetching: {},
  errors: {}
};

export default function fetchReducer (
  state: IState = INITIAL_STATE,
  action: FetchActionType
): IState{
  switch (action.type) {
    case FETCH_API:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.name]: true
        },
        errors: {
          ...state.errors,
          [action.payload.name]: null
        }
      };
    case FETCH_API_FAIL:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.name]: false
        },
        errors: {
          ...state.errors,
          [action.payload.name]: action.payload.error
        }
      };
    case FETCH_API_SUCCESS:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload]: false
        },
        errors: {
          ...state.errors,
          [action.payload]: null
        }
      };
    default:
      return state;
  }
}
