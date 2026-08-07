import React from 'react';
import { Socials, navLinks, ContactData } from '../constants';
import { Link } from 'react-router-dom'
import { FMlogo } from '../assets';

const Footer = ({ link }) => {
  const currentYear = new Date().getFullYear();
  const filterednavLinks = navLinks.slice(0, -1); // Assuming you want to exclude the last link
  const contacts = ContactData[0];

  return (
    <footer className='grid lg:grid-cols-4 grid-cols-1 gap-8 w-full' id='scroll-animation-'>
      <div className="col-span-1 flex justify-center lg:justify-start items-end">
        <a href='/#home' aria-label="Go to Home">
          <img src={FMlogo} alt="FM-logo" loading='lazy' decoding='async' className="lg:h-[3.5rem] h-[2.5rem] w-auto object-contain" />
        </a>
      </div>
        <div className='col-span-2 grid grid-cols-2 gap-8'>
          <div className="col-span-1 text-white flex lg:justify-center justify-end">
            <div className='space-y-[0.3rem]'>
              <h1 className='font-medium lg:text-[1.2rem] text-[0.9rem]'>LINKS</h1>
              <ul className='space-y-[4px]'>
                {filterednavLinks.map((navLink, index) => (
                  <li key={index} className='list-none nav-link'>
                    {link(navLink)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1 text-white space-y-[0.2rem] flex lg:justify-center justify-start">
            <div className='space-y-[0.3rem]'>
              <h1 className='font-medium lg:text-[1.2rem] text-[0.9rem]'>SOCIALS</h1>
              <ul className='space-y-[4px]'>
                {Socials.map((social, index) => (
                  <li key={index} className='list-none nav-link'>
                    <a
                      href={social.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='lg:text-sm text-[12px]'
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center lg:justify-end items-end">
          <h2 className='text-white leading-none lg:text-sm text-xs text-nowrap'>
            ©{currentYear} <span className='text-[#9B72EF]'>{contacts.name}</span>
          </h2>
        </div>
      </footer>
  );
};

export default Footer;
