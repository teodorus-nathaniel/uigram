import { action, payload } from 'ts-action';
import { User } from '../../@types/user.interfaces';

export interface IFetchUserPayload {
  id: string;
}

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const LOAD_USER = 'LOAD_USER';

export const fetchUser = action(FETCH_USER, payload<IFetchUserPayload>());
export const fetchUserFailure = action(FETCH_USER_FAILURE, payload<Error>());
export const loadUser = action(LOAD_USER, payload<User>());

export type UserActionType =
  | ReturnType<typeof fetchUser>
  | ReturnType<typeof fetchUserFailure>
  | ReturnType<typeof loadUser>;

const UserActionAPI = {
  fetchUser
};

export default UserActionAPI;
