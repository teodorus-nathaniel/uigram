import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import MainRoute from './routes/main-route/main-route.component';
import { connect } from 'react-redux';
import { GlobalState } from './redux/root-reducer';
import { User } from './@types/user.interfaces';
import { Dispatch } from 'redux';
import { useLocation, useHistory } from 'react-router-dom';
import { setCookie, getCookie } from './redux/utils/cookie';
import { fetchApi } from './redux/fetch/fetch.actions';

interface IProps {
  inDarkMode: boolean;
  user: User | null;
  checkUser: () => void;
}

function AppPlain ({ user, inDarkMode, checkUser }: IProps){
  const location = useLocation();
  const history = useHistory();
  const [ hasRedirected, setHasRedirected ] = useState(false);
  const lastPath = useRef(location.pathname);

  useEffect(
    () => {
      checkUser();
    },
    [ checkUser ]
  );

  useEffect(
    () => {
      if (!hasRedirected && user) {
        if (lastPath.current !== '' && lastPath.current) {
          history.push(lastPath.current);
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
  checkUser: () => dispatch(fetchApi({ name: 'CHECK_USER' }))
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppPlain);

export default App;
