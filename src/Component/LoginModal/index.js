import React, {useState} from 'react';
import { Modal } from 'antd';
import { API } from 'aws-amplify'
import { Buffer } from 'buffer'
import CloseIcon from '../../assets/logo/modalcloseicon.svg';
import HeaderLogo from '../../assets/logo/headerlogo.svg';
import facebookLogo from '../../assets/logo/facebooklogo.svg';
import './style.css';
import {useFormik} from "formik";
import LoginUser from "../../Schemas/LoginUser";
import FacebookLogin from "@greatsumini/react-facebook-login";
import events from "../../Util/dispatch";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Google from "./google";
import social from "../../Util/social";

const LoginModal = ({loginVisible, setLoginVisible, setRegisterModalVisible}) => {

  const [loginError, setLoginError] = useState('');
  const initialValues = {
    username: '',
    password: ''
  };
  const internalError = 'An internal error has occurred and is being investigated.'
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginUser,
    onSubmit: async (values, {resetForm}) => {
      try {
        const loginUser = {...values};
        loginUser.password = Buffer.from(values.password).toString('base64');
        const user = await API.post('tcgapi', '/users/login', { body: loginUser});
        events.loginEvent('standard', user);
      } catch (error) {
        const jsonErr = error.toJSON();
        if(jsonErr.status === 404) {
          handleError('Invalid login user')
        }
        else {
          handleError(internalError)
        }
      }
    }
  });

  const switchModal = () => {
    setLoginVisible(false);
    setRegisterModalVisible(true);
  }

  const facebookLogin = async () => {
    events.loadingEvent(true);
    await social.loginOrCreateFBUser(handleError);
    events.loadingEvent(false);
  }

  const googleLogin = async (res) => {
    events.loadingEvent(true);
    const token = res.access_token;
    await social.loginOrCreateGoogleUser(token, handleError);
    events.loadingEvent(false);
  }

  const handleError = ((msg) => {
    setLoginError(msg);
  })

  const closeModal = () => {
    document.getElementById('login-form').reset();
    setLoginVisible(false);
  }

  return (
    <div>
      <Modal className='login-modal-styling' footer={false} title="Basic Modal" visible={loginVisible} onCancel={closeModal} afterClose={closeModal}>
        <div className='login-modal-close-icon'>
          <img onClick={closeModal} className='modal-close-icon' src={CloseIcon} alt="close"/>
        </div>
        <div className='login-form-container'>
          <img className='login-header-logo' src={HeaderLogo} alt="header"/>
          <div className='login-content-container'>
            { loginError ? <div style={{ color: "#FF3333"}}>{loginError}</div> : <></>}
            <form id='login-form' onSubmit={formik.handleSubmit} onReset={() => formik.resetForm({ values: initialValues})}>
              <input className='authentication-input-field'
                     type='email'
                     name="username"
                     id="username"
                     placeholder='email'
                     onChange={formik.handleChange}
              />
              { formik.errors.username ? <div style={{color: "#FF3333"}}>{ formik.errors.username }</div> : <></>}
              <input className='authentication-input-field'
                     type='password'
                     name="password"
                     id="password"
                     placeholder='password'
                     onChange={formik.handleChange}
              />
              { formik.errors.password ? <div style={{color: "#FF3333"}}>{ formik.errors.password }</div> : <></>}
              <button type="submit" className='login-btn'>Login</button>
            </form>
            <div className='login-or-text'>or</div>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              scope="public_profile,email"
              fields="id,email,first_name,last_name"
              initParams={{
                version: process.env.REACT_APP_FACEBOOK_API_VERSION,
                xfbml: true
              }}
              dialogParams={{
                response_type: 'token'
              }}
              loginOptions={{
                return_scopes: true
              }}
              onSuccess={facebookLogin}
              onFail={() => handleError(internalError)}
              render={({onClick}) => (
                <div className='login-facebook-btn' onClick={onClick}>
                  <img className='facebook-logo' src={facebookLogo} alt="fb-logo"/>
                  <div className='facebook-btn-text'>Facebook</div>
                  <div></div>
                </div>
              )}
            />
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_APP_KEY}>
              <Google successCallback={googleLogin} errCallback={() => handleError(internalError)}/>
            </GoogleOAuthProvider>


            <div className='dont-have-account'>Need an account? <span onClick={switchModal} className='signup-text'>SIGN UP</span></div>
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default LoginModal;
