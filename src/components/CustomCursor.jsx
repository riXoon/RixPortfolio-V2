import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverScale, setHoverScale] = useState(4.5);

  // Position for the small, immediate inner block
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the outer trailing brackets
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Helper to check if an element is actually visible
    const isElementVisible = (el) => {
      let current = el;
      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        if (style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none') {
          return false;
        }
        current = current.parentElement;
      }
      return true;
    };

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const interestingElement = target.closest(
        'a, button, img, p, h1, h2, h3, h4, h5, h6, span, li, .cursor-pointer'
      );

      if (interestingElement && isElementVisible(interestingElement)) {
        setIsHovering(true);
        try {
          const computedStyle = window.getComputedStyle(interestingElement);
          const fontSize = parseFloat(computedStyle.fontSize) || 16;
          const calculatedScale = Math.max(4.5, (fontSize / 8) + 2);
          setHoverScale(Math.min(calculatedScale, 15));
        } catch (err) {
          setHoverScale(4.5);
        }
      } else {
        setIsHovering(false);
        setHoverScale(4.5);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // If running on a touch device, don't show the custom cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Trailing Elements (Outer Ring & Inner Ring) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference'
        }}
      >
        {/* Inner Spinning Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-5 h-5 border-[1px] border-dotted border-white rounded-full"
          style={{ x: '-50%', y: '-50%' }}
          animate={{ rotate: 360, opacity: isHovering ? 0 : 0.6 }}
          transition={{ rotate: { repeat: Infinity, duration: 6, ease: "linear" }, opacity: { duration: 0.2 } }}
        />

        {/* Outer Radar Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 border-dashed rounded-full flex items-center justify-center"
          style={{ x: '-50%', y: '-50%' }}
          animate={{ 
            rotate: isHovering ? 90 : -360,
            scale: isHovering ? 0.9 : 1,
            borderWidth: isHovering ? '2px' : '1.5px',
            borderColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)'
          }}
          transition={{ 
            rotate: isHovering ? { duration: 0.3 } : { repeat: Infinity, duration: 12, ease: "linear" },
            scale: { duration: 0.3 },
            borderWidth: { duration: 0.2 },
            borderColor: { duration: 0.2 }
          }}
        >
          {/* Radar crosshair ticks */}
          <div className="absolute top-[-4px] w-[1.5px] h-2 bg-white" />
          <div className="absolute bottom-[-4px] w-[1.5px] h-2 bg-white" />
          <div className="absolute left-[-4px] w-2 h-[1.5px] bg-white" />
          <div className="absolute right-[-4px] w-2 h-[1.5px] bg-white" />
        </motion.div>
      </motion.div>

      {/* Immediate Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference',
          backgroundColor: '#ffffff',
        }}
        animate={{ 
          scale: isHovering ? hoverScale : [1, 1.5, 1],
        }}
        transition={{
          scale: isHovering ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      />
    </>
  );
};

export default CustomCursor;

