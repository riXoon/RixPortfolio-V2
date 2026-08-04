import React from 'react'

const Alert = ({ styles }) => {
  return (
    <div className={`${styles} hidden md:block bg-yellow-500/20 border-yellow-500/30 text-yellow-300/70 backdrop-blur-md rounded-md border p-3 fixed right-4 top-4 space-y-1.5 z-50`}>
      <span className='flex items-center gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <h2 className='font-medium text-sm'>Under construction</h2>
      </span>
      <p className='text-yellow-300/60 text-xs'>I presently working on this page.</p>
    </div>
  )
}

export default Alert
