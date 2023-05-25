import React, {useEffect, useState} from 'react';

import dropbtn from '../../assets/images/dropbtn.svg';
import left from '../../assets/images/left.svg';
import up from '../../assets/images/up.svg';
import down from '../../assets/images/down.svg';
import right from '../../assets/images/right.svg';
import viewbtn from '../../assets/images/viewbtn.svg';
import centercircle from '../../assets/images/centerbtnimg.svg';
import EyesIcon from '../../assets/images/Eye.svg';
import viewersJson from "../../assets/data/viewers.json"
import './style.css';

const VideoGameComponent = ({Name}) => {
  const [viewers, setViewers] = useState([])

  useEffect(() => {
    setViewers(viewersJson);
  }, [])

  return (
    <div className='game-content-container'>
      <div className='game-background-image'>
        <div className='youtube-gradient-background-image'>
          <div className='videos-viewers-container'>
            <img className='video-viewer-eye-icon' src={EyesIcon} alt="view-eye"/>
            <div className='videos-viewers'>{viewers?.length}</div>
          </div>
        </div>
      </div>
      <div className='game-btns-background'>
        <div className='view-btn-bar'>
          <div></div>
          <div>
            <img className='view-btn-image-game' src={viewbtn} alt="game"/>
          </div>
        </div>
        <div className='game-btns-flex-bar'>
          <div className='game-btn-controls'>
            <img src={centercircle} className='game-center-control-image' alt="game-center"/>
            <div className='game-btns-container'>
              <div>
                <img className='up-image-game' src={up} alt="move-up"/>
              </div>
              <div className='game-horizontal-btns'>
                <div>
                  <img className='left-image-game' src={left} alt="move-up left"/>
                </div>
                <div>
                  <img className='right-image-game' src={right} alt="move-right"/>
                </div>
              </div>
              <div>
                <img className='down-image-game' src={down} alt="move-down"/>
              </div>
            </div>
          </div>
          <div>
            <img className='dropbtn-image-style' src={dropbtn} alt="drop"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGameComponent
