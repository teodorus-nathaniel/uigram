import React, { useState } from 'react';
import IconImage from '../icons/icon-image.component';

import Logo from './../../assets/images/logo.png';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import './sidenav.styles.scss';
import SunIcon from '../icons/sun/sun.component';
import FollowingIcon from '../icons/following/following.component';
import FollowersIcon from '../icons/followers/followers.component';

export default function Sidenav (){
  const [ isHovered, setIsHovered ] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <aside
      className='sidenav'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ul>
        <li className='sidenav__logo'>
          <IconImage src={Logo} alt='Logo' />
          <span>Home</span>
        </li>
        <li>
          <BookmarkIcon color={isHovered ? 'white' : undefined} />
          <span>Saved</span>
        </li>
        <li>
          <FollowingIcon color={isHovered ? 'white' : undefined} />
          <span>Following</span>
        </li>
        <li>
          <FollowersIcon color={isHovered ? 'white' : undefined} />
          <span>Followers</span>
        </li>
        <li>
          <SunIcon color={isHovered ? 'white' : undefined} />
          <span>Color Mode</span>
        </li>
      </ul>
    </aside>
  );
}
