import React from 'react'

const Badge = ({ text, styles, children }) => {
  return (
    <span className={`bg-[#1C182D] text-[#C1B1FF] rounded-[0.4rem] border border-[#40317A] ${styles}`}>
      {children}
      {text}
    </span>
  )
}

export default Badge
