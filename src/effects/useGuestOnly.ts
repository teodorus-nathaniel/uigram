import { useHistory } from 'react-router-dom';
import { User } from './../@types/user.interfaces';
import { useEffect } from 'react';

export default function useGuestOnly (user: User | null){
  const history = useHistory();
  useEffect(
    () => {
      if (user) {
        history.push('/');
      }
    },
    [ user, history ]
  );
}
