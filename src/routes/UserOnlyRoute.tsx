import React, { ReactElement, FunctionComponent } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from '../@types/user.interfaces';
import { GlobalState } from '../redux/root-reducer';

interface Props extends RouteProps {
  component: FunctionComponent<any>;
  user: User | null;
}

function UserOnlyRoutePlain ({
  user,
  component: Component,
  ...rest
}: Props): ReactElement{
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
}

const mapStateToProps = ({ user: { self: { data } } }: GlobalState) => ({
  user: data
});

const UserOnlyRoute = connect(mapStateToProps)(UserOnlyRoutePlain);
export default UserOnlyRoute;
