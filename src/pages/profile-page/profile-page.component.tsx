import React from 'react';
import UserProfile from '../../components/user-profile/user-profile.component';
import { dummyUser } from '../../dummy-datas/dummy-datas';
import './profile-page.styles.scss';
import UserContent from '../../components/user-content/user-content.component';

export default function ProfilePage (){
  const user = dummyUser;

  return (
    <div className='profile-page'>
      <UserProfile user={user} />
      <UserContent user={user} />
    </div>
  );
}
