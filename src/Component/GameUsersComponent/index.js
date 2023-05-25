import React from 'react';
import Ellipse from '../../assets/images/Ellipse.svg';
import './style.css';

const GameUsersComponent = ({ Name }) => {
    return (
        <div>
            <div className='user-content-flex' >
                <img className='game-user-image' src={Ellipse} alt="User icon"/>
                <div className='game-user-name' >{Name}</div>
            </div>
        </div>
    );
}

export default GameUsersComponent
