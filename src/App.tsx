import React, { useEffect } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import MainRoute from './routes/main-route/main-route.component';
import { connect } from 'react-redux';
import { GlobalState } from './redux/root-reducer';
import { User } from './@types/user.interfaces';
import { Dispatch } from 'redux';
import { checkUser } from './redux/user/user.actions';

interface IProps {
  inDarkMode: boolean;
  user: User | null;
  checkUser: () => void;
}

function AppPlain ({ user, inDarkMode, checkUser }: IProps){
  useEffect(
    () => {
      checkUser();
    },
    [ checkUser ]
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
