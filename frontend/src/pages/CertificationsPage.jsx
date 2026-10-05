import React, { useMemo, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FMlogo, grid01, glow07 } from '../assets';
import { ExpertiseData } from '../constants';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';

const categoryConfig = {
  'Cybersecurity': {
    color: 'from-blue-500/10 to-indigo-500/10',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]',
    borderColor: 'border-blue-500/50',
    hoverBorder: 'hover:border-blue-500/80',
    badgeColor: 'text-blue-300',
    badgeBg: 'bg-blue-900/30 border-blue-500/30',
    icon: (
      <svg className="w-8 h-8 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  'Capture the Flag': {
    color: 'from-red-500/10 to-rose-500/10',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]',
    borderColor: 'border-red-500/50',
    hoverBorder: 'hover:border-red-500/80',
    badgeColor: 'text-red-300',
    badgeBg: 'bg-red-900/30 border-red-500/30',
    icon: (
      <svg className="w-8 h-8 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    )
  },
  'Student Builder': {
    color: 'from-emerald-500/10 to-green-500/10',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]',
    borderColor: 'border-emerald-500/50',
    hoverBorder: 'hover:border-emerald-500/80',
    badgeColor: 'text-emerald-300',
    badgeBg: 'bg-emerald-900/30 border-emerald-500/30',
    icon: (
      <svg className="w-8 h-8 mr-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  'Seminars/Webinars': {
    color: 'from-amber-500/10 to-yellow-500/10',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]',
    borderColor: 'border-amber-500/50',
    hoverBorder: 'hover:border-amber-500/80',
    badgeColor: 'text-amber-300',
    badgeBg: 'bg-amber-900/30 border-amber-500/30',
    icon: (
      <svg className="w-8 h-8 mr-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  'Other': {
    color: 'from-[#9B72EF]/10 to-purple-500/10',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(155,114,239,0.3)]',
    borderColor: 'border-[#3B2B6A]/50',
    hoverBorder: 'hover:border-[#9B72EF]/80',
    badgeColor: 'text-[#D1B9FF]',
    badgeBg: 'bg-[#3B2B6A]/40 border-[#9B72EF]/30',
    icon: (
      <svg className="w-8 h-8 mr-3 text-[#9B72EF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
};

const TiltCard = ({ cert, index }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const category = cert.category || 'Other';
  const config = categoryConfig[category] || categoryConfig['Other'];

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate rotation (-15 to 15 degrees)
    const x = (e.clientX - left - width / 2) / 15;
    const y = (e.clientY - top - height / 2) / 15;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: -position.y, rotateY: position.x }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className={`flex flex-col bg-[#1A1625]/60 border ${config.borderColor} rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${config.hoverGlow} ${config.hoverBorder} cursor-pointer h-full z-10 relative`}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div 
        className="relative group p-4 flex-grow flex justify-center items-center overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-tr ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl pointer-events-none`}></div>
        
        <img 
          src={cert.src} 
          alt={cert.title || `Certificate ${index + 1}`} 
          className={`w-full h-auto object-contain rounded-xl border border-white/5 z-10 transition-transform duration-500 group-hover:scale-105`} 
          loading="lazy"
          decoding="async"
        />
      </div>
      
      {/* Label Section */}
      <div 
        className="p-5 border-t border-white/5 bg-[#120F1A]/90 relative flex flex-col justify-between"
        style={{ transform: "translateZ(20px)", minHeight: "140px" }}
      >
        <div>
          <h3 className="text-white font-black text-xl mb-2 tracking-wide">{cert.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">{cert.description}</p>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
          <span className={`px-2 py-1 rounded font-medium border ${config.badgeColor} ${config.badgeBg}`}>{cert.issuer}</span>
          <span className={`font-mono ${config.badgeColor}`}>{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundAnimations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9B72EF]/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#5B21B6]/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, -50, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-3/4 left-1/3 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-[80px]"
      />
    </div>
  );
};

const CertificationsPage = () => {
  useScrollToTop();
  const certificates = ExpertiseData[0].certifications[0];
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacity = useTransform(scrollY, [0, 1000], [0.4, 0.1]);
  
  const groupedCerts = useMemo(() => {
    const certs = [...certificates.images01, ...certificates.images02];
    
    // Sort certs to ensure specific order
    const grouped = {
      'Cybersecurity': [],
      'Capture the Flag': [],
      'Student Builder': [],
      'Seminars/Webinars': [],
      'Other': []
    };
    
    certs.forEach(cert => {
      const cat = cert.category || 'Other';
      if (grouped[cat]) {
        grouped[cat].push(cert);
      } else {
        grouped['Other'].push(cert);
      }
    });
    
    // Remove empty categories
    return Object.fromEntries(Object.entries(grouped).filter(([_, arr]) => arr.length > 0));
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
      className="min-h-screen relative z-0"
    >
      <SEO title="Certifications | Erickson Guhilde" description="View my certifications and continuous learning achievements." />
      
      {/* Backgrounds */}
      <BackgroundAnimations />
      <motion.div className='kali-glow fixed -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] lg:w-[70rem] lg:h-[70rem]' style={{ y, opacity, zIndex: -20 }} />
      <img src={grid01} alt="Grid background" aria-hidden="true" loading='lazy' decoding='async' className='w-full h-full object-cover -z-30 object-center fixed opacity-40' id='scroll-animation-' />
      
      <div className='lg:p-8 p-6 z-10 max-w-[1600px] mx-auto'>
        {/* Navigation */}
        <Link to="/">
          <img src={FMlogo} alt="FM-logo" loading='lazy' decoding='async' className="lg:h-[2.5rem] h-[1.8rem] w-auto object-contain hover:scale-105 transition-transform" />
        </Link>
        
        {/* Header */}
        <div className='gap-6 md:mt-10 mt-16 flex flex-col justify-center items-center relative z-20'>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#9B72EF] font-black text-[3rem] lg:text-[7rem] whitespace-nowrap leading-none text-center drop-shadow-[0_0_15px_rgba(155,114,239,0.3)]'
          >
            Certifications
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='text-gray-300 text-center w-full lg:max-w-3xl max-w-[40rem] text-lg lg:text-xl font-light'
          >
            An extensive collection of my continuous learning journey. <br className='md:block hidden' />
            From foundational responsive design to advanced full-stack development and security.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="mt-[5rem]">
          {Object.entries(groupedCerts).map(([category, certs]) => (
            <div key={category} className="mb-20">
              {/* Sticky Header */}
              <div className="sticky top-0 z-30 pt-6 pb-4 bg-transparent mb-8 flex items-center">
                {categoryConfig[category]?.icon || categoryConfig['Other'].icon}
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider">
                  {category}
                </h2>
                <span className="ml-4 bg-[#3B2B6A]/40 text-[#D1B9FF] px-4 py-1 rounded-full text-sm font-bold border border-[#9B72EF]/30">
                  {certs.length}
                </span>
              </div>
              
              <motion.div 
                className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:px-4'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
              >
                {certs.map((cert, index) => (
                  <TiltCard key={`${category}-${index}`} cert={cert} index={index} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <div className='mt-[10rem]'>
          <Footer link={renderLink} />
        </div>
      </div>
    </motion.div>
  )
}

export default CertificationsPage;
