import { action, payload } from 'ts-action';

export interface IAddPostUsingUrlPayload {
  name: 'ADD_URL_POST';
  data: {
    url: string;
  };
}

export const CLEAR_TEMP_POST = 'CLEAR_TEMP_POST';
export const ADD_TEMP_POST = 'ADD_TEMP_POST';
export const ADD_POST = 'ADD_POST';
export const CLEAR_ALL_STATE = 'CLEAR_ALL_STATE';
export const REMOVE_POST = 'REMOVE_POST';
export const CHANGE_DESC = 'CHANGE_DESC';
export const CHANGE_LINK = 'CHANGE_LINK';

export const clearTempPost = action(CLEAR_TEMP_POST);
export const addTempPost = action(ADD_TEMP_POST, payload<{ image: string }>());
export const addPost = action(ADD_POST, payload<{ image: string }>());
export const clearAllState = action(CLEAR_ALL_STATE);
export const removePost = action(REMOVE_POST, payload<{ index: number }>());
export const changeDesc = action(CHANGE_DESC, payload<string>());
export const changeLink = action(CHANGE_LINK, payload<string>());

type AddPostActionType =
  | ReturnType<typeof addPost>
  | ReturnType<typeof clearTempPost>
  | ReturnType<typeof addTempPost>
  | ReturnType<typeof clearAllState>
  | ReturnType<typeof removePost>
  | ReturnType<typeof changeDesc>
  | ReturnType<typeof changeLink>;

export default AddPostActionType;
