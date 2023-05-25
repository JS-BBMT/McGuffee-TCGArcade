import React, {useEffect, useState} from 'react';

import Header from '../../Component/SignInHeader';
import Footer from '../../Component/Footer';
import './style.css';
import LoadingSpinner from "../../Component/Spinner";
import ProfileCard from "../../Component/ProfileCard";
import {useFormik} from "formik";
import Address from "../../Schemas/AddressSchema";
import PasswordUpdate from "../../Schemas/PasswordUpdate"
import { State } from 'country-state-city';
import {API} from "aws-amplify";
import events from "../../Util/dispatch";
import {ClockLoader} from "react-spinners";
import { Buffer } from 'buffer'
import {Alert, AlertTitle, Grid} from "@mui/material";

const ProfileScreen = ({ user, loading }) => {
  const [addressError, setAddressError] = useState(null);
  const [addressSuccess, setAddressSuccess] = useState(null);
  const [updatingAddress, setUpdatingAddress] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const addressFormik = useFormik({
    initialValues: {
      street: user?.address?.street || '',
      street2: user?.address?.street2 || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || ''
    },
    validationSchema: Address,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setUpdatingAddress(true);
      setAddressError('');
      const body = {
        username: user.username,
        address: values
      }
      try{
        const updatedUser = await API.put('tcgapi','/users',{body: body});
        events.userUpdateEvent(updatedUser);
        setAddressSuccess("Information update successful");
        setTimeout(() => {
          setAddressSuccess(null);
        },5000);
      } catch (error) {
        setAddressError("There was an issue updating the user");
      } finally {
        setUpdatingAddress(false)
      }
    }
  });
  const states = State.getStatesOfCountry('US').map(({name, isoCode}) => {
    return {
      label: name,
      value: isoCode
    }
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: PasswordUpdate,
    onSubmit: async (values) => {
      setUpdatingPassword(true);
      setPasswordError('');
      const bodyCheck = {
        username: user.username,
        password: Buffer.from(values.oldPassword).toString('base64')
      }
      const body = {
        username: user.username,
        password: Buffer.from(values.newPassword).toString('base64')
      }
      try{
        await API.post('tcgapi', '/users/login', {body: bodyCheck});
        await API.put('tcgapi','/users',{body: body});
        setPasswordSuccess("Information update successful");
        setTimeout(() => {
          setPasswordSuccess(null);
        },5000);
      } catch (error) {
        setPasswordError("There was an issue updating the user");
      } finally {
        setUpdatingPassword(false)
      }
    }

  });

  return (
    <div className='profile-container'>
      <div className='standard-card-container'>
        <ProfileCard title="Basic Information" className="bg-white">
          <Grid container spacing={2} className="ml-10">
            <Grid item xs={12} md={6}>
              <div>Hello</div>
            </Grid>
          </Grid>
        </ProfileCard>
        <ProfileCard title="Address">

          {!user?.address ?
            <Alert severity="warning" className="mb-10">
              <AlertTitle>Missing Address</AlertTitle>
              Address is required when trying to ship products out
            </Alert> : <></>}
          <div className='profile-form-container'>
            <div className='profile-content-container'>
              { addressError ? <div className="form-error">{addressError}</div> : <></>}
              { addressSuccess ? <div className="form-success">{addressSuccess}</div> : <></>}
              <form id='address-form' onSubmit={addressFormik.handleSubmit}>
                <input className='input-field'
                       type='text'
                       name="street"
                       id="street"
                       placeholder='Address 1'
                       value={addressFormik.values.street}
                       onChange={addressFormik.handleChange}
                />
                { addressFormik.errors.street ? <div className="form-error">{ addressFormik.errors.street }</div> : <></>}
                <input className='input-field'
                       type='text'
                       name="street2"
                       id="street2"
                       placeholder='Address 2'
                       value={addressFormik.values.street2}
                       onChange={addressFormik.handleChange}
                />
                { addressFormik.errors.street2 ? <div className="form-error">{ addressFormik.errors.street2 }</div> : <></>}
                <input className='input-field'
                       type='text'
                       name="city"
                       id="city"
                       placeholder='City'
                       value={addressFormik.values.city}
                       onChange={addressFormik.handleChange}
                />
                { addressFormik.errors.city ? <div className="form-error">{ addressFormik.errors.city }</div> : <></>}
                <select
                  className='input-field'
                  placeholder="Select State"
                  id='state'
                  name='state'
                  value={addressFormik.values.state}
                  onChange={addressFormik.handleChange}
                >
                  <option value="">Select State</option>
                  {states.map(({label, value}) => (
                    <option key={`state-${value}`} value={value}>{label}</option>
                  ))}
                </select>
                { addressFormik.errors.state ? <div className="form-error">{ addressFormik.errors.state }</div> : <></>}
                <input className='input-field'
                       type='text'
                       name="zipCode"
                       id="zipCode"
                       placeholder='Zip Code'
                       value={addressFormik.values.zipCode}
                       onChange={addressFormik.handleChange}
                />
                { addressFormik.errors.zipCode ? <div className="form-error">{ addressFormik.errors.zipCode }</div> : <></>}
                <button type="submit" className='profile-btn' disabled={!addressFormik.dirty || updatingAddress}>{updatingAddress ? <ClockLoader size={25} /> : 'Update'}</button>
              </form>
            </div>
          </div>
        </ProfileCard>
        <ProfileCard title="Password">
          <div className='profile-form-container'>
            <div className='profile-content-container'>
              { passwordError ? <div className="form-error">{passwordError}</div> : <></>}
              { passwordSuccess ? <div className="form-success">{passwordSuccess}</div> : <></>}
              <form id='password-form' onSubmit={passwordFormik.handleSubmit}>
                <input className='input-field'
                       type='password'
                       name="oldPassword"
                       id="oldPassword"
                       placeholder='Old Password'
                       onChange={passwordFormik.handleChange}
                />
                { passwordFormik.errors.oldPassword ? <div className="form-error">{ passwordFormik.errors.oldPassword }</div> : <></>}
                <input className='input-field'
                       type='password'
                       name="newPassword"
                       id="newPassword"
                       placeholder='New Password'
                       onChange={passwordFormik.handleChange}
                />
                { passwordFormik.errors.newPassword ? <div className="form-error">{ passwordFormik.errors.newPassword }</div> : <></>}
                <input className='input-field'
                       type='password'
                       name="confirmPassword"
                       id="confirmPassword"
                       placeholder='Confirm Password'
                       onChange={passwordFormik.handleChange}
                />
                { passwordFormik.errors.confirmPassword ? <div className="form-error">{ passwordFormik.errors.confirmPassword }</div> : <></>}
                <button type="submit" className='profile-btn' disabled={!passwordFormik.dirty || updatingPassword}>{updatingPassword ? <ClockLoader size={25} /> : 'Update'}</button>
              </form>
            </div>
          </div>
        </ProfileCard>
      </div>
    </div>
  );
};

export default ProfileScreen;
