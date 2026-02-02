import React, { useState, useEffect } from 'react';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/extra_functions/Cursor';
import Nav from './components/Nav';
import background from './assets/imgs/background.mp4';
import './assets/styles/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [timeoutCompleted, setTimeoutCompleted] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isPreloaderClosing, setIsPreloaderClosing] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [aboutSection, setAboutSection] = useState(1); // Estado para la sección activa del About

  // Aplicar el tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

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
        return <About setAboutSection={setAboutSection} />;
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
        <Nav 
          setCurrentPage={setCurrentPage} 
          toggleTheme={toggleTheme} 
          theme={theme} 
          aboutSection={aboutSection}
          currentPage={currentPage}
        />
        <div className="content">{renderPage()}<Cursor /></div>
      </div>
    </>
  );
};

export default App;