import './sidenav.styles.scss';

import React, { useEffect, useState } from 'react';

import Logo from '../../assets/images/logo.png';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import FollowersIcon from '../icons/followers/followers.component';
import FollowingIcon from '../icons/following/following.component';
import IconImage from '../icons/icon-image.component';
import SunIcon from '../icons/sun/sun.component';
import { Link, useLocation } from 'react-router-dom';

export default function Sidenav (){
  const [ isHovered, setIsHovered ] = useState(false);
  const [ isScrolled, setIsScrolled ] = useState(false);

  const location = useLocation();

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

  const navigations = [
    {
      path: '/saved',
      name: 'Saved',
      icon: BookmarkIcon
    },
    {
      path: '/following',
      name: 'Following',
      icon: FollowingIcon
    },
    {
      path: '/followers',
      name: 'Followers',
      icon: FollowersIcon
    }
  ];

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
        {navigations.map(({ icon: Icon, name, path }) => (
          <li key={path}>
            <Link to={path}>
              <Icon
                noHover
                color={
                  isHovered ? (
                    'white'
                  ) : location.pathname === path ? (
                    '#00a3ff'
                  ) : (
                    undefined
                  )
                }
              />
              <span>{name}</span>
            </Link>
          </li>
        ))}
        <li>
          <div>
            <SunIcon noHover color={isHovered ? 'white' : undefined} />
            <span>Color Mode</span>
          </div>
        </li>
      </ul>
    </aside>
  );
}
