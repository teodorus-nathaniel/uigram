import { useState, useEffect } from 'react';
import getFetchInstance from '../redux/utils/fetch';
import getDataFromResponse from '../redux/utils/get-data-from-res';

export default function useFetch (
  path: string | undefined,
  dataName: string
): [any, boolean, null | Error]{
  const [ data, setData ] = useState(null);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ error, setError ] = useState<Error | null>(null);

  useEffect(
    () => {
      async function getData (){
        try {
          if (!path) throw new Error('Path unspecified');
          setError(null);
          setIsFetching(true);
          const res = await getFetchInstance().get(path);
          const data = getDataFromResponse(res);
          setData(data[dataName]);
          setIsFetching(false);
        } catch (error) {
          setError(error);
        }
      }
      getData();
    },
    [ dataName, path ]
  );

  return [ data, isFetching, error ];
}
