import './navbar.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './../../assets/images/logo.svg';

export default function Navbar (){
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <Link to='/'>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>
      <ul>
        <li className='inverted'>
          <Link to='/post'>Share your UI!</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </div>
  );
}
