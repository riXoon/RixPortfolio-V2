import React from 'react'

const Stats = () => {
  return (
    <div className='relative'>
      {/* CSS Glow — replaces glow02 image, same ID for GSAP */}
      <div
        id='scroll-animation-25'
        className='kali-glow'
        style={{ width: '55rem', height: '40rem', top: '-25vh', left: '50%', transform: 'translateX(-50%)' }}
      />
      <div className='relative z-10 flex flex-col lg:gap-6 gap-3 py-12' id='scroll-animation-28'>
        <div className='flex justify-center items-start lg:gap-6 gap-3 flex-wrap px-4'>
          {/* Language Graph */}
          <div className='flex flex-col gap-3'>
            <h4 className='font-semibold lg:text-left text-center'>Most Used Languages</h4>
            <img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs?username=riXoon&locale=en&hide_title=true&layout=compact&card_width=350&langs_count=8&order=2&bg_color=0C0A12&text_color=C4A8FF&border_color=3B2B6A" loading='lazy' decoding='async' className='lg:h-[12rem] h-[8rem] w-auto' alt="languages graph" />
          </div>
          {/* Streak Graph */}
          <div className='flex flex-col gap-3'>
            <h4 className='font-semibold lg:text-left text-center'>Streaks</h4>
            <img src="https://streak-stats.demolab.com?user=riXoon&theme=material-palenight&currStreakNum=C4A8FF&background=0C0A12&border=3B2B6A&currStreakLabel=C4A8FF&fire=F1E05A&ring=9B72EF&dates=C4A8FF&sideNums=C4A8FF&sideLabels=C4A8FF&stroke=9B72EF36" loading='lazy' decoding='async' className='lg:h-[12rem] h-[8rem] w-auto' alt="streak graph" />
          </div>
        </div>
        {/* Contribution Tiles Graph */}
        <div className='flex flex-col gap-3 items-center justify-center mt-8'>
          <img src="https://ghchart.rshah.org/7B4FD0/riXoon" loading='lazy' decoding='async' className='lg:h-[11rem] h-[7rem] w-auto opacity-80 hover:opacity-100 transition-opacity duration-300' alt="GitHub Contribution Tiles" />
        </div>
      </div>
    </div>
  )
}

export default Stats
