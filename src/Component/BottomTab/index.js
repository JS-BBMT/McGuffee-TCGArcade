import React, {useState} from 'react';

import InactiveUserIcon from '../../assets/logo/inactiveusericon.svg';
import InactiveVideoIocn from '../../assets/logo/inactivevideoicon.svg';
import Inactivediamondicon from '../../assets/logo/inactivediamondicon.svg';
import ActiveUserIcon from '../../assets/logo/activeusericon.svg';
import ActiveVideoIocn from '../../assets/logo/activevideoicon.svg';
import ActiveDiamondIcon from '../../assets/logo/activediamondicon.svg';
import './style.css';

const BottomTab = ({handleScreen}) => {
  const [user , setUser] = useState(false);
  const [video , setVideo] = useState(true);
  const [diamond , setDiamond] = useState(false);
  return (
    <div className='bottom-tab-container'>
      <img src={user ? ActiveUserIcon: InactiveUserIcon} onClick={()=>{
        setUser(true);
        setVideo(false);
        setDiamond(false);
        handleScreen('GameViewerComponent')}} alt="user-icon"/>
      <img src={video ? ActiveVideoIocn : InactiveVideoIocn} onClick={()=>{
        setUser(false);
        setVideo(true);
        setDiamond(false);
        handleScreen('VideoGameComponent');}} alt="game-icon"/>
      <img src={diamond ? ActiveDiamondIcon :Inactivediamondicon} onClick={()=>{
        setUser(false);
        setVideo(false);
        setDiamond(true);
        handleScreen('GameJackPotComponent');}} alt="jackpot-icon"/>
    </div>
  );
};

export default BottomTab;
