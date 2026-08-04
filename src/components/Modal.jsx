import React, { useState, useEffect } from 'react';
import Button from './Button';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-base bg-opacity-70 z-50 transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div
        className={`bg-base backdrop-blur-md border border-[#59568fbd]/20 rounded-lg md:p-6 p-4 max-w-sm text-center transform transition-transform duration-300 ease-out ${isOpen ? 'scale-100' : 'scale-95'
          }`}
      >
        <div className="mb-6 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-10 text-indigo-500 mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <p className='text-md'>This portfolio shines on larger screens, <br /> consider switching for a better view.</p>
        </div>
        <Button text={'Got it'}
          onClick={closeModal}
        >
        </Button>
      </div>
    </div>
  );
};

export default Modal;
