import { Post } from './../@types/post.interfaces';
import { IChangeSavedPayload } from '../redux/global-post-actions/global-post-actions';

export default function getAddToSavedListener (
  post: Post,
  dispatchAction: (payload: IChangeSavedPayload['data']) => void
){
  return () => {
    dispatchAction({ saved: !post.saved, post: post });
  };
}
