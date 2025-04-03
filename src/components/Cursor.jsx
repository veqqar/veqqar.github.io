import React, { useState, useEffect } from 'react';
import '../assets/styles/App.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMerged, setIsMerged] = useState(false);


  /* DISALLOW RIGHT CLICK */

/*

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  document.addEventListener('contextmenu', handleContextMenu);

  */

  useEffect(() => {
    const ATTRACTION_RADIUS = 200; // Radio de atracción del cursor
    const STRENGTH_FACTOR = 0.1;   // Fuerza de atracción
    const MERGE_THRESHOLD = 25;    // Distancia para fusionarse

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      let newX = x;
      let newY = y;
      let merged = false;

      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect();
        const dotCenterX = rect.left + rect.width / 2;
        const dotCenterY = rect.top + rect.height / 2;

        const deltaX = dotCenterX - x;
        const deltaY = dotCenterY - y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < ATTRACTION_RADIUS) {
          const force = (ATTRACTION_RADIUS - distance) / ATTRACTION_RADIUS;
          newX += deltaX * force * STRENGTH_FACTOR;
          newY += deltaY * force * STRENGTH_FACTOR;

          if (distance <= MERGE_THRESHOLD) {
            newX = dotCenterX;
            newY = dotCenterY;
            merged = true;
          }
        }
      });

      setIsMerged(merged);
      setPosition({ x: newX, y: newY });
    };

    const handleHover = () => {
      setIsHovering(true);
    };

    const handleLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll(
      'a, button, .home-icon, .nav__toggler, .logo'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleHover);
      element.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleHover);
        element.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div
      className={`cursor ${isMerged ? 'merged' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className={`cursor-inner ${isMerged ? 'merged' : ''}`}></div>
    </div>
  );
};

export default Cursor;