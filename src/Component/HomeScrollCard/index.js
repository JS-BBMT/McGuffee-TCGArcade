import React, { useRef } from 'react';

import HomeMachineCard from '../../Component/HomeMachineCard';
import LeftArrow from '../../assets/logo/leftarrowicon.svg';
import RightArrow from '../../assets/logo/rightarrowicon.svg';
import './style.css';
const HomeScrollCard = ({ title, backgroundcolor, machines }) => {
  const ref = useRef();
  return (
    <div className='card-main-container'>
      <div className='card-header-container'>
        <img className='arrow-img' src={LeftArrow} onClick={()=>ref.current.scrollLeft -=300} alt="scroll-left"/>
        <div className='left-header-border'></div>
        <div className='card-name'>{title}</div>
        <div className='right-header-border'></div>
        <img className='arrow-img' src={RightArrow} onClick={()=>ref.current.scrollLeft +=300} alt="scroll-right"/>
      </div>
      <div className='card-content-container' style={{ backgroundColor: backgroundcolor }}>
        <div className='cards-scroll-container' ref={ref}>
          {
            machines.map(machine => (<HomeMachineCard key={machine.id} machine={machine} />))
          }
        </div>
      </div>
    </div>
  );
};

export default HomeScrollCard;
