import React, { useState, useEffect } from 'react';
import { AboutData } from '../constants';
import Badge from './Badge';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import useGsapAnimations from '../hooks/useGsapAnimations';

const TypewriterParagraph = ({ text, visible, delay = 0, className = "" }) => {
  const [charsTyped, setCharsTyped] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const type = () => {
      if (i < text.length) {
        i += 3;
        if (i > text.length) i = text.length;
        setCharsTyped(i);
        setTimeout(type, 10);
      }
    };
    const timer = setTimeout(type, delay + 50);
    return () => clearTimeout(timer);
  }, [visible, text, delay]);

  const typed = text.substring(0, charsTyped);
  const placeholderClasses = className.replace(/scroll-animation-\d+/g, '').trim();

  return (
    <div className="relative">
      {/* Invisible placeholder to prevent layout shift */}
      <p className={`${placeholderClasses} opacity-0 pointer-events-none select-none`} aria-hidden="true">
        {text}
      </p>
      {/* Actual typing text */}
      <p className={`${className} absolute top-0 left-0 w-full h-full`}>
        {typed}
        {visible && charsTyped < text.length && (
          <span className="zsh-typing-cursor inline-block w-1.5 h-3.5 bg-[#9B72EF] align-baseline ml-[1px] opacity-60" />
        )}
      </p>
    </div>
  );
};

const About = () => {
  // GSAP Custom Hook
  useGsapAnimations();
  return (
    <>
      {/* CSS Glow — replaces glow02 image, same ID for GSAP */}
      <div
        id='scroll-animation-5'
        className='kali-glow'
        style={{ width: '60rem', height: '50rem', top: '0', right: '-10rem' }}
      />
      <div className='relative z-10 lg:pl-[13.5rem] lg:p-6 p-4 flex flex-col md:gap-[5rem] gap-[3rem]'>
        <WhoAmI />
        <HowItStarted />
        <HowsItGoing />
      </div>
    </>
  )
}

const whoAmIData = AboutData[0].whoAmI[0];

const WhoAmI = () => {
  const [done, setDone] = useState(false);
  return (
    <div className='grid grid-cols-8'>
      <div className='lg:col-span-6 col-span-8 p-[1px] rounded-md bg-border-gradient-1 relative z-10'>
        <div className='bg-base rounded-md h-full flex flex-col overflow-hidden'>
          <div className='flex items-center px-4 py-3 bg-[#1A1625]/80 border-b border-[#3B2B6A]/50'>
            <div className='flex space-x-2 w-[52px]'>
              <div className='w-3 h-3 rounded-full bg-[#FF5F56]'></div>
              <div className='w-3 h-3 rounded-full bg-[#FFBD2E]'></div>
              <div className='w-3 h-3 rounded-full bg-[#27C93F]'></div>
            </div>
            <div className='flex-1 text-center text-xs text-[#9B72EF] font-mono opacity-60'>
              senec4@kali: ~
            </div>
            <div className='w-[52px]'></div>
          </div>
          <div className='p-6 md:p-8 flex-1'>
          <TerminalPrompt
            command={<>whoami</>}
            commandStr="whoami"
            onComplete={() => setDone(true)}
            className='md:ml-[5rem] mb-1'
          />
          {/* Big heading reveals when prompt completes */}
          <TerminalOutput visible={done}>
            <h1 className='uppercase text-white font-black text-[2rem] lg:text-[9rem] whitespace-nowrap leading-none
              md:ml-[5rem]' id='scroll-animation-4'>Whoam<span className='text-[#9B72EF]'>i</span></h1>
          </TerminalOutput>
          {/* Body content reveals after heading */}
          <TerminalOutput visible={done} delay={120}>
            <div className='my-7 space-y-4 scroll-animation-6'>
              <p>
                I am
                <span className='text-[#c4a8ff] font-bold uppercase tracking-wider'> {whoAmIData.name}</span>
              </p>
              {/* Rendered roles badges */}
              <div className='gap-3 flex flex-wrap justify-start items-center'>
                {whoAmIData.badge.map((badge, index) => (
                  <Badge key={index} text={badge.title} styles={'lg:py-2 lg:px-4 py-1.5 px-3 inline-flex items-center text-nowrap gap-2 text-xs lg:text-sm bg-[#1A1625]/80 border-[#3B2B6A] shadow-md'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:size-4 size-3 text-[#9B72EF]">
                      <path strokeLinecap="round" strokeLinejoin="round" d={badge.svgPath} />
                    </svg>
                  </Badge>
                ))}
              </div>
            </div>
            {/* Description */}
            <TypewriterParagraph text={whoAmIData.content} visible={done} delay={120} className='scroll-animation-6 md:pr-24 leading-relaxed text-gray-300' />
          </TerminalOutput>
        </div>
        </div>
      </div>
    </div>
  )
}

const howItStartedData = AboutData[0].howItStarted[0];

const HowItStarted = () => {
  const [done, setDone] = useState(false);
  return (
    <div className='grid grid-cols-8'>
      <div className='lg:col-span-6 lg:col-start-3 col-span-8 p-[1px] rounded-md bg-border-gradient-2 relative z-10'>
        <div className='bg-base rounded-md h-full flex flex-col overflow-hidden'>
          <div className='flex items-center px-4 py-3 bg-[#1A1625]/80 border-b border-[#3B2B6A]/50'>
            <div className='flex space-x-2 w-[52px]'>
              <div className='w-3 h-3 rounded-full bg-[#FF5F56]'></div>
              <div className='w-3 h-3 rounded-full bg-[#FFBD2E]'></div>
              <div className='w-3 h-3 rounded-full bg-[#27C93F]'></div>
            </div>
            <div className='flex-1 text-center text-xs text-[#9B72EF] font-mono opacity-60'>
              senec4@kali: ~
            </div>
            <div className='w-[52px]'></div>
          </div>
          <div className='p-6 md:p-8 flex-1 space-y-5'>
          <TerminalPrompt
            command={<>cat <span>the_beginning.log</span></>}
            commandStr="cat the_beginning.log"
            onComplete={() => setDone(true)}
            className='md:ml-[4rem]'
          />
          {/* Heading reveals when prompt completes */}
          <TerminalOutput visible={done}>
            <h1 className='uppercase text-white font-black md:text-nowrap text-wrap text-[2rem] lg:text-[5rem] whitespace-nowrap leading-none md:ml-[4rem]' id='scroll-animation-7'>
              The <span className='text-[#9B72EF]'>beginning</span>
            </h1>
          </TerminalOutput>
          {/* Icons reveal slightly after heading */}
          <TerminalOutput visible={done} delay={100}>
            <div className='flex gap-3 lg:gap-4 scroll-animation-8 pt-2'>
              {howItStartedData.icons.map((icon, index) => (
                <div className="relative flex items-center" key={index}>
                  <div className="group/badge relative flex items-center">
                    <Badge styles={'lg:p-3 p-2 relative group-hover/badge:scale-110 transition-all duration-300 ease-in-out border-[#40317A] hover:border-[#9B72EF] bg-[#1C182D]/80 hover:bg-[#2A243F] shadow-lg cursor-help'}>
                      <img src={icon.icon} alt={icon.tooltip} loading='lazy' decoding='async' className='w-6 h-6 lg:w-8 lg:h-8 drop-shadow-md' />
                    </Badge>
                    <div className={`absolute text-xs bg-[#1A1625]/95 backdrop-blur-md text-[#E2D8FF] font-medium tracking-wide lg:px-3 px-2 lg:py-2 py-1.5 z-50 rounded-lg opacity-0 translate-y-2 group-hover/badge:opacity-100 group-hover/badge:translate-y-0 text-nowrap transition-all duration-300 ease-out bottom-[130%] left-[50%] transform -translate-x-1/2 pointer-events-none border border-[#7B4FD0]/40 shadow-[0_4px_15px_rgba(0,0,0,0.6)]`}>
                      {icon.tooltip}
                      <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1A1625] border-b border-r border-[#7B4FD0]/40 rotate-45"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TerminalOutput>
          {/* Bio text reveals last */}
          <TerminalOutput visible={done} delay={200}>
            <TypewriterParagraph text={howItStartedData.content} visible={done} delay={200} className='scroll-animation-8 md:pr-24 leading-relaxed text-gray-300' />
          </TerminalOutput>
        </div>
        </div>
      </div>
    </div>
  )
}

const HowsItGoingData = AboutData[0].howsItGoing[0];

const HowsItGoing = () => {
  const [done, setDone] = useState(false);
  return (
    <div className='grid grid-cols-8'>
      <div className='lg:col-span-6 col-span-8 p-[1px] rounded-md bg-border-gradient-3 relative z-10'>
        <div className='bg-base rounded-md h-full flex flex-col overflow-hidden'>
          <div className='flex items-center px-4 py-3 bg-[#1A1625]/80 border-b border-[#3B2B6A]/50'>
            <div className='flex space-x-2 w-[52px]'>
              <div className='w-3 h-3 rounded-full bg-[#FF5F56]'></div>
              <div className='w-3 h-3 rounded-full bg-[#FFBD2E]'></div>
              <div className='w-3 h-3 rounded-full bg-[#27C93F]'></div>
            </div>
            <div className='flex-1 text-center text-xs text-[#9B72EF] font-mono opacity-60'>
              senec4@kali: ~
            </div>
            <div className='w-[52px]'></div>
          </div>
          <div className='p-6 md:p-8 flex-1 space-y-5'>
          <TerminalPrompt
            command={<>cat <span>in_progress.log</span></>}
            commandStr="cat in_progress.log"
            onComplete={() => setDone(true)}
          />
          {/* Heading reveals when prompt completes */}
          <TerminalOutput visible={done}>
            <h1 className='uppercase text-white font-black md:text-nowrap text-wrap text-[2rem] lg:text-[5rem] whitespace-nowrap leading-none' id='scroll-animation-9'>
              In <span className='text-[#9B72EF]'>progress</span>
            </h1>
          </TerminalOutput>
          {/* Icons reveal slightly after heading */}
          <TerminalOutput visible={done} delay={100}>
            <div className='flex flex-wrap gap-3 lg:gap-4 scroll-animation-10 pt-2'>
              {HowsItGoingData.icons.map((icon, index) => (
                <div className="relative flex items-center" key={index}>
                  <div className="group/badge relative flex items-center">
                    <Badge styles={'lg:p-3 p-2 relative group-hover/badge:scale-110 transition-all duration-300 ease-in-out border-[#40317A] hover:border-[#9B72EF] bg-[#1C182D]/80 hover:bg-[#2A243F] shadow-lg cursor-help'}>
                      <img src={icon.icon} alt={icon.tooltip} loading='lazy' decoding='async' className='w-6 h-6 lg:w-8 lg:h-8 drop-shadow-md' />
                    </Badge>
                    <div className={`absolute text-xs bg-[#1A1625]/95 backdrop-blur-md text-[#E2D8FF] font-medium tracking-wide lg:px-3 px-2 lg:py-2 py-1.5 z-50 rounded-lg opacity-0 translate-y-2 group-hover/badge:opacity-100 group-hover/badge:translate-y-0 text-nowrap transition-all duration-300 ease-out bottom-[130%] left-[50%] transform -translate-x-1/2 pointer-events-none border border-[#7B4FD0]/40 shadow-[0_4px_15px_rgba(0,0,0,0.6)]`}>
                      {icon.tooltip}
                      <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1A1625] border-b border-r border-[#7B4FD0]/40 rotate-45"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TerminalOutput>
          {/* Bio text reveals last */}
          <TerminalOutput visible={done} delay={200}>
            <TypewriterParagraph text={HowsItGoingData.content} visible={done} delay={200} className='scroll-animation-10 md:pr-24 leading-relaxed text-gray-300' />
          </TerminalOutput>
        </div>
        </div>
      </div>
    </div>
  )
}

export default About

