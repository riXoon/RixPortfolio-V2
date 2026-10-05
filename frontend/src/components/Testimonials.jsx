import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TestimonialData } from '../constants'

const TestimonialCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = React.useRef(null);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
      }
    };
    
    // Check initially
    checkOverflow();
    
    // Re-check on resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [item.testimonial]);

  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-[#1A1625] to-[#120F1A] border border-[#3B2B6A]/50 p-6 lg:p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-[#7B4FD0]/70 hover:shadow-[0_10px_30px_rgba(123,79,208,0.2)] h-full w-full relative group/card">
      
      {/* Quotation Icon */}
      <svg className="w-8 h-8 lg:w-10 lg:h-10 text-[#7B4FD0]/20 absolute top-6 right-6 transition-colors duration-300 group-hover/card:text-[#7B4FD0]/40 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="relative z-10 mt-2 flex-1 min-h-0 flex flex-col pr-1">
        <div 
          className={`flex-1 ${isExpanded ? 'overflow-y-auto custom-scrollbar-minimal overscroll-contain' : 'overflow-hidden'}`}
          onWheel={(e) => isExpanded && e.stopPropagation()}
          onTouchMove={(e) => isExpanded && e.stopPropagation()}
        >
          <p ref={textRef} className={`text-white text-sm lg:text-base leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`} style={{ color: '#ffffff', opacity: 1 }}>
            "{item.testimonial}"
          </p>
        </div>
        {isOverflowing && !isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)} 
            aria-expanded={false}
            aria-label={`Read more of ${item.name}'s testimonial`}
            className="text-[#9B72EF] hover:text-[#B794F6] text-xs lg:text-sm text-left mt-2 font-semibold transition-colors shrink-0"
          >
            Read more...
          </button>
        )}
        {isExpanded && (
          <button 
            onClick={() => setIsExpanded(false)} 
            aria-expanded={true}
            aria-label={`Show less of ${item.name}'s testimonial`}
            className="text-[#9B72EF] hover:text-[#B794F6] text-xs lg:text-sm text-left mt-2 font-semibold transition-colors shrink-0"
          >
            Show less
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#3B2B6A]/30 shrink-0">
        <div className="relative shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1A1625] border border-[#9B72EF]/50 z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#7B4FD0] blur opacity-40 group-hover/card:opacity-70 transition-opacity duration-300 -z-10"></div>
          {item.profile ? (
            <img src={item.profile} alt={item.name} loading='lazy' decoding='async' className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#E2D8FF] font-bold text-lg lg:text-xl">{item.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-bold tracking-wide truncate">{item.name}</h3>
          <p className="text-[#9B72EF] text-[10px] lg:text-xs font-mono uppercase tracking-wider mt-0.5 truncate">{item.role}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <div className='flex flex-col lg:gap-8 gap-6 py-20 lg:py-32 w-full overflow-hidden border-t border-[#3B2B6A]/30 bg-gradient-to-b from-transparent to-[#1A1625]/20'>
      <div className='w-full z-10 flex flex-col items-center justify-center mb-8 px-4'>
        <motion.h1 
          initial={{ opacity: 0.1, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='uppercase text-white font-black text-[2.5rem] sm:text-[3rem] lg:text-[7rem] text-center md:text-nowrap text-wrap leading-none break-words'
        >
          Testimonial<span className='text-[#9B72EF]'>s</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0.1, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-center px-[2rem] mt-4 max-w-3xl"
        >
          Here's what people I've worked with have to say about my skills, dedication, and collaborative spirit.
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0.1, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='relative w-full'
      >
        {/* Left Shadow Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-[15%] bg-gradient-to-r from-[#0C0A12] via-[#0C0A12]/80 to-transparent z-20 pointer-events-none"></div>
        
        {/* Right Shadow Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-[15%] bg-gradient-to-l from-[#0C0A12] via-[#0C0A12]/80 to-transparent z-20 pointer-events-none"></div>

        <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-8 mt-2 z-10 group/ticker'>
          <ul className='flex items-center justify-center md:justify-start flex-none w-max [&_li]:shrink-0 [&_li]:mx-4 lg:[&_li]:mx-6 animate-infinite-scroll-slow group-hover/ticker:[animation-play-state:paused]'>
          {[...TestimonialData, ...TestimonialData, ...TestimonialData].map((item, index) => (
            <li className="relative flex items-center w-[280px] sm:w-[320px] lg:w-[450px] h-[280px] lg:h-[320px] shrink-0" key={index}>
              <TestimonialCard item={item} />
            </li>
          ))}
        </ul>
        <ul className='flex items-center justify-center md:justify-start flex-none w-max [&_li]:shrink-0 [&_li]:mx-4 lg:[&_li]:mx-6 animate-infinite-scroll-slow group-hover/ticker:[animation-play-state:paused]' aria-hidden="true">
          {[...TestimonialData, ...TestimonialData, ...TestimonialData].map((item, index) => (
            <li className="relative flex items-center w-[280px] sm:w-[320px] lg:w-[450px] h-[280px] lg:h-[320px] shrink-0" key={index}>
              <TestimonialCard item={item} />
            </li>
          ))}
        </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default Testimonials
