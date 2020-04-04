import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../redux/root-reducer';

export default function useUserOnly (){
  const history = useHistory();
  const user = useSelector(({ user: { self: { data } } }: GlobalState) => data);
  useEffect(
    () => {
      if (!user) {
        history.push('/login');
      }
    },
    [ user, history ]
  );
}
