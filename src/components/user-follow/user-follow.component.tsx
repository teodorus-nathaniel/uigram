import React from 'react';
import { User } from '../../@types/user.interfaces';
import UserInfo from '../user-info/user-info.component';
import './user-follow.styles.scss';
import Button from '../button/button.component';
import LoadingError from '../loading-error/loading-error.component';
import ErrorMessage from '../error-message/error-message.component';

interface IProps {
  listUser: User[];
  noDataMessage: string;
  isFetching?: boolean;
  error?: Error;
}

export default function UserFollow ({
  listUser,
  isFetching,
  error,
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
                  {user.followed ? <Button>Follow</Button> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </LoadingError>
      }
    </div>
  );
}
