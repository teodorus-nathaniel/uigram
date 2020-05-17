import React, { useEffect } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import MainRoute from './routes/main-route/main-route.component';
import { connect } from 'react-redux';
import { GlobalState } from './redux/root-reducer';
import { User } from './@types/user.interfaces';
import { Dispatch } from 'redux';
import { fetchApi } from './redux/fetch/fetch.actions';

interface IProps {
  inDarkMode: boolean;
  user: User | null;
  isChecked: boolean;
  checkUser: () => void;
}

function AppPlain ({ user, inDarkMode, checkUser, isChecked }: IProps){
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
        {isChecked ? <MainRoute /> : null}
      </main>
    </div>
  );
}

const mapStateToProps = ({
  user: { self: { data }, isChecked },
  colorMode: { inDarkMode }
}: GlobalState) => ({
  inDarkMode,
  user: data,
  isChecked
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkUser: () => dispatch(fetchApi({ name: 'CHECK_USER' }))
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppPlain);

export default App;
