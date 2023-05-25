import React from 'react';

import HomeScrollCard from '../../Component/HomeScrollCard';
import './style.css';
import machineData from "../../assets/data/machines.json";
const HomeScreen = () => {
  return (
    <div className='home-container'>
      <div className='standard-card-container'>
            <HomeScrollCard  title="standard" machines={machineData.filter(machine => machine.class === 1)}/>
            <HomeScrollCard backgroundcolor="rgba(231,150,139,0.3)" title="Expensive" machines={machineData.filter(machine => machine.class === 2)}/>
            <HomeScrollCard backgroundcolor="rgba(194,136,40,0.3)" title="High Roller" machines={machineData.filter(machine => machine.class === 3)}/>
      </div>
      <div className='home-footer'>
      </div>
    </div>
  );
};

export default HomeScreen;
