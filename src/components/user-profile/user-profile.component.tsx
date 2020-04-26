import React from 'react';
import { User } from '../../@types/user.interfaces';
import ProfilePlaceholder from './../../assets/images/profile-icon.png';
import './user-profile.styles.scss';
import Button from '../button/button.component';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { connect } from 'react-redux';

interface IProps {
  user: User;
  page: number;
  unfollow: (id: string) => void;
  follow: (id: string) => void;
}

function UserProfilePlain ({ user, unfollow, follow }: IProps){
  const {
    id,
    // email,
    followersCount,
    followingCount,
    fullname,
    username,
    profilePic,
    status,
    followed
  } = user;

  const handleUnfollowClick = () => unfollow(id);
  const handleFollowClick = () => follow(id);

  return (
    <div className="user-profile">
      <img src={profilePic || ProfilePlaceholder} alt="profile pic" />
      <span className="user-profile__username">{username}</span>
      <span className="user-profile__fullname">{fullname}</span>
      <span className="user-profile__status">{status}</span>
      <div className="user-profile__follow">
        <span className="user-profile__follow__content">{`${followingCount} Following`}</span>
        <span>&#xb7;</span>
        <span className="user-profile__follow__content">{`${followersCount} Followers`}</span>
      </div>
      <Button
        alt={followed}
        onClick={followed ? handleUnfollowClick : handleFollowClick}>
        {followed ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unfollow: (id: string) =>
    dispatch(fetchApi({ name: 'UNFOLLOW_USER', data: { id } })),
  follow: (id: string) =>
    dispatch(fetchApi({ name: 'FOLLOW_USER', data: { id } }))
});

const UserProfile = connect(null, mapDispatchToProps)(UserProfilePlain);
export default UserProfile;
