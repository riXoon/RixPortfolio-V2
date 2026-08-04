import React from 'react'
import { ExpertiseData } from '../constants'
import Badge from './Badge'

const Skills = () => {

  const techStacks = ExpertiseData[0].techStacks;

  return (
    <div className='flex flex-col lg:gap-6 gap-4 py-8 pt-14'>
      <h1 className='relative z-10 uppercase text-white font-black text-[3rem] lg:text-[7rem] whitespace-nowrap leading-none text-center md:mb-[3rem]' id='scroll-animation-26'>EXPERTISE</h1>
      <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] my-4 z-10 group/ticker' id='scroll-animation-27'>
        <ul className='flex items-center justify-center md:justify-start flex-none w-max [&_li]:shrink-0 [&_li]:mx-3 lg:[&_li]:mx-5 animate-infinite-scroll group-hover/ticker:[animation-play-state:paused]'>
          {[...techStacks, ...techStacks, ...techStacks].map((stack, index) => (
            <li className="relative flex items-center" key={index}>
              <div className="group/badge relative flex items-center">
                <Badge styles={'lg:p-3 p-2 relative transition-all duration-300 ease-out hover:border-[#9B72EF]/50 hover:bg-[#7B4FD0]/10 hover:shadow-[0_0_20px_rgba(123,79,208,0.25)] cursor-help rounded-xl'}>
                  <img src={stack.icon} alt={stack.tooltip} className='w-7 h-7 lg:w-10 lg:h-10 transition-transform duration-300 ease-out group-hover/badge:scale-110 drop-shadow-lg' />
                </Badge>
                <div className={`absolute text-xs bg-[#1A1625]/95 backdrop-blur-md text-[#E2D8FF] font-medium tracking-wide lg:px-3 px-2 lg:py-2 py-1.5 z-50 rounded-lg opacity-0 translate-y-2 group-hover/badge:opacity-100 group-hover/badge:translate-y-0 text-nowrap transition-all duration-300 ease-out bottom-[130%] left-[50%] transform -translate-x-1/2 pointer-events-none border border-[#7B4FD0]/40 shadow-[0_4px_15px_rgba(0,0,0,0.6)]`}>
                  {stack.tooltip}
                  <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1A1625] border-b border-r border-[#7B4FD0]/40 rotate-45"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ul className='flex items-center justify-center md:justify-start flex-none w-max [&_li]:shrink-0 [&_li]:mx-3 lg:[&_li]:mx-5 animate-infinite-scroll group-hover/ticker:[animation-play-state:paused]' aria-hidden="true">
          {[...techStacks, ...techStacks, ...techStacks].map((stack, index) => (
            <li className="relative flex items-center" key={index}>
              <div className="group/badge relative flex items-center">
                <Badge styles={'lg:p-3 p-2 relative transition-all duration-300 ease-out hover:border-[#9B72EF]/50 hover:bg-[#7B4FD0]/10 hover:shadow-[0_0_20px_rgba(123,79,208,0.25)] cursor-help rounded-xl'}>
                  <img src={stack.icon} alt={stack.tooltip} className='w-7 h-7 lg:w-10 lg:h-10 transition-transform duration-300 ease-out group-hover/badge:scale-110 drop-shadow-lg' />
                </Badge>
                <div className={`absolute text-xs bg-[#1A1625]/95 backdrop-blur-md text-[#E2D8FF] font-medium tracking-wide lg:px-3 px-2 lg:py-2 py-1.5 z-50 rounded-lg opacity-0 translate-y-2 group-hover/badge:opacity-100 group-hover/badge:translate-y-0 text-nowrap transition-all duration-300 ease-out bottom-[130%] left-[50%] transform -translate-x-1/2 pointer-events-none border border-[#7B4FD0]/40 shadow-[0_4px_15px_rgba(0,0,0,0.6)]`}>
                  {stack.tooltip}
                  <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1A1625] border-b border-r border-[#7B4FD0]/40 rotate-45"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Skills
