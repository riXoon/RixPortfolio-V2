import React from 'react';
import { motion } from 'framer-motion';
import { FMlogo, grid01, glow07 } from '../assets';
import { defaultThumbnail } from '../assets/banners';
import Badge from '../components/Badge';
import Card from '../components/Card';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';

const AllProjects = ({ projects }) => {
  useScrollToTop();
  const renderLink = (link) => (
    <Link
      to={`/#${link.id}`}
      className='lg:text-sm text-[12px]'
    >
      {link.title}
    </Link>
  );
  // TODO: GSAP Scroll Animation
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <SEO title="Projects | Erickson Guhilde" description="Explore my innovative web development and collaborative projects." />
      <img src={glow07} alt="Glow eclipse" className='-z-10 fixed' id='scroll-animation-' />
      <img src={grid01} alt="Grid" className='w-full h-full object-contain -z-20 object-center fixed' id='scroll-animation-' />
      <div className='lg:p-8 p-6 z-10'>
        <Link to="/#projects">
          <img src={FMlogo} alt="FM-logo" className="lg:h-[2.5rem] h-[1.8rem] w-auto object-contain" />
        </Link>
        <div className='gap-4 md:mt-0 mt-12 flex flex-col justify-center items-center'>
          <h1 className='uppercase text-white font-black text-[3rem] lg:text-[9rem] whitespace-nowrap leading-none text-center' id='scroll-animation-'>Projects</h1>
          <p className='text-white text-center w-full lg:max-w-3xl max-w-[40rem]'>This section showcases my innovative web development and collaborative projects. Each one reflects <br className='md:block hidden' /> my passion for creating designs that are both visually appealing and functional.</p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 mt-[4rem] gap-6 md:px-24'>
          {projects.map(project => (
            <Link key={project.id} to={`/all-projects/${project.id}`}>
              <Card
                badge={
                  project.type === 'special' ? (
                    <Badge text='Special project' styles={'py-1 px-2 inline-flex items-center gap-2 text-xs text-nowrap bg-opacity-50 backdrop-blur-md border-green-500/30 text-green-400 bg-green-800/10'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="lg:size-3.5 size-2.5">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                      </svg>
                    </Badge>
                  ) : project.type === 'school' ? (
                    <Badge text='School project' styles={'py-1 px-2 inline-flex items-center gap-2 text-xs text-nowrap bg-opacity-50 backdrop-blur-md border-blue-500/30 text-blue-400 bg-blue-800/10'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="lg:size-3.5 size-2.5">
                        <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.94 49.94 0 0 0-9.902 3.912l-.15.085-.15-.085a49.94 49.94 0 0 0-9.902-3.912.75.75 0 0 1-.231-1.337A60.65 60.65 0 0 1 11.7 2.805Z" />
                        <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.251 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.03-1.441.117-2.87.251-4.284a48.5 48.5 0 0 1 7.666 3.281.75.75 0 0 0 .15.085l.15.085a.75.75 0 0 0 .828 0Z" />
                      </svg>
                    </Badge>
                  ) : project.type === 'personal' ? (
                    <Badge text='Personal project' styles={'py-1 px-2 inline-flex items-center gap-2 text-xs text-nowrap bg-opacity-50 backdrop-blur-md border-purple-500/30 text-purple-400 bg-purple-800/10'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="lg:size-3.5 size-2.5">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                      </svg>
                    </Badge>
                  ) : null
                }
                title={project.title}
                desc={project.desc}
                img={project.img ? project.img : defaultThumbnail}
                roles={project.roles}
              />
            </Link>
          ))}
        </div>
        <div className='mt-[7rem]'>
          <Footer link={renderLink} />
        </div>
      </div>
    </motion.div>
  )
}

export default AllProjects;
