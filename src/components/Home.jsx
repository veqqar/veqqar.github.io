import React, { useState , useEffect } from 'react';
import '../assets/styles/App.css';
import '../assets/styles/Nav.css';
import SpotlightCard from './SpotlightCard';

// SLIDER COMPONENT

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
                  className={`dot cursor-in-transition ${currentSection === index ? 'dot__focused' : ''}`}
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

const Home = ({ setCurrentPage }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [fadeActive, setFadeActive] = useState(false);
  const totalRows = 20;

  const animationDuration = 600;
  const delayIncrement = 50;

  const handleImageClick = () => {
    setFadeActive(true);
    setTimeout(() => setFadeActive(false), totalRows * delayIncrement + animationDuration);
  };
  

  // CALCULATE EXPERIENCE TIME
  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    const calculateTimeSince = () => {
      const specificDate = new Date('2021-10-25');
      const currentDate = new Date();

      const differenceInMs = currentDate - specificDate;

      const msInYear = 1000 * 60 * 60 * 24 * 365.25;
      const msInMonth = 1000 * 60 * 60 * 24 * 30.44;
      const msInWeek = 1000 * 60 * 60 * 24 * 7;

      const years = Math.floor(differenceInMs / msInYear);
      const remainingMsAfterYears = differenceInMs % msInYear;
      const months = Math.floor(remainingMsAfterYears / msInMonth);
      const remainingMsAfterMonths = remainingMsAfterYears % msInMonth;
      const weeks = Math.floor(remainingMsAfterMonths / msInWeek);

      setTimeSince(`T+ ${years}y : ${months}m : ${weeks}w`);
    };

    calculateTimeSince();
  }, []);


  // SLIDER COMPONENT BEHAVIOR

  const [currentSection, setCurrentSection] = useState(0);
  const goToSection = (index) => {
    setCurrentSection(index);
  };
  const goToNext = () => {
    setCurrentSection((prev) => (prev + 1) % 3);
  };
  const goToPrev = () => {
    setCurrentSection((prev) => (prev - 1 + 3) % 3);
  };


  return (
    <div>

      {/* ################################## */}
      {/* ###   SECTION SLIDER OPTIONS   ### */}
      {/* ################################## */}

      {/* ################### */}
      {/* ###  SECTION 1  ### */}
      {/* ################### */}

      {currentSection === 0 && (
        <section>
          <div>
            <div className='left__side__content'>
              <div className='banner__description'>
                <SpotlightCard 
                  spotlightColor="rgba(233, 111, 123, 0.25)"
                >
                  <div className='banner__description_content'>
                    My name is David Gomez Pilipenko aka //veqqar im a software developer and cybersecurity specialist. Based in Barcelona (ES).
                  </div>
                </SpotlightCard>
              </div>

              <SectionSlider
                currentSection={currentSection}
                goToSection={goToSection}
                goToNext={goToNext}
                goToPrev={goToPrev}
              />

              <div className='home__description_subtittle'>Me</div>
              <div className='home__description_tittle'>About myself</div>

              <div className='description__link'>
                <button 
                  className='description__link__button'
                  onClick={() => setCurrentPage('about')}
                >
                  Visit <i className="fa-solid fa-square-arrow-up-right"></i>
                </button>
              </div>
            </div>

            <div className='right__side__content'>
              <div className='home__tittle'>
                <div className='header__section'>
                  hi im <span className='home__name'>veqqar</span>
                </div>

                <div className='home__carrousel' style={{ position: 'relative' }}>
                  <img 
                    src={''} 
                    alt='Carousel' 
                    className='home__carrousel__img' 
                  />

                  <div className="home__carrousel__img__rows" onClick={handleImageClick}>
                    {Array.from({ length: totalRows }, (_, index) => {
                      let blurIntensity = 0;
                      let saturationIntensity = 1;

                      if (hoveredRow !== null && Math.abs(index - hoveredRow) <= 3) {
                        const distance = Math.abs(index - hoveredRow);
                        blurIntensity = 7.5 - (distance * 1.5);
                        saturationIntensity = 1 + (3 - distance) * 0.25; 
                      }

                      return (
                        <div 
                          key={index} 
                          className="home__carrousel__img__row"
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                          style={{ 
                            '--blur': `${blurIntensity}px`, 
                            '--saturate': saturationIntensity,
                            '--delay': `${index * delayIncrement}ms`
                          }}
                        >
                          <div 
                            className="home__carrousel__img__row__inner"
                            style={
                              fadeActive
                                ? {
                                    animation: `expandWidth ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                                    animationDelay: `${index * delayIncrement}ms`
                                  }
                                : {}
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="home__subtittle">
                  <div className="home__subtittle_sections">
                    <div className="home__subtittle_section"></div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Experience</div>
                      <div className='home__subtittle_section__content' style={{fontSize: '1rem'}}>
                      {timeSince}
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Tools</div>
                      <div className='home__subtittle_section__content'>
                        // C / Python / JS <br/>/ React / SQL / NoSQL <br/>/ Git / Docker / Kali <br/>/ Metasploit / Burp <br/>/ Nmap // 
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Skills</div>
                      <div className='home__subtittle_section__content'>
                        // Programming <br/> / Cyber-Security <br/> / Web-Dev / UI/UX //
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ################### */}
      {/* ###  SECTION 2  ### */}
      {/* ################### */}


      {currentSection === 1 && (
        <section>
          <div>
            <div className='left__side__content'>
              <div className='banner__description'>
                <SpotlightCard 
                  spotlightColor="rgba(233, 111, 123, 0.25)"
                >
                    <div className='banner__description_content'>
                      This banner contains a small description of the projects that I have been working on.
                    </div>
                </SpotlightCard>
              </div>

              <SectionSlider
                currentSection={currentSection}
                goToSection={goToSection}
                goToNext={goToNext}
                goToPrev={goToPrev}
              />

              <div className='home__description_subtittle'>Projects</div>
              <div className='home__description_tittle'>Some Stuff i Do</div>

              <div className='description__link'>
                <button 
                  className='description__link__button'
                  onClick={() => setCurrentPage('projects')}
                >
                  Visit <i className="fa-solid fa-square-arrow-up-right"></i>
                </button>
              </div>
            </div>

            <div className='right__side__content'>
              <div className='home__tittle'>
                <div className='header__section'>
                  hi im <span className='home__name'>veqqar</span>
                </div>

                <div className='home__carrousel' style={{ position: 'relative' }}>
                  <img 
                    src={''} 
                    alt='Carousel' 
                    className='home__carrousel__img' 
                  />

                  <div className="home__carrousel__img__rows" onClick={handleImageClick}>
                    {Array.from({ length: totalRows }, (_, index) => {
                      let blurIntensity = 0;
                      let saturationIntensity = 1;

                      if (hoveredRow !== null && Math.abs(index - hoveredRow) <= 3) {
                        const distance = Math.abs(index - hoveredRow);
                        blurIntensity = 7.5 - (distance * 1.5);
                        saturationIntensity = 1 + (3 - distance) * 0.25; 
                      }

                      return (
                        <div 
                          key={index} 
                          className="home__carrousel__img__row"
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                          style={{ 
                            '--blur': `${blurIntensity}px`, 
                            '--saturate': saturationIntensity,
                            '--delay': `${index * delayIncrement}ms`
                          }}
                        >
                          <div 
                            className="home__carrousel__img__row__inner"
                            style={
                              fadeActive
                                ? {
                                    animation: `expandWidth ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                                    animationDelay: `${index * delayIncrement}ms`
                                  }
                                : {}
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="home__subtittle">
                  <div className="home__subtittle_sections">
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Projects</div>
                      <div className='home__subtittle_section__content'>
                        Project 1 <br/>Project 2 <br/>Project 3 <br/>Project 4 <br/>Project 5
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Experience</div>
                      <div className='home__subtittle_section__content' style={{fontSize: '1rem'}}>
                      {timeSince}
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Tools</div>
                      <div className='home__subtittle_section__content'>
                        // C / Python / JS <br/>/ React / SQL / NoSQL <br/>/ Git / Docker / Kali <br/>/ Metasploit / Burp <br/>/ Nmap // 
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Skills</div>
                      <div className='home__subtittle_section__content'>
                        // Programming <br/> / Cyber-Security <br/> / Web-Dev / UI/UX //
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ################### */}
      {/* ###  SECTION 3  ### */}
      {/* ################### */}


      {currentSection === 2 && (
        <section>
          <div>
            <div className='left__side__content'>
              <div className='banner__description'>
              <SpotlightCard 
                spotlightColor="rgba(233, 111, 123, 0.25)"
              >
                  <div className='banner__description_content'>
                    Let's connect for opportunities in software development and cybersecurity. Available for freelance and consulting projects.
                  </div>
              </SpotlightCard>
            </div>

              <SectionSlider
                currentSection={currentSection}
                goToSection={goToSection}
                goToNext={goToNext}
                goToPrev={goToPrev}
              />

              <div className='home__description_subtittle'>Contact</div>
              <div className='home__description_tittle'>Let's get in touch</div>

              <div className='description__link'>
                <button 
                  className='description__link__button'
                  onClick={() => setCurrentPage('contact')}
                >
                  Visit <i className="fa-solid fa-square-arrow-up-right"></i>
                </button>
              </div>
            </div>

            <div className='right__side__content'>
              <div className='home__tittle'>
                <div className='header__section'>
                  hi im <span className='home__name'>veqqar</span>
                </div>

                <div className='home__carrousel' style={{ position: 'relative' }}>
                  <img 
                    src={''} 
                    alt='Carousel' 
                    className='home__carrousel__img' 
                  />

                  <div className="home__carrousel__img__rows" onClick={handleImageClick}>
                    {Array.from({ length: totalRows }, (_, index) => {
                      let blurIntensity = 0;
                      let saturationIntensity = 1;

                      if (hoveredRow !== null && Math.abs(index - hoveredRow) <= 3) {
                        const distance = Math.abs(index - hoveredRow);
                        blurIntensity = 7.5 - (distance * 1.5);
                        saturationIntensity = 1 + (3 - distance) * 0.25; 
                      }

                      return (
                        <div 
                          key={index} 
                          className="home__carrousel__img__row"
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                          style={{ 
                            '--blur': `${blurIntensity}px`, 
                            '--saturate': saturationIntensity,
                            '--delay': `${index * delayIncrement}ms`
                          }}
                        >
                          <div 
                            className="home__carrousel__img__row__inner"
                            style={
                              fadeActive
                                ? {
                                    animation: `expandWidth ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                                    animationDelay: `${index * delayIncrement}ms`
                                  }
                                : {}
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="home__subtittle">
                  <div className="home__subtittle_sections">
                    <div className="home__subtittle_section"></div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Experience</div>
                      <div className='home__subtittle_section__content' style={{fontSize: '1rem'}}>
                      {timeSince}
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Tools</div>
                      <div className='home__subtittle_section__content'>
                        // C / Python / JS <br/>/ React / SQL / NoSQL <br/>/ Git / Docker / Kali <br/>/ Metasploit / Burp <br/>/ Nmap // 
                      </div>
                    </div>
                    <div className="home__subtittle_section">
                      <div className='home__subtittle_section__tittle'>■ Skills</div>
                      <div className='home__subtittle_section__content'>
                        // Programming <br/> / Cyber-Security <br/> / Web-Dev / UI/UX //
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
