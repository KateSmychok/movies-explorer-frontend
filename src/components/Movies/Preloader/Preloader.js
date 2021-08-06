import React from 'react';
import './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className='preloader'>
      <div className='preloaderContainer'>
        <span className='preloaderRound'> </span>
      </div>
    </div>
  )
};

export default Preloader;
