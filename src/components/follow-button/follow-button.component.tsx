import React, { Fragment } from 'react';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { User, UserBasicInfo } from '../../@types/user.interfaces';
import { GlobalState } from '../../redux/root-reducer';

import './follow-button.styles.scss';

interface IProps {
  owner: UserBasicInfo;
  user: User | null;
  followUser: (id: string) => void;
}

function FollowButtonPlain ({ owner, user, followUser }: IProps){
  const handleFollowClick = () => followUser(owner.id);
  return (
    <Fragment>
      {user && !owner.followed ? (
        <span>
          <span>&nbsp;- </span>
          <span onClick={handleFollowClick} className="follow-button">
            follow
          </span>
        </span>
      ) : null}
    </Fragment>
  );
}

const mapStateToProps = ({ user: { self: { data } } }: GlobalState) => ({
  user: data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  followUser: (payload: string) =>
    dispatch(fetchApi({ name: 'FOLLOW_USER', data: { id: payload } }))
});

const FollowButton = connect(mapStateToProps, mapDispatchToProps)(
  FollowButtonPlain
);
export default FollowButton;
