import React from 'react';
import Badge from './Badge';

const Card = ({ title, badge, desc, img, roles = [] }) => {
  return (
    <div className='w-full h-full rounded-[1rem] md:p-6 p-4 flex-1 hover:shadow-2xl hover:shadow-[#412F84]/20 border border-[#221c3d] transition-all duration-300 ease-in-out hover:border-[#6C59B9] bg-base/70 hover:bg-[#191723]/70'>
      <div className='space-y-5'>
        <div className='w-full'>
          <img src={img} alt={title} className='w-full h-full rounded-[0.1rem]' />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <div className='flex md:flex-row flex-col md:items-center items-start md:gap-3 gap-1.5 pb-2'>
              <h2 className='text-white font-bold text-[1.3rem]'>{title}</h2>
              {badge}
            </div>
            <p className='text-[13px] line-clamp-2'>{desc}</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-white font-bold text-sm'>Role/s:</h3>
            <div className='flex-wrap flex gap-3'>
              {roles.map((role, index) => (
                <Badge key={index} text={role} styles={'lg:py-1.5 lg:px-3 py-1 px-2 text-xs lg:text-sm'} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
