import React from 'react';
import ProfileScreen from "../Screens/ProfileScreen";
import {Navigate} from "react-router-dom";


const PrizeContainer = ({user, isLoading}) => {
  return (
    !localStorage.getItem('user') ?
      <Navigate to='/'/>
    : <>
      <ProfileScreen user={user} loading={isLoading}/>
    </>
  );
};

export default PrizeContainer;
