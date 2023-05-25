import React from 'react';
import {Modal} from 'antd';

import CloseIcon from '../../assets/logo/modalcloseicon.svg';
import HeaderLogo from '../../assets/logo/headerlogo.svg';
import PokemonImage from '../../assets/images/pokeball.svg'

import './style.css';


const TokenModal = ({tokenVisible, handleCancel}) => {

  return (
    <>
      <div>
        <Modal className='token-modal-styling' footer={false} title="Tokens" visible={tokenVisible} onCancel={handleCancel}>
          <div className='token-modal-close-icon'>
            <img onClick={handleCancel} className='modal-close-icon' src={CloseIcon} alt="close"/>
          </div>
          <div className='token-form-container'>
            <img className='token-header-logo' src={HeaderLogo} alt="header-logo"/>
            <div className='token-content-container'>
              <img onClick={() => alert('hello')} src={PokemonImage} alt="token"/> 200 Tokens
            </div>
          </div>

        </Modal>
      </div>
    </>

  );
};

export default TokenModal;
