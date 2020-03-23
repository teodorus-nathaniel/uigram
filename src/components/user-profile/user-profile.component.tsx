import React from 'react';
import { User } from '../../@types/user.interfaces';
import ProfilePlaceholder from './../../assets/images/profile-icon.png';
import './user-profile.styles.scss';
import Button from '../button/button.component';

interface IProps {
  user: User;
}

export default function UserProfile ({ user }: IProps){
  const {
    email,
    followersCount,
    followingCount,
    fullname,
    username,
    profilePic,
    status
  } = user;
  return (
    <div className='user-profile'>
      <img src={profilePic || ProfilePlaceholder} alt='profile pic' />
      <span className='user-profile__username'>{username}</span>
      <span className='user-profile__fullname'>{fullname}</span>
      <span className='user-profile__status'>{status}</span>
      <div className='user-profile__follow'>
        <span className='user-profile__follow__content'>{`${followingCount} Following`}</span>
        <span>&#xb7;</span>
        <span className='user-profile__follow__content'>{`${followersCount} Followers`}</span>
      </div>
      {/* TODO: Change button if its the user or when user already follow */}
      <Button>Follow</Button>
    </div>
  );
}
