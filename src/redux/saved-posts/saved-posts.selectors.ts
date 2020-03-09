import { GlobalState } from './../root-reducer';
import { createSelector } from 'reselect';

const selectSavedPosts = (state: GlobalState) => state.savedPosts.savedPosts;

export const selectIsSaved = (id: string) => {
  return createSelector([ selectSavedPosts ], (savedPosts) => {
    console.log('MSUK', !!savedPosts.find((el) => el.id === id));
    return !!savedPosts.find((el) => el.id === id);
  });
};
