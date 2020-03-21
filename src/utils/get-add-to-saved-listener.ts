import { Post } from './../@types/post.interfaces';
import { IAddOrRemovePostPayload } from '../redux/saved-posts/saved-posts.actions';

export default function getAddToSavedListener (
  post: Post,
  dispatchAction: (payload: IAddOrRemovePostPayload) => void
){
  return () => {
    if (post.saved) {
      dispatchAction({ type: 'remove', post: post });
    } else {
      dispatchAction({ type: 'add', post: post });
    }
  };
}
