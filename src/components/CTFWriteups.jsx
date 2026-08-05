import React, { useState, useEffect } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const CTFWriteups = () => {
  const [writeups, setWriteups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriteups = async () => {
      try {
        const res = await fetch('/api/gitbook');
        const data = await res.json();
        if (!res.ok) throw new Error('Failed to fetch');

        let allPages = [];
        
        // GitBook root pages usually act as categories
        const categories = data.pages || [];
        categories.forEach(category => {
          // The actual writeups are children of these categories
          if (category.pages && category.pages.length > 0) {
            category.pages.forEach(page => {
              allPages.push({
                ...page,
                categoryTitle: category.title
              });
            });
          }
        });

        // Sort by createdAt descending to get the newest
        allPages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Take the top 3
        setWriteups(allPages.slice(0, 3));
      } catch (err) {
        console.error('Failed to load real CTF writeups:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWriteups();
  }, []);

  return (
    <>
      <div className='lg:pl-[13.5rem] pl-[2rem] flex flex-col justify-center h-full absolute z-30 w-full pr-[2rem]'>
        <div className='flex flex-col h-full justify-center'>
          <h1 className='uppercase text-white font-black text-[3rem] lg:text-[7rem] whitespace-nowrap leading-none md:ml-[4rem] mb-8'>
            CTF WRITEUPS
          </h1>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:ml-[4rem]'>
            {loading ? (
              // Loading skeletons
              [1, 2, 3].map((_, i) => (
                <div key={i} className='bg-[#1A1625] border border-[#3B2B6A] p-6 rounded-lg flex flex-col justify-between h-[180px] animate-pulse'>
                  <div>
                    <div className='h-3 bg-white/10 rounded w-1/3 mb-4'></div>
                    <div className='h-5 bg-white/20 rounded w-3/4 mb-3'></div>
                    <div className='h-4 bg-white/5 rounded w-full mb-2'></div>
                    <div className='h-4 bg-white/5 rounded w-5/6'></div>
                  </div>
                </div>
              ))
            ) : writeups.length > 0 ? (
              writeups.map((writeup, index) => {
                // Format the ISO date nicely, e.g., "March 2026"
                const dateObj = new Date(writeup.createdAt);
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                
                return (
                  <div key={index} className='bg-[#1A1625] border border-[#3B2B6A] p-6 rounded-lg flex flex-col justify-between hover:scale-105 transition-transform duration-300'>
                    <div>
                      <span className='text-xs font-bold text-[#9B72EF] uppercase tracking-wider mb-2 block'>
                        {writeup.categoryTitle || 'Writeup'}
                      </span>
                      <h3 className='text-white font-bold text-xl mb-3 leading-snug line-clamp-2'>
                        {writeup.title}
                      </h3>
                      <p className='text-gray-400 text-sm mb-4 line-clamp-3'>
                        {writeup.description || 'Detailed technical writeup and challenge walkthrough.'}
                      </p>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                      <span className='text-xs text-gray-500 font-mono'>{dateStr}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-sm italic col-span-3">No writeups available.</div>
            )}
          </div>

          <div className='flex mt-10 md:ml-[4rem]'>
            <Link to='/ctf-archive'>
              <Button text={'View Archive'} styles={'bg-[#7B4FD0] hover:bg-[#6A3FBF]'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CTFWriteups
