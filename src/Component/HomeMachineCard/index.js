import React from 'react';
import { useNavigate } from 'react-router-dom';

import pokemonimage from '../../assets/images/pokemonimage.svg';
import './style.css';

const HomeMachineCard = ({ machine }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => {navigate('/game') }} className='machine-card-container'>
        <div className='machine-img-container'>
          <img className='pokemon-image' src={pokemonimage} alt=""/>
        </div>
      </div>
      <div className='machine-number-text'>{machine.machineName}</div>
    </div>
  );
};

export default HomeMachineCard;
