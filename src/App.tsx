import React, { useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import MainRoute from './routes/main-route/main-route.component';
import { connect } from 'react-redux';
import { GlobalState } from './redux/root-reducer';
import { User } from './@types/user.interfaces';
import { Dispatch } from 'redux';
import { checkUser } from './redux/user/user.actions';
import { useLocation, useHistory } from 'react-router-dom';
import { setCookie, getCookie } from './redux/utils/cookie';

interface IProps {
  inDarkMode: boolean;
  user: User | null;
  checkUser: () => void;
}

function AppPlain ({ user, inDarkMode, checkUser }: IProps){
  const location = useLocation();
  const history = useHistory();
  const [ hasRedirected, setHasRedirected ] = useState(false);
  const [ lastPath, setLastPath ] = useState<undefined | string>(undefined);

  useEffect(
    () => {
      const lastPath = getCookie('last-path');
      setLastPath(lastPath);
      setCookie('last-path', location.pathname, 0);
      console.log(location.pathname);
    },
    [ location.pathname ]
  );

  useEffect(
    () => {
      checkUser();
    },
    [ checkUser ]
  );

  useEffect(
    () => {
      if (!hasRedirected && user) {
        if (lastPath !== '' && lastPath) {
          history.push(lastPath);
        }
        setHasRedirected(true);
      }
    },
    [ user, hasRedirected, history, lastPath ]
  );

  if (inDarkMode) {
    document.body.classList.add('dark');
  }

  return (
    <div className="App">
      {user ? <Sidenav /> : null}
      <Navbar />
      <main className={!user ? 'no-user' : ''}>
        <MainRoute />
      </main>
    </div>
  );
}

const mapStateToProps = ({
  user: { self: { data } },
  colorMode: { inDarkMode }
}: GlobalState) => ({
  inDarkMode,
  user: data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkUser: () => dispatch(checkUser())
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppPlain);

export default App;
