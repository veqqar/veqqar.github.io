import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/Nav.css';
import '../assets/styles/App.css';
import DecryptedText from './extra_functions/DecryptedText';
import javascript_icon from '../assets/imgs/icons/javascript-icon.svg';
import python_icon from '../assets/imgs/icons/python.svg';
import java_icon from '../assets/imgs/icons/java-icon.svg';
import c_icon from '../assets/imgs/icons/c-icon.svg';
import cpp_icon from '../assets/imgs/icons/c++.svg';
import php_icon from '../assets/imgs/icons/php.svg';
import html_icon from '../assets/imgs/icons/html-5.svg';
import css_icon from '../assets/imgs/icons/css-icon.svg';
import react_icon from '../assets/imgs/icons/react.svg';
import laravel_icon from '../assets/imgs/icons/laravel-icon.svg';
import express_icon from '../assets/imgs/icons/expressjs.svg';
import bootstrap_icon from '../assets/imgs/icons/bootstrap-icon.svg';
import wordpress_icon from '../assets/imgs/icons/wordpress.svg';
import mongodb_icon from '../assets/imgs/icons/mongodb.svg';
import mysql_icon from '../assets/imgs/icons/mysql.svg';
import postgresql_icon from '../assets/imgs/icons/PostgreSql.svg';
import nodejs_icon from '../assets/imgs/icons/node-js.svg';
import nginx_icon from '../assets/imgs/icons/nginx-icon.svg';
import firebase_icon from '../assets/imgs/icons/firebase-icon.svg';
import docker_icon from '../assets/imgs/icons/docker-icon.svg';
import ansible_icon from '../assets/imgs/icons/ansible-icon.svg';
import terraform_icon from '../assets/imgs/icons/terraform.svg';
import git_icon from '../assets/imgs/icons/git-icon.svg';
import aws_icon from '../assets/imgs/icons/amazon_aws-icon.svg';
import nmap_icon from '../assets/imgs/icons/nmap-icon.png';
import metasploit_icon from '../assets/imgs/icons/metasploit-icon.png';
import burpsuite_icon from '../assets/imgs/icons/burpsuite-icon.jpeg';
import wireshark_icon from '../assets/imgs/icons/wireshark-icon.png';
import hydra_icon from '../assets/imgs/icons/hydra-icon.png';
import shodan_icon from '../assets/imgs/icons/shodan-icon.png';
import theharvester_icon from '../assets/imgs/icons/theHarvester-icon.webp';
import spiderfoot_icon from '../assets/imgs/icons/spiderfoot-icon.svg';
import maltego_icon from '../assets/imgs/icons/maltego-icon.svg';

const About = ({ setAboutSection, aboutSection }) => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  const [currentAboutSection, setCurrentAboutSection] = useState(0);

  const goToSection = (index) => {
    const sectionsContainer = document.querySelector('.about__sections__container');
    const windowHeight = window.innerHeight;
    sectionsContainer.scrollTo({
      top: index * windowHeight,
      behavior: 'smooth'
    });
    setCurrentAboutSection(index);
  };

  const AboutSectionSlider = () => {
    return (
      <div className='about__slider'>
        <div className='about__slider__nav'>
          <div className='about__section__bar'>
            <ul className='about__section__links'>
              {[0, 1, 2, 3, 4].map((index) => (
                <li 
                  key={index}
                  className='about__onClick__Section__link' 
                  onClick={() => goToSection(index)}
                >
                  <div 
                    className={`about__dot cursor-in-transition ${currentAboutSection === index ? 'about__dot__focused' : ''}`}
                  ></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const sectionsContainer = document.querySelector('.about__sections__container');
    const handleScroll = () => {
      const scrollPosition = sectionsContainer.scrollTop;
      const windowHeight = window.innerHeight;
      
      let newSection;
      if (scrollPosition < windowHeight * 0.5) {
        newSection = 1;
        setCurrentAboutSection(0);
      } else if (scrollPosition < windowHeight * 1.5) {
        newSection = 2;
        setCurrentAboutSection(1);
      } else if (scrollPosition < windowHeight * 2.5) {
        newSection = 3;
        setCurrentAboutSection(2);
      } else if (scrollPosition < windowHeight * 3.5) {
        newSection = 4;
        setCurrentAboutSection(3);
      } else {
        newSection = 5;
        setCurrentAboutSection(4);
      }
      
      if (setAboutSection && typeof setAboutSection === 'function') {
        setAboutSection(newSection);
      }
    };
    
    sectionsContainer.addEventListener('scroll', handleScroll);
    return () => sectionsContainer.removeEventListener('scroll', handleScroll);
  }, [setAboutSection]);

  return (
    <div className="about__page__content">
      <AboutSectionSlider />

      <div className="about__sections__container">

        {/* Section 1 */}
        <section className="about__section1" ref={section1Ref}>
          <div className="about__left1">
            <h1 className="about__section1__title">
              <DecryptedText
                text="VEQQAR"
                encryptedText="V3QQ42"
                iterations={10}
                speed={35}
                charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&"
                className="decrypted-text"
                encryptedClassName="encrypted-text"
                parentClassName="decrypted-text-container"
              />
            </h1>
          </div>
        </section>

        {/* Section 2 */}
        <section className="about__section2" ref={section2Ref}>
          <div className="about__left2">
            <div className="about__section2__top">
              <div className="about__section2__whoami">
                <div className="about__section2__whoami__title">
                  /{'>'} whoami
                </div>
              </div>
              <div className="about__section2__hidden">
              </div>
              <div className='about__section2__hidden'>
              </div>
            </div>

            <div className="about__section2__bottom">
              <div className="about__section2__whoami__description">
                <p>
                  I am a software development student and cybersecurity specialist,
                  from Barcelona, Spain.
                  Passionate about technology and continuous learning,
                  committed to problem-solving, teamwork and resilience.
                  Currently studying software engineering,
                  I craft projects that combine dev and security concerns.
                  I aim to reflect my skills,
                  adaptability and openness to professional opportunities.
                </p>
              </div>

              <div className="about__section2__education">
                <span className='about__section2__education__heading'>Education</span>
                <div>
                  <hr className="about__section2__divider" />
                </div>
                <div className='about__section2__education__item'>
                  <span className="about__section2__education__title">Universitat Oberta de Catalunya</span> <br />
                  <span className="about__section2__education__subtitle">Software Engineering Degree - In progress</span>
                </div>
                <div className='about__section2__education__item'>
                  <span className="about__section2__education__title">Campus<span style={{ fontFamily: 'Monospace' }}>42</span> BCN</span> <br />
                  <span className="about__section2__education__subtitle">Alumni of the <span style={{ fontFamily: 'Monospace' }}>1</span>st Promotion of Campus<span style={{ fontFamily: 'Monospace' }}>42</span> BCN</span>
                </div>
                <div className='about__section2__education__item'>
                  <span className="about__section2__education__title">STUCOM CESF</span> <br />
                  <span className="about__section2__education__subtitle">Higher Technical Diploma in Networked Systems Administration - Cybersecurity Specialization</span>
                </div>
                <div className='about__section2__education__item'>
                  <span className="about__section2__education__title">STUCOM</span> <br />
                  <span className="about__section2__education__subtitle">Intermediate Technical Diploma in Microcomputer Systems and Networking</span>
                </div>
              </div>

              <div className="about__section2__experience-links__container">
                <div className="about__section2__experience">
                  <span className='about__section2__experience__heading'>Experience</span>
                  <div>
                    <hr className="about__section2__divider" />
                  </div>
                  <div className='about__section2__experience'>
                    <span className="about__section2__experience__description">
                      <p>
                        I have contributed to multiple projects and completed an internship at a Barcelona SOC,
                        where I coordinated peer projects and supported diverse operational tasks;
                        confidentiality limits further detail.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="about__section2__links">
                  <span className='about__section2__links__heading'>Stalk Me</span>
                  <div>
                    <hr className="about__section2__divider" />
                  </div>
                  <div className='about__section2__links__items'>
                    <div className='about__section2__links__item'>
                      <span className="about__section2__links__title">LinkedIn Profile</span> <br />
                      <span className="about__section2__links__subtitle"><a href="https://www.linkedin.com/in/david-gomp/" target="_blank" rel="noopener noreferrer">CLICK HERE <i className="fa-solid fa-square-arrow-up-right"></i></a></span>
                    </div>
                    <div className='about__section2__links__item'>
                      <span className="about__section2__links__title">Github Profile</span> <br />
                      <span className="about__section2__links__subtitle"><a href="https://github.com/veqqar" target="_blank" rel="noopener noreferrer">CLICK HERE <i className="fa-solid fa-square-arrow-up-right"></i></a></span>
                    </div>
                    <div className='about__section2__links__item'>
                      <span className="about__section2__links__title">Download Resume</span> <br />
                      <span className="about__section2__links__subtitle"><a href="" target="_blank" rel="noopener noreferrer">CLICK HERE <i className="fa-solid fa-square-arrow-up-right"></i></a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="about__section3" ref={section3Ref}>
          <div className="about__left3">
            <div className="about__section3__header">
              <div className='about__section3__header__title'>
                /{'>'} coding stack
              </div>
            </div>
            <div className="about__section3__content">
              <div className="about__section3__content__top">
                <div className="about__section3__content__top__title">
                  // Lenguagues / Frameworks / Libraries //
                </div>
                <div>
                  <hr className="about__section3__divider" />
                </div>
                <div className="about__section3__content__top__stack__container">
                  <div className="about__section3__content__top__stack__grid">
                    <img src={javascript_icon} alt="JavaScript" />
                    <img src={python_icon} alt="Python" />
                    <img src={java_icon} alt="Java" />
                    <img src={c_icon} alt="C" />
                    <img src={cpp_icon} alt="C++" />
                    <img src={php_icon} alt="PHP" />
                    <img src={html_icon} alt="HTML5" />
                    <img src={css_icon} alt="CSS3" />
                    <img src={react_icon} alt="React" />
                    <img src={laravel_icon} alt="Laravel" />
                    <img src={express_icon} alt="Express.js" />
                    <img src={bootstrap_icon} alt="Bootstrap" />
                    <img src={wordpress_icon} alt="WordPress" />
                    <img src={mongodb_icon} alt="MongoDB" />
                    <img src={mysql_icon} alt="MySQL" />
                    <img src={postgresql_icon} alt="PostgreSQL" />
                    <img src={docker_icon} alt="Docker" />
                    <img src={ansible_icon} alt="Ansible" />
                    <img src={terraform_icon} alt="Terraform" />
                    <img src={git_icon} alt="Git" />
                    <img src={nodejs_icon} alt="Node.js" />
                    <img src={nginx_icon} alt="Nginx" />
                    <img src={firebase_icon} alt="Firebase" />
                    <img src={aws_icon} alt="AWS" />
                  </div>
                </div>
              </div>
              <div className="about__section3__content__bottom">
                <div className="about__section3__content__bottom__left">
                  <div className="about__section3__content__bottom__left__title">
                    Skills in Programming
                  </div>
                  <div>
                    <hr className="about__section3__divider" />
                  </div>
                  <div className="about__section3__content__bottom__left__description">
                    <p>
                      I work across multiple programming languages and adapt quickly between fornt-end and back-end.
                      My primary front-end work uses React (JavaScript),
                      while I also employ Python, Ansible, PHP, C, Java and C++ as needed.
                      I consider myself intermediate, eager to learn and prepared to tackle demanding technical challenges.
                    </p>
                  </div>
                </div>
                <div className="about__section3__content__bottom__right">
                  <div className="about__section3__content__bottom__right__title">
                    Knowledge in Development
                  </div>
                  <div>
                    <hr className="about__section3__divider" />
                  </div>
                  <div className="about__section3__content__bottom__right__description">
                    <p>
                      I cover frontend, backend, DevOps, APIs and databases end-to-end,
                      taking concepts from Figma to deployed applications.
                      I regularly use Docker, Kubernetes, AWS and Git,
                      and I build both SQL and NoSQL solutions, prioritizing maintainability,
                      performance and practical deployment workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="about__section4" ref={section4Ref}>
          <div className="about__left4">
            <div className="about__section4__header">
              <div className='about__section4__header__title'>
                /{'>'} cyber stack
              </div>
            </div>
            <div className="about__section4__content">
              <div className="about__section4__content__top">
                <div className="about__section4__content__top__title">
                  // Tools //
                </div>
                <div>
                  <hr className="about__section4__divider" />
                </div>
                <div className="about__section4__content__top__stack__container">
                  <div className="about__section4__content__top__stack__grid">
                    <img src={nmap_icon} alt="Nmap" />
                    <img src={metasploit_icon} alt="Metasploit" />
                    <img src={burpsuite_icon} alt="Burp Suite" />
                    <img src={wireshark_icon} alt="Wireshark" />
                    <img src={hydra_icon} alt="Hydra" />
                    <img src={shodan_icon} alt="Shodan" />
                    <img src={theharvester_icon} alt="theHarvester" />
                    <img src={spiderfoot_icon} alt="SpiderFoot" />
                    <img src={maltego_icon} alt="Maltego" />
                  </div>
                </div>
                <div>
                  <hr className="about__section4__divider" />
                </div>
              </div>
              <div className="about__section4__content__middle">
                <div className="about__section4__content__middle__left">
                  <div className="about__section4__content__middle__left__title">
                    Defense
                  </div>
                  <div>
                    <hr className="about__section4__divider" />
                  </div>
                  <div className="about__section4__content__middle__left__description">
                    <p>
                      I have implemented defensive measures using SIEM solutions and IDS/IPS platforms,
                      tuning configurations and authoring alerting rules.
                      I develop MITRE-mapped playbooks and deploy integrated honeypot simulations.
                      I also apply forensic tools such as Wireshark, Snort and Volatility in controlled laboratory environments.
                    </p>
                  </div>
                </div>
                <div className="about__section4__content__middle__right">
                  <div className="about__section4__content__middle__right__title">
                    Offense
                  </div>
                  <div>
                    <hr className="about__section4__divider" />
                  </div>
                  <div className="about__section4__content__middle__right__description">
                    <p>
                      My offensive practice emphasizes reconnaissance,
                      controlled exploitation and post-exploitation including lateral movement.
                      All testing is conducted ethically and within authorized scopes.
                      I have practical experience with tools such as Metasploit,
                      Nmap, Burp Suite and Nikto to assess and demonstrate vulnerabilities responsibly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="about__section4__content__bottom">
                <div className="about__section4__content__bottom__left">
                  <div className="about__section4__content__bottom__left__title">
                    Methodology
                  </div>
                  <div>
                    <hr className="about__section4__divider" />
                  </div>
                  <div className="about__section4__content__bottom__left__description">
                    <p>
                      I rely on structured frameworks such as MITRE ATT&CK to design playbooks and assessments.
                      I work collaboratively across red and blue teams, coordinating handovers and joint exercises,
                      and I follow standard incident response lifecycles to ensure measured,
                      verifiable results in lab and authorized environments.
                    </p>
                  </div>
                </div>
                <div className="about__section4__content__bottom__right">
                  <div className="about__section4__content__bottom__right__title">
                    Skills and Knowledge
                  </div>
                  <div>
                    <hr className="about__section4__divider" />
                  </div>
                  <div className="about__section4__content__bottom__right__description">
                    <p>
                      Competencies include network analysis, wireless (Bluetooth/Wi-Fi) research,
                      CTF participation, and OSINT methods using Maltego, SpiderX and Shodan.
                      I perform darknet monitoring and data collection solely for research
                      and monitoring purposes, and I practice on VulnHub, HackTheBox and TryHackMe
                      to refine techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="about__section5" ref={section5Ref}>
          <div className="about__left5">
            <div className="about__section5__left__header">
              <div className="about__section5__left__header__title">
                /{'>'} about this site
              </div>
              <div className="about__section5__left__header__description"></div>
            </div>
            <div className="about__section5__middle__content">
              <div className="about__section5__middle__content__header"></div>
              <div className="about__section5__middle__content__description">
                <p>
                  <i className="fa-solid fa-copyright"></i> <span style={{fontFamily: "Monospace"}}>2025</span><br />
                  All rights reserved. <br />
                  The site is proprietary and not open source; however, I welcome collaboration or inquiries and can share resources upon request.
                </p>
              </div>
            </div>
            <div className="about__section5__right__content">
              <div className="about__section5__right__content__header"></div>
              <div className="about__section5__right__content__description">
                <p>
                  I built this portfolio primarily with React and standard front-end technologies.
                  It is deployed on GitHub Pages, with select backend-like utilities recreated in Python.
                  The design is my own, inspired by various portfolios;
                  I pursued a minimalist, responsive layout that balances GIFs,
                  videos and CSS animations with performance optimizations to keep it lightweight and accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;