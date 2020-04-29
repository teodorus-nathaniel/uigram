import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

export default function useHash (): [string, (val: string) => void]{
  const [ hash, setHash ] = useState(window.location.hash.substr(1));
  const location = useLocation();

  const handleHashChange = useCallback(
    () => {
      setHash(window.location.hash.substr(1));
    },
    [ setHash ]
  );

  const handleChange = (val: string) => {
    console.log(val);
    window.location.hash = val;
  };

  useEffect(
    () => {
      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    },
    [ handleHashChange ]
  );

  useEffect(
    () => {
      setHash(location.hash.substr(1));
    },
    [ location ]
  );

  return [ hash, handleChange ];
}
