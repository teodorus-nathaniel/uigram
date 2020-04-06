import {
  IFetchApiNames,
  fetchApiSuccess,
  fetchApiFail
} from '../fetch/fetch.actions';
import { put } from 'redux-saga/effects';

export default function createFetchFunction (name: IFetchApiNames, fn: any){
  return function* (...params: any[]){
    try {
      yield fn(...params);
      yield put(fetchApiSuccess(name));
    } catch (error) {
      yield put(fetchApiFail({ name, error }));
    }
  };
}
