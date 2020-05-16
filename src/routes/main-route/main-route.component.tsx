import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/home-page/home-page.component';
import DetailPage from '../../pages/detail-page/detail-page.component';
import SavedPage from '../../pages/saved-page/saved-page.component';
import ProfilePage from '../../pages/profile-page/profile-page.component';
import ErrorMessage from '../../components/error-message/error-message.component';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { User } from '../../@types/user.interfaces';
import LoginPage from '../../pages/login-page/login-page.component';
import RegisterPage from '../../pages/register-page/register-page.component';
import PostPagePlain from '../../pages/post-page/post-page.components';
import AddPostPage from '../../pages/add-post-page/add-post-page.component';
import UserOnlyRoute from '../UserOnlyRoute';
import GuestOnlyRoute from '../GuestOnlyRoute';

interface IProps {
  user: User | null;
}

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage,
    guestOnly: true
  },
  {
    path: '/register',
    component: RegisterPage,
    guestOnly: true
  },
  {
    path: '/saved',
    component: SavedPage,
    userOnly: true
  },
  {
    path: '/post-detail/:id',
    component: DetailPage
  },
  {
    path: '/profile/:id',
    component: ProfilePage
  },
  {
    path: '/post',
    component: PostPagePlain,
    userOnly: true
  },
  {
    path: '/add-post',
    component: AddPostPage,
    userOnly: true
  }
];

function MainRoutePlain ({ user }: IProps){
  return (
    <div className="main-route">
      <Switch>
        {routes.map(
          ({ component, path, userOnly, guestOnly }) =>
            userOnly ? (
              <UserOnlyRoute
                path={path}
                exact
                key={path}
                component={component}
              />
            ) : guestOnly ? (
              <GuestOnlyRoute
                path={path}
                exact
                key={path}
                component={component}
              />
            ) : (
              <Route path={path} exact key={path} component={component} />
            )
        )}

        <Route
          path="*"
          render={() => (
            <ErrorMessage
              message="404: Page you requested not found"
              size={2}
            />
          )}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user: { self: { data } } }: GlobalState) => ({
  user: data
});

const MainRoute = connect(mapStateToProps)(MainRoutePlain);
export default MainRoute;
