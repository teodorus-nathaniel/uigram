import { IFetchApiNames } from './fetch.actions';

export default function createFetchSagaPattern (name: IFetchApiNames){
  return (action: any) =>
    action.type === 'FETCH_API' && action.payload.name === name;
}
