import { action, payload } from 'ts-action';
import { Post } from './../../@types/post.interfaces';

export interface IChangeSavedPayload {
  name: 'CHANGE_SAVED';
  data: {
    post: Post;
    saved: boolean;
  };
}
export interface IChangeLikesOrDislikesPayload {
  name: 'CHANGE_LIKES_OR_DISLIKES';
  data: {
    id: string;
    like?: boolean;
    dislike?: boolean;
  };
}

export const CHANGE_SAVED = 'CHANGE_SAVED';
export const CHANGE_LIKES_OR_DISLIKES = 'CHANGE_LIKES_OR_DISLIKES';

export const changeSaved = action(
  CHANGE_SAVED,
  payload<IChangeSavedPayload['data']>()
);
export const changeLikesOrDislikes = action(
  CHANGE_LIKES_OR_DISLIKES,
  payload<IChangeLikesOrDislikesPayload['data']>()
);

export type GlobalPostActionType =
  | ReturnType<typeof changeSaved>
  | ReturnType<typeof changeLikesOrDislikes>;
