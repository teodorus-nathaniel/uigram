import React from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import MainRoute from './routes/main-route/main-route.component';

function App (){
  return (
    <div className='App'>
      <Sidenav />
      <Navbar />
      <main>
        <MainRoute />
      </main>
    </div>
  );
}

export default App;
