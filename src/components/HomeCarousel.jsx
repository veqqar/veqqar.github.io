import React, { useEffect, useRef, useState } from 'react';
import section1Image from '../assets/imgs/carrousel_img_1.jpg';
import section2Image from '../assets/imgs/carrousel_img_2.jpg';
import section3Image from '../assets/imgs/carrousel_img_3.jpg';

const sectionImages = [section1Image, section2Image, section3Image];
const NUM_STRIPS = 20;
const ANIMATION_DURATION = 800;
const STRIP_DELAY = 40;

const HomeCarousel = ({ section }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const animationRef = useRef(null);
  const stripsProgress = useRef(Array(NUM_STRIPS).fill(0));
  const isAnimating = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setIsReady(true);
    };
    img.onerror = (e) => console.error('Error loading image:', e);
    img.src = sectionImages[section];
  }, [section]);

  useEffect(() => {
    if (!isReady || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { 
      willReadFrequently: true,
      alpha: true
    });
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const container = canvas.parentElement;
    
    const setCanvasSize = () => {
      canvas.width = container.clientWidth * 2;
      canvas.height = container.clientHeight * 2;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
      drawImage(ctx);
    };

    setCanvasSize();
    
    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(container);

    const initTimeout = setTimeout(() => {
      startAnimation(true);
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [isReady, image]);

  const drawImage = (ctx) => {
    if (!image || !ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const stripWidth = Math.ceil(ctx.canvas.width / NUM_STRIPS);
    const totalWidth = stripWidth * NUM_STRIPS;
    const xOffset = Math.max(0, (ctx.canvas.width - totalWidth) / 2);

    stripsProgress.current.forEach((progress, index) => {
      ctx.save();
      
      const xPos = Math.floor(xOffset + index * stripWidth);
      const revealWidth = Math.ceil(stripWidth * progress);

      ctx.beginPath();
      ctx.rect(xPos, 0, revealWidth, ctx.canvas.height);
      ctx.clip();
      
      ctx.drawImage(
        image,
        Math.floor((index * image.width) / NUM_STRIPS),
        0,
        Math.ceil(image.width / NUM_STRIPS),
        image.height,
        xPos,
        0,
        stripWidth,
        ctx.canvas.height
      );
      
      ctx.restore();
    });
  };

  const startAnimation = (forceShow = false) => {
    if (isAnimating.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const targetVisibility = forceShow ? true : !isVisible.current;
    isVisible.current = targetVisibility;
    isAnimating.current = true;

    stripsProgress.current = Array(NUM_STRIPS).fill(targetVisibility ? 0 : 1);
    const startTime = performance.now();

    const animate = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      const elapsedTotal = performance.now() - startTime;

      stripsProgress.current = stripsProgress.current.map((_, index) => {
        const stripDelay = targetVisibility 
          ? index * STRIP_DELAY 
          : (NUM_STRIPS - 1 - index) * STRIP_DELAY;
          
        const elapsed = Math.max(0, elapsedTotal - stripDelay);
        const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

        let progress = targetVisibility 
          ? 1 - Math.pow(1 - rawProgress, 3)
          : Math.pow(1 - rawProgress, 3);

        return Math.max(0, Math.min(1, progress));
      });

      drawImage(ctx);

      const totalTime = ((NUM_STRIPS - 1) * STRIP_DELAY) + ANIMATION_DURATION;
      
      if (elapsedTotal < totalTime) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        isAnimating.current = false;
        stripsProgress.current = targetVisibility 
          ? Array(NUM_STRIPS).fill(1)
          : Array(NUM_STRIPS).fill(0);
        drawImage(ctx);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div 
      className="home__carrousel" 
      onClick={() => startAnimation()}
      style={{ 
        position: 'relative',
        background: 'transparent',
        mixBlendMode: 'multiply',
        cursor: 'pointer'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{ 
          background: 'transparent',
          imageRendering: 'auto'
        }}
      />
    </div>
  );
};

export default HomeCarousel;