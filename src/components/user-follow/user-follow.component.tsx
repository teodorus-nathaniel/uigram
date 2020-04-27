import React from 'react';
import { User } from '../../@types/user.interfaces';
import UserInfo from '../user-info/user-info.component';
import './user-follow.styles.scss';
import Button from '../button/button.component';
import LoadingError from '../loading-error/loading-error.component';
import ErrorMessage from '../error-message/error-message.component';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';

interface IProps {
  self: User | null;
  listUser: User[];
  noDataMessage: string;
  isFetching?: boolean;
  error?: Error;
}

function UserFollowPlain ({
  listUser,
  isFetching,
  error,
  self,
  noDataMessage
}: IProps){
  return (
    <div className="user-follow">
      {
        <LoadingError
          error={error ? error.message : undefined}
          isLoading={isFetching}>
          {listUser ? listUser.length === 0 ? (
            <ErrorMessage message={noDataMessage} size={2} />
          ) : (
            <ul>
              {listUser.map((user) => (
                <li key={user.id}>
                  <UserInfo user={user} />
                  {user.followed ||
                  !self ||
                  (self && self.id === user.id) ? null : (
                    <Button>Follow</Button>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </LoadingError>
      }
    </div>
  );
}

const mapStateToProps = ({ user: { self: { data } } }: GlobalState) => ({
  self: data
});

const UserFollow = connect(mapStateToProps)(UserFollowPlain);
export default UserFollow;
