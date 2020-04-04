import React from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import MainRoute from './routes/main-route/main-route.component';
import { connect } from 'react-redux';
import { GlobalState } from './redux/root-reducer';
import { User } from './@types/user.interfaces';

interface IProps {
  inDarkMode: boolean;
  user: User | null;
}

function AppPlain ({ user, inDarkMode }: IProps){
  if (inDarkMode) {
    document.body.classList.add('dark');
  }

  return (
    <div className='App'>
      {user ? <Sidenav /> : null}
      <Navbar />
      <main style={{ marginLeft: user ? '55px' : '0' }}>
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

const App = connect(mapStateToProps)(AppPlain);

export default App;
