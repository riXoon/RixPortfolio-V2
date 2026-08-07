import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { fade01, glow06 } from '../assets'
import { ExpertiseData } from '../constants'

const certificates = ExpertiseData[0].certifications[0];

const Certifications = () => {
  const shuffledImages01 = useMemo(() => {
    const certs = [...certificates.images01];
    for (let i = certs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [certs[i], certs[j]] = [certs[j], certs[i]];
    }
    return certs;
  }, []);

  const shuffledImages02 = useMemo(() => {
    const certs = [...certificates.images02];
    for (let i = certs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [certs[i], certs[j]] = [certs[j], certs[i]];
    }
    return certs;
  }, []);

  return (
    <div className='flex flex-col md:gap-12 gap-8 items-center py-12 justify-center relative overflow-hidden'>
      <img src={fade01} alt="Fade effect background" aria-hidden="true" loading='lazy' decoding='async' className='w-full h-full object-cover absolute inset-0 z-10' />
      <img src={glow06} alt="Glow eclipse background" aria-hidden="true" loading='lazy' decoding='async' className='absolute -z-10 w-[50rem] h-auto' />
      <div className='space-y-4' id='scroll-animation-24'>
        <h1 className='uppercase text-white font-black text-[2rem] lg:text-[5rem] whitespace-nowrap leading-none text-center' id='scroll-animation-'>{certificates.title}</h1>
        <p className='text-white text-center px-[2rem]' dangerouslySetInnerHTML={{ __html: certificates.content }}
        ></p>
      </div>
      <div className='w-full flex flex-col md:gap-4 gap-2 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
        <div className='w-full inline-flex flex-nowrap overflow-hidden group/ticker1'>
          <div className='flex items-center justify-center md:justify-start flex-none w-max [&_img]:shrink-0 [&_img]:mx-1 md:[&_img]:mx-2 md:h-[10rem] h-[4rem] animate-infinite-scroll-slow group-hover/ticker1:[animation-play-state:paused] z-0'>
            {[...shuffledImages01, ...shuffledImages01, ...shuffledImages01].map((cert, index) => (
              <img key={index} src={cert.src} alt={`Certification ${index + 1}`} loading='lazy' decoding='async' className='h-full w-auto rounded-md border-1 border-white' />
            ))}
          </div>
          <div className='flex items-center justify-center md:justify-start flex-none w-max [&_img]:shrink-0 [&_img]:mx-1 md:[&_img]:mx-2 md:h-[10rem] h-[4rem] animate-infinite-scroll-slow group-hover/ticker1:[animation-play-state:paused] z-0' aria-hidden="true">
            {[...shuffledImages01, ...shuffledImages01, ...shuffledImages01].map((cert, index) => (
              <img key={index} src={cert.src} alt={`Certification ${index + 1}`} loading='lazy' decoding='async' className='h-full w-auto rounded-md border-1 border-white' />
            ))}
          </div>
        </div>

        <div className='w-full inline-flex flex-nowrap overflow-hidden group/ticker2'>
          <div className='flex items-center justify-center md:justify-start flex-none w-max [&_img]:shrink-0 [&_img]:mx-1 md:[&_img]:mx-2 md:h-[10rem] h-[4rem] animate-infinite-scroll-slow-reverse group-hover/ticker2:[animation-play-state:paused] z-0'>
            {[...shuffledImages02, ...shuffledImages02, ...shuffledImages02].map((cert, index) => (
              <img key={index} src={cert.src} alt={`Certification ${index + 1}`} loading='lazy' decoding='async' className='h-full w-auto rounded-md border-1 border-white' />
            ))}
          </div>
          <div className='flex items-center justify-center md:justify-start flex-none w-max [&_img]:shrink-0 [&_img]:mx-1 md:[&_img]:mx-2 md:h-[10rem] h-[4rem] animate-infinite-scroll-slow-reverse group-hover/ticker2:[animation-play-state:paused] z-0' aria-hidden="true">
            {[...shuffledImages02, ...shuffledImages02, ...shuffledImages02].map((cert, index) => (
              <img key={index} src={cert.src} alt={`Certification ${index + 1}`} loading='lazy' decoding='async' className='h-full w-auto rounded-md border-1 border-white' />
            ))}
          </div>
        </div>
      </div>
      <Link to="/certifications" className='z-20'>
        <Button text={certificates.btnText}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
          </svg>
        </Button>
      </Link>
    </div>

  )
}

export default Certifications