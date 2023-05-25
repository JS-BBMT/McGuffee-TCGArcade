import React from 'react';

import './style.css';
import pokeball from '../../assets/images/pokeball.svg';

const GamePrizeListComponent = ({ name }) => {
    return (
        <div className='prize-content-bar' >
            <div className='prize-name-box' >
                <img className='poke-ball-image' src={pokeball} alt="pokemon-ball"/>
            </div>
            <div className='prize-name-text' >{name}</div>
        </div>
    );
}

export default GamePrizeListComponent;
