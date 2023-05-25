import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderLogo from '../../assets/logo/headerlogo.svg';
import UserIcon from '../../assets/logo/usericon.svg';
import LoginModal from '../../Component/LoginModal';
import RegistrationModal from '../../Component/RegistrationModal';
import './style.css';
import TokenModal from "../TokenModal";
import {GoogleOAuthProvider} from "@react-oauth/google";
import events from "../../Util/dispatch";
import {Avatar} from "@mui/material";


const SignInHeader = ({ user }) => {

  const navigate = useNavigate();
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);

  const showModal = () => {
    setRegisterModalVisible(true);
  };

  const showLoginModal = () => {
    setLoginVisible(true);
  };

  const showTokenModal = () => {
    setTokenVisible(true);
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(firstName, lastName) {
    return {
      sx: {
        bgcolor: stringToColor(`${firstName} ${lastName}`),
      },
      children: `${firstName.at(0)}${lastName.at(0)}`
    };
  }


  return (
    <div className='signin-header-container'>
      <img onClick={() => { navigate('/') }} className='signin-header-logo mobile-logo' src={HeaderLogo} alt="header-logo"/>
      {user != null &&
        <>
          <div className='credit-container' onClick={showTokenModal}>
            <div className='credit-numbers'>{user?.tokens}</div>
            <div className='credit-text'>Tokens</div>
          </div>
          <TokenModal tokenVisible={tokenVisible} handleCancel={() => setTokenVisible(false)} />
        </>
      }
      <div className='header-btns-container mobile-view-profile'>
        <div>
          {
            !user ?
              <>
                <button onClick={showLoginModal} style={{ backgroundColor: loginVisible && '#D3A341' }} className='header-login-btn'>Log In</button>
                <button onClick={showModal} style={{ backgroundColor: registerModalVisible && '#D3A341' }} className='header-login-btn'>Sign Up</button>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_APP_KEY}>
                  <LoginModal loginVisible={loginVisible} setLoginVisible={setLoginVisible} setRegisterModalVisible={setRegisterModalVisible} />
                </GoogleOAuthProvider>
                <RegistrationModal registerModalVisible={registerModalVisible} setRegisterModalVisible={setRegisterModalVisible} setLoginVisible={setLoginVisible} />
              </>
              :
              <div className='logout-btn-relative-container' >
                <div className="dropdown">
                <div className='user-profile-container'>
                  <div className='user-profile'>
                    {!user.avatar ?
                      <Avatar {...stringAvatar(user.firstName, user.lastName)} />
                      :
                      <Avatar {...stringAvatar(user.firstName, user.lastName)} />}
                  </div>
                  <div className='user-name'>{user.firstName} {user.lastName}</div>
                  <div className="dropdown-content">
                  {user &&
                    <>
                      <div onClick={() => navigate('/profile')}>Profile</div>
                      <div onClick={() => navigate('/prizes')}>My Prizes</div>
                      <div onClick={events.logoutEvent}>Log Out</div>
                      </>}
                  </div>
                </div>
                </div>

              </div>

          }
        </div>
      </div>
    </div>
  );
};
export default SignInHeader;
