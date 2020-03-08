import './sidenav.styles.scss';

import React, { useEffect, useState } from 'react';

import Logo from '../../assets/images/logo.png';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import FollowersIcon from '../icons/followers/followers.component';
import FollowingIcon from '../icons/following/following.component';
import IconImage from '../icons/icon-image.component';
import SunIcon from '../icons/sun/sun.component';
import { Link } from 'react-router-dom';

export default function Sidenav (){
  const [ isHovered, setIsHovered ] = useState(false);
  const [ isScrolled, setIsScrolled ] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(
    () => {
      function handleScrolled (){
        if (window.scrollY >= 67 && !isScrolled) setIsScrolled(true);
        else if (window.scrollY < 67 && isScrolled) setIsScrolled(false);
      }
      window.addEventListener('scroll', handleScrolled);
      return () => {
        window.removeEventListener('scroll', handleScrolled);
      };
    },
    [ isScrolled ]
  );

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='sidenav'>
      <ul>
        <li className={`sidenav__logo ${isScrolled ? '' : 'hide'}`}>
          <Link to='/'>
            <IconImage src={Logo} alt='Logo' />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BookmarkIcon noHover color={isHovered ? 'white' : undefined} />
            <span>Saved</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <FollowingIcon noHover color={isHovered ? 'white' : undefined} />
            <span>Following</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <FollowersIcon noHover color={isHovered ? 'white' : undefined} />
            <span>Followers</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <SunIcon noHover color={isHovered ? 'white' : undefined} />
            <span>Color Mode</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
