import React from 'react';
import '../assets/styles/App.css';

const SectionSlider = ({ currentSection, setCurrentSection }) => {
  return (
    <div className='section__bar'>
      <ul className='section__links'>
        {[1, 2, 3].map((section) => (
          <li key={section} onClick={() => setCurrentSection(section)}>
            <div className={currentSection === section ? 'dot__focused' : 'dot'}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionSlider;