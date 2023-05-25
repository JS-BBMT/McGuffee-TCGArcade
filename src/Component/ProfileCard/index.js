import React from 'react';
import './style.css';
const ProfileCard = ({ title, children }) => {
  return (
    <div className='profile-card-main-container'>
      <div className='profile-card-header-container'>
        <div className='profile-left-header-border'></div>
        <div className='profile-card-name'>{title}</div>
        <div className='profile-right-header-border'></div>
      </div>
      <div className='profile-card-content-container'>
        {children}
      </div>
    </div>
  );
};

export default ProfileCard;
