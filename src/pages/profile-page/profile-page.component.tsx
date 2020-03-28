import React, { useEffect } from 'react';
import UserProfile from '../../components/user-profile/user-profile.component';
import './profile-page.styles.scss';
import UserContent from '../../components/user-content/user-content.component';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { User } from '../../@types/user.interfaces';
import ErrorMessage from '../../components/error-message/error-message.component';
import { dummyUser } from '../../dummy-datas/dummy-datas';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import LoadingError from '../../components/loading-error/loading-error.component';

interface IProps {
  user: User | null;
  self: User | null;
  isFetching?: boolean;
  error?: Error | null;
  fetchUser: (id: string) => void;
}

function ProfilePagePlain ({
  user,
  self,
  isFetching,
  error,
  fetchUser
}: IProps){
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const { id } = match.params;

  useEffect(
    () => {
      if (id !== 'self') {
        if (!user || user.id !== id) {
          fetchUser(id);
        }
      }
    },
    [ id, fetchUser, user ]
  );

  let displayUser = user;
  if (match.params.id === 'self') {
    displayUser = self;
    // TODO: REMOVE THIS IS FOR TESTING
    displayUser = dummyUser;

    if (displayUser === null) {
      history.push('/login');
    }
  }

  return (
    <div className='profile-page'>
      <LoadingError isLoading={isFetching} error={error}>
        {displayUser ? (
          <div className='profile-container'>
            <UserProfile user={displayUser} />
            <UserContent user={displayUser} />
          </div>
        ) : (
          <ErrorMessage message='User not found' />
        )}
      </LoadingError>
    </div>
  );
}

const mapStateToProps = ({
  user: { user, self },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  user,
  self,
  isFetching: isFetching.USER,
  error: errors.USER
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser: (id: string) => dispatch(fetchApi({ name: 'USER', data: { id } }))
});

const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(
  ProfilePagePlain
);
export default ProfilePage;
