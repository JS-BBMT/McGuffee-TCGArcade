import React, {useEffect, useState} from 'react';

import jackpotImg from '../../assets/images/jackpot.png';
import prizeJson from '../../assets/data/prizes.json';
import GamePrizeListComponent from '../../Component/GamePriceListComponent';
import './style.css';

const GameJackPotComponent = ({ Name }) => {
  const [jackpot, setJackpot] = useState({});
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    const jackpotItem = prizeJson.filter(prize => prize.isJackpot === true)[0];
    setJackpot(jackpotItem);
    setPrizes(prizeJson.filter(prize => prize.isJackpot === false));
  },[])
  return (
    <div>
      <div className='mobile-black-header'></div>
      <div className='mobile-reponive-scroll-jackpot'>
        <div className='prize-list-flex' >
          <img className="jackpot-img" src={jackpotImg} alt="jackpot"/>
          <h3 style={{color: "white"}}>{jackpot?.name}</h3>
        </div>
        <hr style={{color: "white"}}/>
        <div className='price-list-scroll-container'>
          {prizes.map(prize => (
            <GamePrizeListComponent key={prize.name} name={prize.name}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameJackPotComponent;
