import React, {useEffect, useState} from 'react';

import Ellipse from '../../assets/images/Ellipse.svg';
import Eye from '../../assets/images/Eye.svg';
import GameUsersComponent from '../../Component/GameUsersComponent';
import viewersJson from "../../assets/data/viewers.json"
import './style.css';

const GameViewerComponent = ({user}) => {
    const [viewers, setViewers] = useState([])
    useEffect(() => {
        setViewers(viewersJson);
    }, [])
    return (
        <div className='game-viewer-main-container'>
            <div className='user-component-header'>
                <div className='selected-user-content-flex' >
                    <div className='selected-user-name-container'>
                        <div className='game-viewer-profile-container'>
                            <img className='game-viewer-profile' src={Ellipse} alt="more"/>
                        </div>
                        <div className='selected-user-name' >{user?.firstName} {user?.lastName}</div>
                    </div>
                    <div className='mobile-responive-viewer-count'>
                        <div className='user-viewer-count-num' >{viewers?.length}</div>
                        <img src={Eye} style={{ height: 20, width: 28, marginLeft: 10 }} alt="viewers"/>
                    </div>
                </div>
                <div className='user-viewer-count-bar' >
                    <div className='responive-user-viewer-count-container'>
                        <img className='user-viewer-eye-icon' src={Eye} alt="viewers"/>
                        <div className='user-viewer-count-number' >{viewers?.length}</div>
                    </div>
                </div>
            </div>
            <div className='scrollable-content' >
                {viewers.map(viewer => (
                  <GameUsersComponent key={viewer?.name} Name={viewer?.name} />
                ))}
            </div>
        </div>
    );
}

export default GameViewerComponent
