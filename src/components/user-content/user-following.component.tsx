import React from 'react';
import UserFollow from '../user-follow/user-follow.component';
import { User } from '../../@types/user.interfaces';
import useFetch from '../../effects/useFetch.effect';
import { Post } from '../../@types/post.interfaces';

interface IProps {
  user: { data: User | null; posts: { page: number; data: Post[] } };
}

export default function UserFollowing ({ user }: IProps){
  const [ users, isFetching, error ] = useFetch(
    user.data ? `/users/${user.data.id}/following` : undefined,
    'users'
  );

  return (
    <UserFollow
      noDataMessage="You haven't followed anyone yet."
      listUser={users}
      isFetching={isFetching}
      error={error || undefined}
    />
  );
}
