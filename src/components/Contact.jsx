import React, { useEffect } from 'react';
import SphereAnimation from './extra_functions/SphereAnimation';

const Contact = () => {
  useEffect(() => {
    const video = document.querySelector('.background-video');
    if (video) {
      video.classList.remove('visible');
      video.classList.add('hidden');
    }
    return () => {
      if (video) {
        video.classList.remove('hidden');
        video.classList.add('visible');
      }
    };
  }, []);

  return (
    <div className="contact-container">
      <div className="canvas-wrapper">
        <SphereAnimation />
      </div>
      <div className="content-wrapper">
        <div className="contact__heading">
          <span className="contact__heading__text">Contact Data</span>
          <div>
            <hr className="contact__divider" />
          </div>
          <div className="contact__description">
            <span className="contact__description__text">
              I’m open to freelance work, collaborations, and long-term projects. <br />
              If you think my work could be a good fit for your project, don’t hesitate to reach out.
              I’d love to hear from you.
            </span>
          </div>
        </div>
        <div className="contact__links__heading">
          <span className="contact__links__heading__text">Reach Me Via</span>
          <div>
            <hr className="contact__divider" />
          </div>
          <div className="contact__links__items">
            <div className="contact__links__item">
              <span className="contact__links__title">LinkedIn Profile</span><br />
              <span className="contact__links__subtitle">
                <a href="https://www.linkedin.com/in/david-gomp/" target="_blank" rel="noopener noreferrer">
                  CLICK HERE <i className="fa-solid fa-square-arrow-up-right"></i>
                </a>
              </span>
            </div>
            <div className="contact__links__item">
              <span className="contact__links__title">Github Profile</span><br />
              <span className="contact__links__subtitle">
                <a href="https://github.com/veqqar" target="_blank" rel="noopener noreferrer">
                  CLICK HERE <i className="fa-solid fa-square-arrow-up-right"></i>
                </a>
              </span>
            </div>
            <div className="contact__links__item">
              <span className="contact__links__title">Download Resume</span><br />
              <span className="contact__links__subtitle">
                <a href="" target="_blank" rel="noopener noreferrer">
                  CLICK HERE <i className="fa-solid fa-square-arrow-up-right"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
