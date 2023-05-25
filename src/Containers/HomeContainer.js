import React from 'react';
import { HomeScreen } from '../Screens';


const HomeContainer = ({user, isLoading}) => {
  return (
    <>
      <HomeScreen user={user} loading={isLoading}/>
    </>
  );
};

export default HomeContainer;
