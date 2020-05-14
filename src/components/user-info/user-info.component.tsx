import React from 'react';
import { UserBasicInfo } from '../../@types/user.interfaces';
import ProfilePic from './../../assets/images/avatar.png';
import { useHistory } from 'react-router-dom';
import './user-info.styles.scss';

interface IProps {
  user: UserBasicInfo;
}

export default function UserInfo ({ user }: IProps){
  const history = useHistory();
  const spanClickHandler = () => history.push(`/profile/${user.id}`);

  return (
    <div className="user-info">
      <img src={user.profilePic || ProfilePic} alt="profile" />
      <span onClick={spanClickHandler}>{user.username}</span>
    </div>
  );
}
