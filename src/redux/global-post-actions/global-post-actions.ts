import { action, payload } from 'ts-action';
import { Post } from './../../@types/post.interfaces';

export interface IChangeSavedPayload {
  post: Post;
  saved: boolean;
}
export interface IChangeLikesOrDislikesPayload {
  id: string;
  like?: boolean;
  dislike?: boolean;
}

export const UPDATE_SAVED = 'UPDATE_SAVED';
export const CHANGE_SAVED = 'CHANGE_SAVED';
export const UPDATE_LIKES_OR_DISLIKES = 'UPDATE_LIKES_OR_DISLIKES';
export const CHANGE_LIKES_OR_DISLIKES = 'CHANGE_LIKES_OR_DISLIKES';

export const updateSaved = action(UPDATE_SAVED, payload<IChangeSavedPayload>());
export const changeSaved = action(CHANGE_SAVED, payload<IChangeSavedPayload>());
export const updateLikesOrDislikes = action(
  UPDATE_LIKES_OR_DISLIKES,
  payload<IChangeLikesOrDislikesPayload>()
);
export const changeLikesOrDislikes = action(
  CHANGE_LIKES_OR_DISLIKES,
  payload<IChangeLikesOrDislikesPayload>()
);

export type GlobalPostActionType =
  | ReturnType<typeof changeSaved>
  | ReturnType<typeof updateLikesOrDislikes>
  | ReturnType<typeof changeLikesOrDislikes>;

export const GlobalPostActionAPI = {
  updateSaved,
  updateLikesOrDislikes
};

export default GlobalPostActionAPI;
