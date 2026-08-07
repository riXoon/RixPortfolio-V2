import React, { useState, useEffect } from 'react';
import Button from './Button';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import useGsapAnimations from '../hooks/useGsapAnimations';
import { HeroData, ContactData } from '../constants';
import senecaImg from '../assets/senec4.png';

const TypewriterIntro = ({ name, content, visible }) => {
  const text1 = "Hello World! I'm ";
  const text2 = name;
  const text3 = "," + content;
  const fullText = text1 + text2 + text3;
  const [charsTyped, setCharsTyped] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const type = () => {
      if (i < fullText.length) {
        i += 3; // 3 chars at a time
        if (i > fullText.length) i = fullText.length;
        setCharsTyped(i);
        setTimeout(type, 10);
      }
    };
    setTimeout(type, 50);
  }, [visible, fullText]);

  const typed1 = text1.substring(0, charsTyped);
  const remaining1 = charsTyped - text1.length;
  
  const typed2 = remaining1 > 0 ? text2.substring(0, remaining1) : '';
  const remaining2 = charsTyped - (text1.length + text2.length);

  const typed3 = remaining2 > 0 ? text3.substring(0, remaining2) : '';

  return (
    <div className='relative'>
      {/* Invisible placeholder to reserve height */}
      <p className='text-white leading-relaxed opacity-0 pointer-events-none select-none' aria-hidden="true">
        {text1}
        <span className='font-semibold'>{text2}</span>
        {text3}
      </p>
      {/* Actual typing text */}
      <p className='text-white leading-relaxed absolute top-0 left-0 w-full h-full'>
        {typed1}
        {typed2.length > 0 && <span className='font-semibold text-[#c4a8ff]'>{typed2}</span>}
        {typed3.length > 0 && typed3}
        {visible && charsTyped < fullText.length && (
          <span className="zsh-typing-cursor inline-block w-1.5 h-3.5 bg-[#9B72EF] align-baseline ml-[1px] opacity-60" />
        )}
      </p>
    </div>
  );
};

const Hero = () => {
  const heroData = HeroData[0];
  const contacts = ContactData[0];
  // Track when each terminal prompt finishes typing
  const [introDone, setIntroDone] = useState(false);
  const [headingDone, setHeadingDone] = useState(false);
  // GSAP Custom Hook
  useGsapAnimations();
  return (
    <>
      {/* CSS Glow — replaces the old glow01 image, still uses same ID for GSAP */}
      <div
        id='scroll-animation-3'
        className='kali-glow'
        style={{ width: '55rem', height: '40rem', top: '-10rem', left: '-14rem' }}
      />
      <div className='lg:pl-[11rem] pl-14 h-full lg:p-6 p-4 flex'>
        {/* Left roles column */}
        <div className='md:flex hidden md:mb-0 mb-[6rem] flex-col justify-end items-end md:pr-4 pr-0 uppercase' id='scroll-animation-2'>
          {heroData.role.map((role, index) => (
            <h4 key={index} className="text-white text-nowrap lg:text-sm text-xs opacity-60">{role}</h4>
          ))}
        </div>
        {/* Right Container */}
        <div className='rounded-md rounded-tr-[2.5rem] h-full p-[1px] bg-border-gradient'>
          <div className='relative rounded-md rounded-tr-[2.5rem] h-full p-5 bg-base flex flex-col justify-between overflow-hidden'>
            {/* Seneca Backdrop */}
            <div id='scroll-animation-hero-backdrop' className='absolute inset-0 z-0 opacity-15 pointer-events-none flex justify-end items-center mix-blend-screen grayscale'>
              <div className='absolute inset-0 bg-gradient-to-r from-base via-base/80 to-transparent z-10' />
              <div className='absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent z-10' />
              <img 
                src={senecaImg} 
                alt="Seneca Backdrop" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover lg:object-contain lg:object-right scale-110 lg:scale-[1.3] lg:translate-x-12 opacity-40" 
              />
            </div>

            {/* Top side */}
            <div className='relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:space-y-0 space-y-4'>
              <div className='z-10 space-y-2'>
                {/* ZSH prompt above intro text */}
                <TerminalPrompt
                  command={<>cat <span>HelloWorld.txt</span></>}
                  commandStr="cat HelloWorld.txt"
                  onComplete={() => setIntroDone(true)}
                />
                {/* Intro paragraph reveals after command finishes */}
                <TerminalOutput visible={introDone}>
                  <TypewriterIntro name={heroData.name} content={heroData.content} visible={introDone} />
                </TerminalOutput>
              </div>
              
              <div className='flex flex-col items-end justify-start gap-6'>
                {/* Buttons also reveal after intro command */}
                <TerminalOutput visible={introDone} delay={100} className='flex justify-end items-start gap-4'>
                 {/*  <a href={'https://fm-linktree.vercel.app/'} target="_blank" rel="noopener noreferrer">
                    <Button text={'Linktree'} styles={'hover:bg-kali-dim'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 lg:size-4">
                        <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </a> */}
                  <a href={`mailto:${contacts.contacts[0].name}`}>
                    <Button text={'Get in touch'} styles={'bg-[#7B4FD0] hover:bg-[#6A3FBF]'} round={'rounded-md lg:rounded-tr-[1.5rem]'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 lg:size-4">
                        <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </a>
                </TerminalOutput>

              </div>
            </div>
            {/* Bottom Side */}
            <div className='relative z-10 flex flex-col items-start uppercase md:mb-0 mb-[6rem]' id='scroll-animation-1'>
              <div className='md:mb-0 mb-[4px] md:hidden flex flex-col justify-end items-start md:pr-4 pr-0 uppercase' id='scroll-animation-2'>
                {heroData.role.map((role, index) => (
                  <h4 key={index} className="text-white text-nowrap lg:text-sm text-xs opacity-60">{role}</h4>
                ))}
              </div>
              {/* ZSH prompt above the big heading */}
              <TerminalPrompt
                command={<>echo <span>builder</span></>}
                commandStr="echo builder"
                onComplete={() => setHeadingDone(true)}
                className='normal-case lg:mb-2 mb-1 lg:ml-2.5'
              />
              {/* Big heading reveals after echo command finishes */}
              <TerminalOutput visible={headingDone}>
                <h1 id='hero-heading-parent'>
                  <span>B</span>
                  <div id='hero-heading-child'>
                    <div className="word1">UILDER</div>
                    <div className="word2">REAKER</div>
                  </div>
                </h1>
              </TerminalOutput>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
