import { put } from 'redux-saga/effects';
export default function catchAsync (
  fn: any,
  errorHandling: (error: Error) => any
){
  return function* (...params: any[]){
    try {
      yield fn(...params);
    } catch (error) {
      yield put(errorHandling(error));
    }
  };
}
