import './navbar.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './../../assets/images/logo.svg';
import { User } from '../../@types/user.interfaces';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';

interface IProps {
  user: User | null;
}

const navigations = {
  user: [
    {
      link: '/post',
      text: 'Share your Design!',
      inverted: true
    },
    {
      link: '/profile/self',
      text: 'Profile'
    }
  ],
  noUser: [
    {
      link: '/register',
      text: 'Join us!',
      inverted: true
    },
    {
      link: '/login',
      text: 'Login'
    }
  ]
};

function NavbarPlain ({ user }: IProps){
  const usedNav = user ? navigations.user : navigations.noUser;

  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <Link to='/'>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>
      <ul>
        {usedNav.map(({ link, text, inverted }) => (
          <li key={link} className={`${inverted ? 'inverted' : ''}`}>
            <Link to={link}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = ({ user: { self } }: GlobalState) => ({
  user: self
});

const Navbar = connect(mapStateToProps)(NavbarPlain);
export default Navbar;
