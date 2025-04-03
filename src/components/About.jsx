import React, { useState } from 'react';
import '../assets/styles/App.css';
import '../assets/styles/Nav.css';
import HomeCarousel from './HomeCarousel';

const SectionSlider = ({ currentSection, goToSection, goToNext, goToPrev }) => {
  return (
    <div className='home__slider'>
      <div className='home__slider__prev' onClick={goToPrev}>PREV</div>
      <div className='home__slider__nav'>
        <div className='section__bar'>
          <ul className='section__links'>
            {[0, 1, 2].map((index) => (
              <li 
                key={index}
                className='onClick__Section__link' 
                onClick={() => goToSection(index)}
              >
                <div 
                  className={`dot ${currentSection === index ? 'dot__focused' : ''}`}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='home__slider__next' onClick={goToNext}>NEXT</div>
    </div>
  );
};

const About = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [0, 1, 2]; // Simplificamos la lógica de renderizado

  return (
    <div>
      {sections.map((sectionIndex) => (
        currentSection === sectionIndex && (
          <section key={sectionIndex}>
            <div>
              <div className='left__side__content'>
                <SectionSlider
                  currentSection={currentSection}
                  goToSection={setCurrentSection}
                  goToNext={() => setCurrentSection((prev) => (prev + 1) % 3)}
                  goToPrev={() => setCurrentSection((prev) => (prev - 1 + 3) % 3)}
                />
              </div>
              <div className='right__side__content'>
                <div className='home__tittle'>
                  <div className='home__carrousel'>
                    {/* <HomeCarousel section={sectionIndex} /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default About;