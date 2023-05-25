import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive'

import MobileHeadeer from '../../Component/MobileHeader';
import BottomTab from '../../Component/BottomTab';
import GameViewerComponent from '../../Component/GameViewerComponent';
import VideoGameComponent from '../../Component/VideoGameComponent';
import GameJackPotComponent from '../../Component/GameJackPotComponent';
import './style.css';

const GamingScreen = ({ user }) => {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 550px)' })


  const [screen, setScreen] = useState('VideoGameComponent')

  return (
    <div className='gaming-container'>
      <div className='mobile-header'>
        {
          isTabletOrMobile ? <MobileHeadeer />: <></>
        }
      </div>

      {isTabletOrMobile ?
        <div className='container'>
          <div className='row'>

            {screen === 'GameViewerComponent' ?
              <div className='col-lg-3  responsive-padding-container'>
                <div className='game-viewer-component-responsive'>
                  {screen === 'GameViewerComponent' ? <GameViewerComponent user={user}/> : null}
                </div>
              </div> :
              null

            }
            {screen === 'VideoGameComponent' ?
              <>
                <div className='col-1'></div>
                <div className='col-lg-4  responsive-padding-container'>
                  <div className='video-game-component-responsive'>
                    {screen === 'VideoGameComponent' ? <VideoGameComponent /> : null}
                  </div>
                </div>
              </> :
              null
            }

            {screen === 'GameJackPotComponent' ?
              <>
                <div className='col-1'></div>
                <div className='col-lg-3  responsive-padding-container'>
                    {screen === 'GameJackPotComponent' ? <GameJackPotComponent /> : null}
                </div>
              </> : null
            }
          </div>
        </div> :
        <div className='container responsive-video-game-container'>
          <div className='row'>
            <div className='col-lg-3 responsive-columns-width'>
              <div className='game-viewer-component-responsive'>
                <GameViewerComponent user={user}/>
              </div>
            </div>
            <div className='col-1 invisible-columns'></div>
            <div className='col-lg-4'>
              <div className='video-game-component-responsive'>
                <VideoGameComponent />
              </div>
            </div>
            <div className='col-1 invisible-columns'></div>
            <div className='col-lg-3 responsive-columns-width'>
              <div className='game-jackpot-component-responsive'>
                <GameJackPotComponent />
              </div>
            </div>
          </div>
        </div>
      }

      <div className='mobile-responsive-tabs-container'>
        <BottomTab screen={screen} handleScreen={setScreen} />
      </div>
    </div>
  );
};

export default GamingScreen;
