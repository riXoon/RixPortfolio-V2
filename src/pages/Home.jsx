import React, { useEffect } from 'react';
import { Sidebar, Hero, About, Education, Skills, Project, Contact, Certifications, Stats, Testimonials, CTFWriteups } from '../components';
import { motion } from 'framer-motion'
import useActivateLink from '../hooks/useActivateLink';
import useScrollRestoration from '../hooks/useScrollRestoration'
import Modal from '../components/Modal'
import SEO from '../components/SEO'

const Home = () => {
  useScrollRestoration();
  const { sectionsRef, activeSection } = useActivateLink();

  // Directly navigate to the section if hash is present in the URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="relative z-0"
    >
      <SEO title="Erickson Guhilde | Web Developer" description="Portfolio of Erickson Guhilde, a Web Developer, CTF Player, and Cybersecurity Enthusiast showcasing projects, skills, and writeups." />
      <Modal />
      <div
        className={`transition-opacity duration-500 ease-in-out ${activeSection === 'contact' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <Sidebar activeSection={activeSection} />
      </div>
      <main ref={(el) => (sectionsRef.current[0] = el)} className='h-screen kali-grid relative' id='home'>
        <Hero />
      </main>
      <section ref={(el) => (sectionsRef.current[1] = el)} className='kali-grid relative' id='about'>
        <About />
      </section>
      <section ref={(el) => (sectionsRef.current[2] = el)} className='kali-grid relative w-full' id='education'>
        <Education />
      </section>
      <section ref={(el) => (sectionsRef.current[3] = el)} id='expertise' className='w-full relative'>
        <Skills />
      </section>
      <section ref={(el) => (sectionsRef.current[4] = el)} className='kali-grid relative w-full' id='expertise'>
        <Stats />
      </section>
      <section ref={(el) => (sectionsRef.current[5] = el)} id='expertise' className='w-full relative'>
        <Certifications />
      </section>
      <section ref={(el) => (sectionsRef.current[6] = el)} className='h-screen w-full relative' id='projects'>
        <Project />
      </section>
      <section ref={(el) => (sectionsRef.current[7] = el)} className='min-h-screen lg:h-screen w-full relative' id='ctf-writeups'>
        <CTFWriteups />
      </section>
      <section ref={(el) => (sectionsRef.current[8] = el)} className='w-full relative' id='testimonials'>
        <Testimonials />
      </section>
      <section ref={(el) => (sectionsRef.current[9] = el)} className='h-screen kali-grid relative w-full' id='contact'>
        <Contact />
      </section>
    </motion.div>
  );
};

export default Home
