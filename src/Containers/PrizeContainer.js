import React from 'react';
import {Navigate} from "react-router-dom";
import PrizesScreen from "../Screens/PrizesScreen";


const PrizeContainer = ({user, isLoading}) => {
  return (
    !localStorage.getItem('user') ?
      <Navigate to='/'/>
    : <>
      <PrizesScreen user={user} loading={isLoading}/>
    </>
  );
};

export default PrizeContainer;
