import { GlobalState } from './../root-reducer';
import { createSelector } from 'reselect';

const selectSavedPosts = (state: GlobalState) => state.savedPosts.savedPosts;

export const selectIsSaved = (id: string) => {
  console.log('object');
  return createSelector(
    [ selectSavedPosts ],
    (savedPosts) => !!savedPosts.find((el) => el.id === id)
  );
};
