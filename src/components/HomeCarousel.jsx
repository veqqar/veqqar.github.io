import React, { useEffect, useRef, useState } from 'react';
import section1Image from '../assets/imgs/carrousel_img_1.jpg';
import section2Image from '../assets/imgs/carrousel_img_2.jpg';
import section3Image from '../assets/imgs/carrousel_img_3.jpg';

const sectionImages = [section1Image, section2Image, section3Image];
const NUM_STRIPS = 20;
const ANIMATION_DURATION = 500;
const STRIP_DELAY = 30;
const START_ROW = 0;

const HomeCarousel = ({ section }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const animationRef = useRef(null);
  const stripsProgress = useRef(Array(NUM_STRIPS).fill(0));
  const isAnimating = useRef(false);

  // Cargar imagen actual
  useEffect(() => {
    const img = new Image();
    img.src = sectionImages[section];
    img.onload = () => {
      setImage(img);
      drawInitialState();
    };
    img.onerror = (e) => console.error('Error loading image:', e);
  }, [section]);

  const drawInitialState = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    stripsProgress.current = Array(NUM_STRIPS).fill(0);
    drawImage(ctx);
  };

  // Configurar canvas
  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { 
      willReadFrequently: true,
      alpha: true
    });
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'auto';

    const container = canvas.parentElement;
    
    const setCanvasSize = () => {
      canvas.width = container.clientWidth * 2;
      canvas.height = container.clientHeight * 2;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
    };

    setCanvasSize();
    drawImage(ctx);

    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [image]);

  const drawImage = (ctx) => {
    if (!image || !ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Dibujar fondo transparente
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Calcular stripWidth como número entero
    const stripWidth = Math.ceil(ctx.canvas.width / NUM_STRIPS);
    
    // Ajustar el ancho total para evitar desbordamiento
    const totalWidth = stripWidth * NUM_STRIPS;
    const xOffset = Math.max(0, (ctx.canvas.width - totalWidth) / 2);

    stripsProgress.current.forEach((progress, index) => {
        ctx.save();
        
        // Calcular posición X como número entero
        const xPos = Math.floor(xOffset + index * stripWidth);
        
        // Ancho de revelación sin espacios
        const revealWidth = Math.ceil(stripWidth * progress);

        // Crear máscara de recorte ajustada
        ctx.beginPath();
        ctx.rect(
            xPos,
            0,
            revealWidth,
            ctx.canvas.height
        );
        ctx.clip();
        
        // Dibujar porción de la imagen con alineación perfecta
        ctx.drawImage(
            image,
            Math.floor((index * image.width) / NUM_STRIPS), // Source X
            0, // Source Y
            Math.ceil(image.width / NUM_STRIPS), // Source width
            image.height, // Source height
            xPos, // Dest X
            0, // Dest Y
            stripWidth, // Dest width
            ctx.canvas.height // Dest height
        );
        
        ctx.restore();
    });
};

  const startAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const animate = (startTime) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      stripsProgress.current = stripsProgress.current.map((_, index) => {
        const elapsed = performance.now() - startTime - (index * STRIP_DELAY);
        const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);
        
        // Easing cúbico para efecto de desaceleración
        return 1 - Math.pow(1 - rawProgress, 3);
      });

      drawImage(ctx);

      if (performance.now() - startTime < (NUM_STRIPS * STRIP_DELAY) + ANIMATION_DURATION) {
        animationRef.current = requestAnimationFrame(() => animate(startTime));
      } else {
        isAnimating.current = false;
        // Forzar estado final completo
        stripsProgress.current = Array(NUM_STRIPS).fill(1);
        drawImage(ctx);
      }
    };

    animationRef.current = requestAnimationFrame(() => animate(performance.now()));
  };

  return (
    <div 
      className="home__carrousel" 
      onClick={startAnimation}
      style={{ 
        position: 'relative',
        cursor: 'pointer',
        background: 'transparent',
        mixBlendMode: 'multiply'
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