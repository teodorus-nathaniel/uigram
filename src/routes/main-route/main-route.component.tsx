import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/home-page/home-page.component';
import DetailPage from '../../pages/detail-page/detail-page.component';
import SavedPage from '../../pages/saved-page/saved-page.component';
import ProfilePage from '../../pages/profile-page/profile-page.component';
import ErrorMessage from '../../components/error-message/error-message.component';

export default function MainRoute (){
  return (
    <div className='main-route'>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/saved' exact component={SavedPage} />
        <Route path='/post-detail/:id' exact component={DetailPage} />
        <Route path='/profile/:id' exact component={ProfilePage} />

        <Route
          path='*'
          render={() => (
            <ErrorMessage message='404 Page you requested not found' />
          )}
        />
      </Switch>
    </div>
  );
}
