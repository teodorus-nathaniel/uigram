import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostPreview from '../../components/post-preview/post-preview.component';
import HomePage from '../../pages/home-page/home-page.component';

export default function MainRoute (){
  return (
    <div className='main-route'>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/detail' exact component={PostPreview} />
      </Switch>
    </div>
  );
}
