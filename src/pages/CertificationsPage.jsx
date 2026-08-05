import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FMlogo, grid01, glow07 } from '../assets';
import { ExpertiseData } from '../constants';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';

const CertificationsPage = () => {
  useScrollToTop();
  const certificates = ExpertiseData[0].certifications[0];
  const allCerts = useMemo(() => {
    const certs = [...certificates.images01, ...certificates.images02];
    for (let i = certs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [certs[i], certs[j]] = [certs[j], certs[i]];
    }
    return certs;
  }, [certificates]);
  const renderLink = (link) => (
    <Link
      to={`/#${link.id}`}
      className='lg:text-sm text-[12px]'
    >
      {link.title}
    </Link>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <SEO title="Certifications | Erickson Guhilde" description="View my certifications and continuous learning achievements." />
      <img src={glow07} alt="Glow eclipse" className='-z-10 fixed' id='scroll-animation-' />
      <img src={grid01} alt="Grid" className='w-full h-full object-contain -z-20 object-center fixed' id='scroll-animation-' />
      
      <div className='lg:p-8 p-6 z-10'>
        {/* Navigation */}
        <Link to="/">
          <img src={FMlogo} alt="FM-logo" className="lg:h-[2.5rem] h-[1.8rem] w-auto object-contain" />
        </Link>
        
        {/* Header */}
        <div className='gap-4 md:mt-0 mt-12 flex flex-col justify-center items-center'>
          <h1 className='uppercase text-white font-black text-[3rem] lg:text-[7rem] whitespace-nowrap leading-none text-center'>
            Certifications
          </h1>
          <p className='text-white text-center w-full lg:max-w-3xl max-w-[40rem]'>
            An extensive collection of my continuous learning journey. <br className='md:block hidden' />
            From foundational responsive design to advanced full-stack development and security.
          </p>
        </div>

        {/* Certificates Grid */}
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[4rem] gap-6 lg:px-12'
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {allCerts.map((cert, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative group flex justify-center items-center bg-[#1A1625]/60 border border-[#3B2B6A]/50 rounded-2xl overflow-hidden p-2 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,114,239,0.4)] hover:border-[#9B72EF]/60 cursor-pointer"
            >
              {/* Subtle gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9B72EF]/0 via-[#9B72EF]/5 to-[#9B72EF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              
              <img 
                src={cert.src} 
                alt={`Certificate ${index + 1}`} 
                className='w-full h-auto object-contain rounded-xl border border-[#3B2B6A]/30 z-10 transition-transform duration-500' 
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className='mt-[7rem]'>
          <Footer link={renderLink} />
        </div>
      </div>
    </motion.div>
  )
}

export default CertificationsPage;
