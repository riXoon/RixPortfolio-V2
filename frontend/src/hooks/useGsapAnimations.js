import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// GSAP Scroll animations
const useGsapAnimations = () => {
  useEffect(() => {
    // Check if the screen width is greater than 768px (considered as mobile size)
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // If on mobile, kill all ScrollTrigger instances and GSAP animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
      return;
    }
    // ------------------ HERO ------------------
    // Heading Typography
    gsap.to('#scroll-animation-1', {
      scrollTrigger: {
        trigger: '#scroll-animation-1',
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        markers: false,
        start: 'top 60%',
        end: 'bottom 10%',
      },
      y: -100,
      opacity: 0,
      ease: 'none',
      duration: 3,
    });

    // Roles Text
    gsap.to('#scroll-animation-2', {
      scrollTrigger: {
        trigger: '#scroll-animation-2',
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        markers: false,
        start: 'top -10%',
        end: 'bottom 10%',
      },
      y: -290,
      opacity: 0,
      ease: 'none',
      duration: 3,
    });

    // Hero Backdrop
    gsap.to('#scroll-animation-hero-backdrop', {
      scrollTrigger: {
        trigger: '#scroll-animation-2', // use the same trigger so they animate together
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        markers: false,
        start: 'top -10%',
        end: 'bottom 10%',
      },
      y: -290,
      opacity: 0,
      ease: 'none',
      duration: 3,
    });

    // Glow Elipse
    gsap.to('#scroll-animation-3', {
      scrollTrigger: {
        trigger: '#scroll-animation-3',
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        markers: false,
        start: 'top -10%',
        end: 'bottom 10%',
      },
      x: -240,
      opacity: 0,
      ease: 'none',
      duration: 3,
    });

    // 'WHO AM I' Title
    gsap.fromTo('#scroll-animation-4',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-4',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'bottom 10%',
        },
        x: -100,
        ease: 'none',
        duration: 3,
      }
    );
    // ------------------ //HERO ------------------

    // ------------------ ABOUT ------------------
    // Glow Elipse
    gsap.fromTo('#scroll-animation-5',
      { opacity: 0 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-5',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 50%',
          end: 'bottom 10%',
        },
        y: -240,
        ease: 'none',
        duration: 3,
      }
    );
    // 'WHO AM I' Content
    gsap.fromTo('.scroll-animation-6',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '.scroll-animation-6',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'bottom 10%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // 'HOW IT STARTED' Title
    gsap.fromTo('#scroll-animation-7',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-7',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'bottom 10%',
        },
        x: -70,
        ease: 'none',
        duration: 3,
      }
    );
    // 'HOW IT STARTED' Content
    gsap.fromTo('.scroll-animation-8',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '.scroll-animation-8',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 80%',
          end: 'bottom 10%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // 'HOW'S IT GOING' Title
    gsap.fromTo('#scroll-animation-9',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-9',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'bottom 10%',
        },
        x: 70,
        ease: 'none',
        duration: 3,
      }
    );
    // 'HOW'S IT GOING' Content
    gsap.fromTo('.scroll-animation-10',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '.scroll-animation-10',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 80%',
          end: 'bottom 10%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // ------------------ //ABOUT ------------------

    // ------------------ EDUCATION ------------------
    // 'EDUCATION' Title
    gsap.fromTo('#scroll-animation-11',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-11',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 70%',
          end: 'bottom 70%',
        },
        y: 40,
        ease: 'none',
        duration: 3,
      }
    );
    // 'EDUCATION' Content
    gsap.fromTo('.scroll-animation-12',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '.scroll-animation-12',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 80%',
          end: 'bottom 10%',
        },
        y: -50,
        ease: 'none',
        duration: 3,
      }
    );
    // Glow Elipse
    gsap.fromTo('#scroll-animation-13',
      { opacity: 0.3 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-13',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top -20%',
          end: 'bottom 10%',
        },
        y: 240,
        ease: 'none',
        duration: 3,
      }
    );
    // ------------------ //EDUCATION ------------------

    // ------------------ PROJECT ------------------
    // Glow Elipse
    gsap.fromTo('#scroll-animation-14',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-14',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 40%',
          end: 'bottom 20%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // 'PROJECTS' Title
    gsap.fromTo('#scroll-animation-15',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-15',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 80%',
          end: 'bottom 50%',
        },
        x: -70,
        ease: 'none',
        duration: 3,
      }
    );
    // 'PROJECTS' Content
    gsap.fromTo('.scroll-animation-16',
      { opacity: 0.1 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '.scroll-animation-16',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 80%',
          end: 'bottom 10%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // ------------------ //PROJECT ------------------

    // ------------------ Contact Section & Footer Component ------------------ 
    // 'GET IN TOUCH' Title
    gsap.fromTo('#scroll-animation-18',
      { opacity: 0 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-18',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'bottom 10%',
        },
        x: -70,
        ease: 'none',
        duration: 3,
      }
    );
    // 'CONTACT' Content
    gsap.fromTo('.scroll-animation-19',
      { opacity: 0 }, // from
      { // to
        opacity: 4,
        scrollTrigger: {
          trigger: '.scroll-animation-19',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'bottom 30%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // Glow Elipse
    gsap.fromTo('#scroll-animation-20',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-20',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 60%',
          end: 'top 20%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // Footer Component
    gsap.fromTo('#scroll-animation-21',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-21',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 90%',
          end: 'top 20%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // ------------------ //Contact Section & Footer Component ------------------ 

    // ------------------ Expertise Section ------------------ 
    // Certification Container 1
    gsap.to('#scroll-animation-22', {
      scrollTrigger: {
        trigger: '#scroll-animation-22',
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        markers: false,
        start: 'top 90%',
        end: 'bottom 10%',
      },
      x: 100,
      ease: 'none',
      duration: 3,
    });
    // Certification Container 2
    gsap.to('#scroll-animation-23', {
      scrollTrigger: {
        trigger: '#scroll-animation-23',
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        markers: false,
        start: 'top 90%',
        end: 'bottom 10%',
      },
      x: -100,
      ease: 'none',
      duration: 3,
    });
    // 'CERTIFICATIONS' Title and Content
    gsap.fromTo('#scroll-animation-24',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-24',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 70%',
          end: 'top 20%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // Glow Elipse
    gsap.fromTo('#scroll-animation-25',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-25',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 40%',
          end: 'bottom 70%',
        },
        y: -400,
        ease: 'none',
        duration: 3,
      }
    );
    // Tech Stacks' Title
    gsap.fromTo('#scroll-animation-26',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-26',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 70%',
          end: 'bottom 40%',
        },
        y: 30,
        ease: 'none',
        duration: 3,
      }
    );
    // Tech Stacks' Content
    gsap.fromTo('#scroll-animation-27',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-27',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 70%',
          end: 'bottom 40%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // Github Stats' Content
    gsap.fromTo('#scroll-animation-28',
      { opacity: 0 }, // from
      {
        opacity: 4,
        scrollTrigger: {
          trigger: '#scroll-animation-28',
          toggleActions: 'restart pause reverse pause',
          scrub: 1,
          markers: false,
          start: 'top 70%',
          end: 'bottom 40%',
        },
        ease: 'none',
        duration: 3,
      }
    );
    // ------------------ //Expertise Section ------------------ 


  }, []);
}

export default useGsapAnimations
