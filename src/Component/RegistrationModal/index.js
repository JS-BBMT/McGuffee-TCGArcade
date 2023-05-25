import React, {useState} from 'react';
import {Modal, DatePicker} from 'antd';
import {useFormik} from "formik";
import { Buffer } from 'buffer'
import CloseIcon from '../../assets/logo/modalcloseicon.svg';
import HeaderLogo from '../../assets/logo/headerlogo.svg';
import facebookLogo from '../../assets/logo/facebooklogo.svg';
import './style.css';
import '../../assets/styles/form.css'
import { API } from "aws-amplify";
import SignUpUser from "../../Schemas/SignUpUser";
import {ClockLoader} from "react-spinners";
import events from "../../Util/dispatch"
import FacebookLogin, {FacebookLoginClient} from "@greatsumini/react-facebook-login";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Google from "../LoginModal/google";

const RegistrationModal = ({registerModalVisible, setRegisterModalVisible, setLoginVisible}) => {
  const [registrationError, setRegistrationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    birthdate: ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpUser,
    onSubmit: async (values) => {
      setLoading(true);
      const tandc = document.getElementById('tandc').checked;
      if(!tandc) {
        setRegistrationError('You must accept the terms and conditions')
        setLoading(false);
      } else {
        try {
          const user = { ...values };
          user.password = Buffer.from(user.password).toString('base64');
          user.email = user.username;
          const newUser = JSON.parse(await API.post('tcgapi','/users', {body : user}));
          events.loginEvent('standard', newUser)
          setRegisterModalVisible(false);
        } catch (error) {
          const jsonErr = error.toJSON();
          if(jsonErr.status === 400) {
            setRegistrationError("Username already in use");
          }
        }
        setLoading(false);
      }

    },
  });

  const facebookLogin = () => {
    FacebookLoginClient.getProfile((profile) => {
      events.loginEvent('facebook',profile);
    }, {fields: "first_name, last_name, email, id"})
  }

  const closeModal = () => {
    document.getElementById('registration-form').reset();
    setRegisterModalVisible(false);
  }


  return (
    <div>
      <Modal className='register-modal-styling' footer={false} title="Basic Modal" visible={registerModalVisible}
             onCancel={closeModal}>
        <div className='register-modal-close-icon-container'>
          <img onClick={closeModal} className='register-modal-close-icon' src={CloseIcon} alt="close"/>
        </div>
        <div className='registration-form-container'>
          <img className='registration-header-logo' src={HeaderLogo} alt="header-logo"/>
          <div className='registration-content-container'>
            { registrationError ? <div className="form-error">{registrationError}</div> : <></>}
            <form id="registration-form" onSubmit={formik.handleSubmit} onReset={() => formik.resetForm({values: initialValues})}>
              <input className='registration-authentication-input-field'
                     type='email'
                     placeholder='email'
                     name="username"
                     id="username"
                     onChange={formik.handleChange}
              />
              { formik.errors.username ? <div className="form-error">{ formik.errors.username }</div> : <></>}
              <input className='registration-authentication-input-field'
                     type='password'
                     placeholder='password'
                     name="password"
                     id="password"
                     onChange={formik.handleChange}
              />
              {formik.errors.password && <div className="form-error">{formik.errors.password}</div> }
              <input className='registration-authentication-input-field'
                     type='text'
                     placeholder='First Name'
                     name="firstName"
                     id="firstName"
                     onChange={formik.handleChange}
              />
              {formik.errors.firstName && <div className="form-error">{formik.errors.firstName}</div> }
              <input className='registration-authentication-input-field'
                     type='text'
                     placeholder='Last Name'
                     name="lastName"
                     id="lastName"
                     onChange={formik.handleChange}
              />
              {formik.errors.lastName && <div className="form-error">{formik.errors.lastName}</div> }
              <DatePicker className='registration-authentication-input-field'
                          placeholder='Birthday'
                          name="birthdate"
                          id="birthdate"
                          format="MM/DD/YYYY"
                          onChange={(date, dateString) => formik.setFieldValue("birthdate", dateString)}
              />
              {formik.errors.birthdate && <div className="form-error">{formik.errors.birthdate}</div> }
              <button type="submit" className='registration-btn' disabled={loading}>{ loading ? <ClockLoader size={25} /> : 'Register'}</button>
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
              render={({onClick}) => (
                <div className='login-facebook-btn' onClick={onClick}>
                  <img className='facebook-logo' src={facebookLogo} alt="fb-logo"/>
                  <div className='facebook-btn-text'>Facebook</div>
                  <div></div>
                </div>
              )}
            />
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_APP_KEY}>
              <Google />
            </GoogleOAuthProvider>
            <div className='checkbox-conditions-container'>
              <label className="checkbox-container">
                <input type="checkbox" name="tandc" id="tandc"></input>
                <div className="checkmark"></div>
              </label>
              <div className='accept-text'>Accept<span className='tc-span-text'>Term & Conditions</span></div>
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked={true} name="newsletter" id="newsletter"></input>
                <div className="checkmark"></div>
              </label>
              <div className='accept-text'>Subscribe to Newsletter</div>
            </div>
            <div className='already-have-account'>Already a user?<span onClick={() => {
              closeModal();
              setLoginVisible(true)
            }} className='login-text'>LOGIN</span></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegistrationModal;
