import React, { useState, Fragment } from 'react';
import { User } from '../../@types/user.interfaces';
import ProfilePlaceholder from './../../assets/images/profile-icon.png';
import './user-profile.styles.scss';
import Button from '../button/button.component';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { connect } from 'react-redux';
import UpdateProfileModal from '../update-profile-modal/update-profile-modal.component';
import { logout } from '../../redux/user/user.actions';

interface IProps {
  user: User;
  page: number;
  unfollow: (id: string) => void;
  follow: (id: string) => void;
  isSelf: boolean;
  logout: () => void;
}

function UserProfilePlain ({ user, unfollow, follow, isSelf, logout }: IProps){
  const [ openModal, setOpenModal ] = useState(false);
  const {
    id,
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
      <UpdateProfileModal
        user={user}
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />
      <img src={profilePic || ProfilePlaceholder} alt="profile pic" />
      <div>
        <span className="user-profile__username">{username}</span>
        <span className="user-profile__fullname">{fullname}</span>
        <p className="user-profile__status">{status}</p>
        <div className="user-profile__follow">
          <span className="user-profile__follow__content">{`${followingCount} Following`}</span>
          <span>&#xb7;</span>
          <span className="user-profile__follow__content">{`${followersCount} Followers`}</span>
        </div>
        {isSelf ? (
          <Fragment>
            <Button onClick={() => setOpenModal(true)}>Update Profile</Button>

            <div className="user-profile__update-info">
              {status ? null : <span>Add status to your profile!</span>}
              {fullname ? null : <span>Tell us your full name!</span>}
            </div>
          </Fragment>
        ) : (
          <Button
            alt={followed}
            onClick={followed ? handleUnfollowClick : handleFollowClick}>
            {followed ? 'Unfollow' : 'Follow'}
          </Button>
        )}
        <Button className="user-profile__logout" red onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unfollow: (id: string) =>
    dispatch(fetchApi({ name: 'UNFOLLOW_USER', data: { id } })),
  follow: (id: string) =>
    dispatch(fetchApi({ name: 'FOLLOW_USER', data: { id } })),
  logout: () => dispatch(logout())
});

const UserProfile = connect(null, mapDispatchToProps)(UserProfilePlain);
export default UserProfile;
