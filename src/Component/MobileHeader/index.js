import React from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderLogo from '../../assets/logo/headerlogo.svg';
import UserImage from '../../assets/images/userimage.svg';
import './style.css';

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='mobile-header-container'>
      <img  onClick={() => { navigate('/') }}  className='mobile-header-logo' src={HeaderLogo} alt="header-logo"/>
      <div className='mobile-user-profile-container'>
        <img className='mobile-user-image' src={UserImage} alt="user"/>
        <div className='mobile-credit-container'>
        <div className='mobile-credit-numbers'>8</div>
        <div className='mobile-credit-text'>Credits</div>
      </div>
      </div>
    </div>
  );
};

export default MobileHeader;
