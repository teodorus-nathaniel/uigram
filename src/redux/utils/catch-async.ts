import { IFetchApiNames } from './../fetch/fetch.actions';
import { put } from 'redux-saga/effects';

export default function catchAsync (
  name: IFetchApiNames,
  fn: any,
  errorHandling: (payload: { name: IFetchApiNames; error: Error }) => any
){
  return function* (...params: any[]){
    try {
      yield fn(...params);
    } catch (error) {
      yield put(errorHandling({ name, error }));
    }
  };
}
