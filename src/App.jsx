import React, { useState, useEffect } from 'react';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import background from './assets/imgs/background.mp4';
import './assets/styles/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [timeoutCompleted, setTimeoutCompleted] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isPreloaderClosing, setIsPreloaderClosing] = useState(false);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setTimeoutCompleted(true);
    }, 5000);
    return () => clearTimeout(welcomeTimeout);
  }, []);

  useEffect(() => {
    if (timeoutCompleted && videoLoaded) {
      setIsPreloaderClosing(true);
      const fadeOut = setTimeout(() => {
        setIsPreloaderVisible(false);
      }, 1000);
      return () => clearTimeout(fadeOut);
    }
  }, [timeoutCompleted, videoLoaded]);


  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <>
      {isPreloaderVisible && (
        <Preloader closing={isPreloaderClosing} />
      )}
      
      <div className="app">
        <GrainOverlay />
        <video
          className={`background-video ${videoLoaded ? 'visible' : 'hidden'}`}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={handleVideoLoad}
        >
          <source src={background} type="video/mp4" />
        </video>
        <Nav setCurrentPage={setCurrentPage} />
        <div className="content">{renderPage()}<Cursor /></div>
      </div>
    </>
  );
};

export default App;