import React, { useState } from 'react';
import { AboutData } from '../constants';
import Badge from './Badge';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import useGsapAnimations from '../hooks/useGsapAnimations';

// Destructure the specific education data, because i have different styles in each
const { education } = AboutData[0];
const sfhsSeniorHigh = education.find(ed => ed.title === 'SFHS');
const qcuTertiary = education.find(ed => ed.title === 'QCU');

const Education = () => {
  const [headerDone, setHeaderDone] = useState(false);
  useGsapAnimations();
  return (
    <>
      {/* CSS Glow — replaces glow03 image, same ID for GSAP */}
      <div
        id='scroll-animation-13'
        className='kali-glow'
        style={{ width: '50rem', height: '40rem', top: '10rem', right: '-5rem' }}
      />
      <div className='relative z-10 lg:pl-[13.5rem] lg:p-6 p-4 flex flex-col gap-[2rem]'>
        <div className='flex justify-center items-center'>
          <div className='p-px rounded-md bg-border-gradient-4 w-full xl:w-5/6'>
            <div className='bg-base rounded-md flex flex-col overflow-hidden'>
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
              <div className='p-4 lg:px-12 flex-1'>
                {/* ZSH prompt above the EDUCATION title */}
                <TerminalPrompt
                  command={<>ls <span>education/</span></>}
                  commandStr="ls education/"
                  onComplete={() => setHeaderDone(true)}
                  className='text-center mb-2'
                />
                {/* EDUCATION heading reveals after ls prompt */}
                <TerminalOutput visible={headerDone}>
                  <h1 className='uppercase text-white font-black text-[2.8rem] lg:text-[6rem] whitespace-nowrap leading-none text-center' id='scroll-animation-11'>Education</h1>
                </TerminalOutput>
                <TerminalOutput visible={headerDone} delay={200}>
                  <QcuEducation />
                  <SfhsEducation />
                </TerminalOutput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SfhsEducation = () => {
  const [done, setDone] = useState(false);
  return (
    <div className='flex flex-col gap-4 md:mt-[6rem] mt-[3rem] scroll-animation-12'>
      {/* ZSH prompt for SFHS */}
      <TerminalPrompt
        command={<>cat <span>sfhs.json</span></>}
        commandStr="cat sfhs.json"
        onComplete={() => setDone(true)}
      />
      {/* SFHS content reveals after cat sfhs.json */}
      <TerminalOutput visible={done}>
        <div className='flex lg:gap-12 gap-5'>
          {/* Logo container */}
          <img src={sfhsSeniorHigh.logo} alt="SFHS Logo" loading='lazy' decoding='async' className='w-auto h-[3.5rem] lg:h-[14rem]' />
          <div className='lg:space-y-4 space-y-3'>
            <h1 className='uppercase bg-gradient-to-r from-[#B8B7FF] via-[#9B72EF] to-[#7B4FD0] text-transparent bg-clip-text font-black text-[2rem] lg:text-[5rem] whitespace-nowrap leading-none'>
              {sfhsSeniorHigh.title}
            </h1>
            <div className='flex flex-wrap gap-6'>
              {/* SFHS Secondary */}
              <Content container={'text-wrap lg:space-y-3 space-y-2'} name={sfhsSeniorHigh.name} level={sfhsSeniorHigh.level} course={sfhsSeniorHigh.course} />
            </div>
          </div>
        </div>
      </TerminalOutput>
    </div>
  )
}

const QcuEducation = () => {
  const [done, setDone] = useState(false);
  return (
    <div className='flex flex-col gap-4 lg:mt-[3rem] mt-[3rem] scroll-animation-12'>
      {/* ZSH prompt for QCU */}
      <TerminalPrompt
        command={<>cat <span>qcu.json</span></>}
        commandStr="cat qcu.json"
        onComplete={() => setDone(true)}
      />
      {/* QCU content reveals after cat qcu.json */}
      <TerminalOutput visible={done}>
        <div className='flex lg:gap-12 gap-5'>
          <img src={qcuTertiary.logo} alt="QCU Logo" loading='lazy' decoding='async' className='w-auto h-[3.5rem] lg:h-[12rem]' />
          <div className='lg:space-y-4 space-y-3'>
            <h1 className='uppercase bg-gradient-to-r from-[#B8B7FF] via-[#9B72EF] to-[#7B4FD0] text-transparent bg-clip-text font-black text-[2rem] lg:text-[4rem] whitespace-nowrap leading-none'>
              {qcuTertiary.title}
            </h1>
            <div className='flex flex-wrap gap-6'>
              {/* QCU Tertiary */}
              <Content container={'text-wrap lg:space-y-3 space-y-2'} name={qcuTertiary.name} level={qcuTertiary.level} course={qcuTertiary.course} />
            </div>
          </div>
        </div>
      </TerminalOutput>
    </div>
  )
}

const Content = ({ name, level, course, container }) => {
  return (
    <div className={`${container}`}>
      <h4 className='font-semibold'>{name}</h4>
      <p className='font-thin italic'>{level}</p>
      <Badge text={course} styles={'lg:py-1.5 lg:px-3 py-1 px-2 inline-flex items-center flex-wrap gap-2.5 text-xs lg:text-sm'} />
    </div>
  )
}

export default Education


