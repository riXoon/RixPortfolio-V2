import React, { useState } from 'react';
import { FMlogo } from '../assets';
import { Socials, navLinks } from '../constants';

const Sidebar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div id='scroll-animation-'>
      <ToggleButton onClick={toggleSidebar} />
      <aside
        className={`fixed lg:flex w-[12rem] h-full flex-col py-8 px-8 lg:backdrop-blur-none backdrop-blur-lg justify-between z-40 transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 visible flex' : '-translate-x-full invisible flex'
          } lg:translate-x-0 lg:visible flex`}
      >
        <div className="flex flex-col space-y-7 flex-grow">
          <HeaderLogo onClick={toggleSidebar} />
          <NavLinks activeSection={activeSection} />
        </div>
        <div className="border-l-[1.3px] lg:ml-[10px] ml-[6px] border-[#3B2B6A]/50 h-full my-8"></div>
        <SocialLinks />
      </aside>
    </div>
  );
};

const ToggleButton = ({ onClick }) => (
  <button
    aria-label="Toggle Menu"
    className="lg:hidden fixed z-40 ml-[0.8rem] mt-[0.8rem] text-white hover:text-[#9B72EF] transition duration-300 ease-in-out  bg-transparent backdrop-blur-lg rounded-[4px] py-[2px] px-[1px]"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
  </button>
);

const HeaderLogo = ({ onClick }) => (
  <div className="flex justify-between items-center">
    <a href="/#home" aria-label="Go to Home">
      <img src={FMlogo} alt="FM-logo" loading='lazy' decoding='async' className="lg:h-[2.5rem] h-[1.8rem] w-auto object-contain" />
    </a>
    <button
      aria-label="Close Menu"
      className="lg:hidden text-white hover:text-[#9B72EF] transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const NavLinks = ({ activeSection }) => (
  <nav aria-label="Main Navigation">
    <ul className="text-white uppercase space-y-[8px]">
      {navLinks.map((nav, index) => (
        <li key={index}>
          <a
            href={`#${nav.id}`}
            className={`nav-link text-[12px] lg:text-sm ${activeSection === nav.id ? 'active-nav-link' : ''}`}
          >
            {nav.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const SocialLinks = () => (
  <div className="flex flex-col gap-4 mt-auto">
    {Socials.map((social, index) => (
      <a key={index} href={social.link} aria-label={social.name} target="_blank" rel="noopener noreferrer" className='self-start transition duration-300 ease-in-out hover:bg-[#1A1625] hover:text-[#9B72EF] hover:scale-110 p-[2px] rounded-md'>
        <svg className="size-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          {Array.isArray(social.svg) ? social.svg.map((p, idx) => (
            <path d={p} key={idx} />
          )) : <path d={social.svg} />}
        </svg>
      </a>
    ))}
  </div >
);

export default Sidebar;
