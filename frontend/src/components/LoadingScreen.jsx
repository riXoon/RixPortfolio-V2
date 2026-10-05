import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FMlogo } from '../assets';

const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "MOUNTING VIRTUAL FILESYSTEM...",
  "DECRYPTING ASSETS...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING NEURAL NETWORKS...",
  "BYPASSING MAINFRAME FIREWALL...",
  "SYNCING TO GLOBAL GRID...",
  "RENDERING USER INTERFACE...",
  "SYSTEM ONLINE."
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(BOOT_LOGS[0]);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 6) + 2;
        return next > 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Map progress to boot logs
    const logIndex = Math.floor((progress / 100) * (BOOT_LOGS.length - 1));
    setCurrentLog(BOOT_LOGS[logIndex]);
  }, [progress]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#07050A] overflow-hidden relative selection:bg-transparent">
      {/* Background Grid & Vignette */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#9B72EF 1px, transparent 1px), linear-gradient(90deg, #9B72EF 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      ></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0710]/80 to-[#050308]"></div>
      
      {/* CRT Scanline effect */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>

      {/* Background Floating Hex/Text */}
      <div className="absolute inset-0 flex justify-between px-4 py-8 md:px-12 md:py-12 opacity-[0.07] font-mono text-[10px] md:text-xs text-[#9B72EF] pointer-events-none mix-blend-screen overflow-hidden">
        <div className="flex flex-col gap-2">
          {Array.from({length: 15}).map((_, i) => <span key={`l-${i}`}>0x{(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, '0').toUpperCase()}</span>)}
        </div>
        <div className="flex flex-col gap-2 text-right">
          {Array.from({length: 15}).map((_, i) => <span key={`r-${i}`}>0x{(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, '0').toUpperCase()}</span>)}
        </div>
      </div>
      
      {/* Animated Logo */}
      <motion.div
        className="z-10 relative flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
           animate={{ y: [0, -8, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img 
            src={FMlogo} 
            alt="rix-logo" 
            className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(155,114,239,0.8)]"
            animate={{ 
              filter: [
                'drop-shadow(0 0 12px rgba(155,114,239,0.3))',
                'drop-shadow(0 0 35px rgba(155,114,239,0.9))',
                'drop-shadow(0 0 12px rgba(155,114,239,0.3))'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Boot Logs Terminal */}
      <div className="z-10 mt-14 mb-4 h-6 flex items-center justify-center font-mono text-[10px] md:text-xs text-[#9B72EF]/70 uppercase tracking-widest min-w-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLog}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            {`> ${currentLog}`}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar Container */}
      <motion.div 
        className="z-10 w-64 md:w-96 h-[2px] bg-[#1a1525] relative rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-transparent via-[#9B72EF] to-[#E2D4FF]"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        >
          {/* Laser Head Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E2D4FF] rounded-full blur-[5px] opacity-90 shadow-[0_0_15px_#E2D4FF]"></div>
        </motion.div>
      </motion.div>

      {/* Loading Percentage & Status */}
      <motion.div 
        className="z-10 mt-6 font-mono text-xs md:text-sm text-[#9B72EF]/80 flex items-center justify-between w-64 md:w-96 px-1 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-[#9B72EF] animate-pulse opacity-80">SYS.BOOT</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[#E2D4FF] font-semibold">{Math.min(progress, 100)}%</span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="inline-block w-[6px] h-[14px] bg-[#E2D4FF]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
