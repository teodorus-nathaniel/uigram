import { IFetchApiNames } from './fetch.actions';

export default function createFetchSagaPattern (name: IFetchApiNames){
  return (action: any) =>
    action.payload.name === name && action.type === 'FETCH_API';
}
