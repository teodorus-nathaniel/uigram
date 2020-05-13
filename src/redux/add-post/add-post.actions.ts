import { action, payload } from 'ts-action';

export interface IAddPostUsingUrlPayload {
  name: 'ADD_URL_POST';
  data: {
    url: string;
  };
}

export const ADD_POST = 'ADD_POST';
export const CLEAR_URL_POST = 'CLEAR_URL_POST';
export const ADD_URL_POST = 'ADD_URL_POST';
export const CLEAR_ALL_STATE = 'CLEAR_ALL_STATE';

export const addPost = action(ADD_POST, payload<{ image: string }>());
export const clearUrlPost = action(CLEAR_URL_POST);
export const addUrlPost = action(ADD_URL_POST, payload<{ image: string }>());
export const clearAllState = action(CLEAR_ALL_STATE);

type AddPostActionType =
  | ReturnType<typeof addPost>
  | ReturnType<typeof clearUrlPost>
  | ReturnType<typeof addUrlPost>
  | ReturnType<typeof clearAllState>;

export default AddPostActionType;
