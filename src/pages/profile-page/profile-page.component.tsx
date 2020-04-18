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
import { fetchApi } from '../../redux/fetch/fetch.actions';
import LoadingError from '../../components/loading-error/loading-error.component';
import { Post } from '../../@types/post.interfaces';
import useFetchCleanup from '../../effects/useFetchCleanup.effect';

interface IProps {
  user: { data: User | null; posts: { page: number; data: Post[] } };
  self: { data: User | null; posts: { page: number; data: Post[] } };
  isFetching?: boolean;
  error?: string;
  fetchUser: (id: string) => void;
  fetchUserPosts: (id: string, page: number, self?: boolean) => void;
}

function ProfilePagePlain ({
  user,
  self,
  isFetching,
  error,
  fetchUser,
  fetchUserPosts
}: IProps){
  useFetchCleanup('USER');

  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const { id } = match.params;

  useEffect(
    () => {
      if (isFetching || error) return;
      if (id === 'self' && !self.data) {
        history.push('/login');
      } else if (id !== 'self') {
        if (!user.data || user.data.id !== id) {
          fetchUser(id);
          fetchUserPosts(id, user.posts.page + 1);
        }
      } else if (self.posts.data.length === 0 && self.posts.page === 0) {
        fetchUserPosts(id, self.posts.page + 1, true);
      }
    },
    [ id, fetchUser, user, fetchUserPosts, self, history, isFetching, error ]
  );

  let displayUser = user;
  if (match.params.id === 'self') {
    displayUser = self;

    if (displayUser === null) {
      history.push('/login');
    }
  }

  return (
    <div className='profile-page'>
      <LoadingError isLoading={isFetching} error={error}>
        {displayUser.data ? (
          <div className='profile-container'>
            <UserProfile
              user={displayUser.data}
              page={displayUser.posts.page}
            />
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
  user: user,
  self: self,
  isFetching: isFetching.USER,
  error: errors.USER
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser: (id: string) => dispatch(fetchApi({ name: 'USER', data: { id } })),
  fetchUserPosts: (id: string, page: number, self?: boolean) =>
    dispatch(fetchApi({ name: 'FETCH_USER_POSTS', data: { id, page, self } }))
});

const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(
  ProfilePagePlain
);
export default ProfilePage;
