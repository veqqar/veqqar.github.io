import React from 'react';
import GrainOverlay from './GrainOverlay';

const Preloader = ({ closing }) => {
  return (
    <div className={`Preloader__Content ${closing ? 'closing' : ''}`}>
      <GrainOverlay />
      <div className="Preloader__Container">
        <div className="Preloader__Word">
          STANDBY..
          <span className="blinking-dot">.</span>
        </div>
        <div className='Preloader__Text'>
          Reproduction, reposting or <br />
          modification of the content <br />
          of this site is prohibited.
        </div>
      </div>
    </div>
  );
};

export default Preloader;