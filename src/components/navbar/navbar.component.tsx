import './navbar.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './../../assets/images/logo.png';

export default function Navbar (){
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <img src={Logo} alt='Logo' />
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
