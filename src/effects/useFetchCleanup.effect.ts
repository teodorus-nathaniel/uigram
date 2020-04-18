import { useEffect } from 'react';
import {
  IFetchApiNames,
  fetchApiSuccess
} from './../redux/fetch/fetch.actions';
import { useDispatch } from 'react-redux';

export default function useFetchCleanup (key: IFetchApiNames){
  const dispatch = useDispatch();

  useEffect(
    () => {
      return () => {
        dispatch(fetchApiSuccess(key));
      };
    },
    [ key, dispatch ]
  );
}
