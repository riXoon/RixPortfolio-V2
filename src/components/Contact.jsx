import React, { useState } from 'react'
import Footer from './Footer'
import Button from './Button'
import { glow05, senec4 } from '../assets'
import { ContactData } from '../constants'
import emailjs from 'emailjs-com'

const Contact = () => {
  const contacts = ContactData[0];
  const renderLink = (link) => (
    <a
      href={`#${link.id}`}
      className='lg:text-sm text-[12px]'
    >
      {link.title}
    </a>
  );


  // Nobody cares for these keys, right? 😅
  const serviceId = "service_mulg8rj";
  const templateId = "template_sqgu5v6";
  const publicUser = "CuwmRaHiSJOHr1v13";

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form Validation
  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.message) formErrors.message = 'Message is required';
    if (!formData.email) {
      formErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }
    return formErrors;
  };

  // Hnadle form logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log('Form data submitted:', formData);
      setErrors({});
      setIsOpen(false);
      emailjs
        .send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          publicUser
        )
        .then(
          (result) => {
            console.log(result.text);
            // Simulate form submission
            setTimeout(() => {
              setFormData({
                name: '',
                email: '',
                message: '',
              });
              setIsSuccessOpen(true);
            }, 1000);
          },
          (error) => {
            console.log(error.text);
            alert('An error occurred. Please try again.');
          }
        );

    }
  };

  const closeSuccessModal = () => {
    setIsSuccessOpen(false);
  };

  return (
    <div className='flex justify-center items-center h-full md:p-[2rem] p-4 relative overflow-hidden'>
      {/* Seneca Backdrop */}
      <div id='scroll-animation-contact-backdrop' className='absolute inset-0 z-0 opacity-15 pointer-events-none flex justify-end items-center mix-blend-screen grayscale'>
        <div className='absolute inset-0 bg-gradient-to-r from-base via-base/80 to-transparent z-10' />
        <div className='absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent z-10' />
        <img 
          src={senec4} 
          alt="Seneca Backdrop" 
          className="w-full h-full object-cover lg:object-contain lg:object-right scale-110 lg:scale-[1.3] lg:translate-x-12 opacity-40" 
        />
      </div>

      <div className='h-full w-full grid grid-rows-6 z-20'>
        <div className='row-span-4 rounded-md p-4 text-white'>
          <div className='space-y-4'>
            <div>
              <h1 className='uppercase font-black text-[3rem] lg:text-[9rem] md:text-nowrap text-wrap whitespace-nowrap leading-none md:ml-[3rem]' id='scroll-animation-18'>Get in touch<span className='text-[#9B72EF]'>.</span></h1>
            </div>
            <ul className='space-y-1.5 pb-[0.8rem] scroll-animation-19'>
              <li className='block text-[#c4a8ff] font-extrabold lg:text-[1.2rem] text-[0.9rem] uppercase'>{contacts.name}</li>
              <li className='inline-block'>
                <a href={'https://fm-linktree.vercel.app'} target='_blank' className='flex items-center'>
                    <p className='text-[#9B72EF] underline'>Linktree</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 mt-1 text-[#9B72EF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </li>
              {contacts.contacts.map((contact, index) => (
                <li key={index} className='flex items-center gap-3'>
                  <img src={contact.icon} alt={contact.alt} className='w-4 h-4' />
                  <p>{contact.name}</p>
                </li>
              ))}
            </ul>
            <div className='flex items-center gap-3 scroll-animation-19'>
              <Button text={'Say hi'} styles={'bg-[#7B4FD0] hover:bg-[#6A3FBF]'} onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </Button>
              <a href="https://buymeacoffee.com/fwedwicc" target='_blank'>
                <Button text={'Buy me a coffee'} styles={'hover:bg-kali-dim'}>
                  <svg className='size-4 stroke-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 7H19C19.4647 7 19.697 7 19.8902 7.03843C20.6836 7.19624 21.3038 7.81644 21.4616 8.60982C21.5 8.80302 21.5 9.03535 21.5 9.5C21.5 9.96465 21.5 10.197 21.4616 10.3902C21.3038 11.1836 20.6836 11.8038 19.8902 11.9616C19.697 12 19.4647 12 19 12H18.5M3 20H21M12 17C10.6055 17 9.90821 17 9.33277 16.8619C7.50453 16.4229 6.07707 14.9955 5.63815 13.1672C5.5 12.5918 5.5 11.8945 5.5 10.5L5.5 7.2C5.5 6.0799 5.5 5.51984 5.71799 5.09202C5.90973 4.7157 6.21569 4.40974 6.59202 4.21799C7.01984 4 7.57989 4 8.7 4L15.3 4C16.4201 4 16.9802 4 17.408 4.21799C17.7843 4.40973 18.0903 4.71569 18.282 5.09202C18.5 5.51984 18.5 6.07989 18.5 7.2V10.5C18.5 11.8945 18.5 12.5918 18.3619 13.1672C17.9229 14.9955 16.4955 16.4229 14.6672 16.8619C14.0918 17 13.3945 17 12 17Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className='row-span-2 flex items-end'>
          <Footer link={renderLink} />
        </div>
      </div>
      <img src={glow05} alt="Glow eclipse" className='absolute bottom-0' id='scroll-animation-20' />
      {/* Contact Form Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-base bg-opacity-70 z-50 transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className={`bg-base backdrop-blur-md border border-[#59568fbd]/20 rounded-lg md:p-6 p-4 md:max-w-xl max-w-sm w-full text-center transform transition-transform duration-300 ease-out ${isOpen ? 'scale-100' : 'scale-95'
            }`}
        >
          <form onSubmit={handleSubmit}>
            <div className='mb-6 text-left space-y-1 text-[#59568fbd]/50'>
              <p className='lg:text-[1.4rem] text-[1rem]'>Drop me a line!</p>
              {/* <p>Kindly fill out this form, and I'll get in touch with you shortly!</p> */}
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`relative block overflow-hidden rounded-md text-white border border-[#3B2B6A]/30 px-3 pt-3 shadow-sm focus-within:border-[#7B4FD0] focus-within:ring-1 focus-within:ring-[#7B4FD0] transition duration-300 ease-in-out ${errors.name ? 'border-yellow-500/30' : 'border-[#3B2B6A]/30'}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Name'
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 md:text-sm text-xs" />
                  <span
                    className="absolute start-3 top-3 -translate-y-1/2 md:text-sm text-xs text-[#afacdebd] transition-all peer-placeholder-shown:top-1/2 md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-xs peer-focus:top-3 md:peer-focus:text-xs md:peer-focus:text-[11px]">
                    Name
                  </span>
                </label>
                {errors.name && <p className="text-yellow-400 md:text-sm text-xs mt-1 text-left">{errors.name}</p>}
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`relative block overflow-hidden rounded-md text-white border border-[#3B2B6A]/30 px-3 pt-3 shadow-sm focus-within:border-[#7B4FD0] focus-within:ring-1 focus-within:ring-[#7B4FD0] transition duration-300 ease-in-out ${errors.email ? 'border-yellow-500/30' : 'border-[#3B2B6A]/30'}`}>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Name'
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 md:text-sm text-xs" />
                  <span
                    className="absolute start-3 top-3 -translate-y-1/2 md:text-sm text-xs text-[#afacdebd] transition-all peer-placeholder-shown:top-1/2 md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-xs peer-focus:top-3 md:peer-focus:text-xs md:peer-focus:text-[11px]">
                    Email
                  </span>
                </label>
                {errors.email && <p className="text-yellow-400 md:text-sm text-xs mt-1 text-left">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className='col-span-full'>
                <textarea
                  id="message"
                  className={`w-full rounded-lg bg-transparent border-[#3B2B6A]/30 align-top text-white placeholder:text-[#9B72EF]/40 shadow-sm focus-within:border-[#7B4FD0] focus-within:ring-1 focus-within:ring-[#7B4FD0] transition duration-300 ease-in-out sm:text-sm md:text-sm text-xs resize-none ${errors.message ? 'border-yellow-500/30' : 'border-[#3B2B6A]/30'}`}
                  rows="2"
                  placeholder="Your message here..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-yellow-400 md:text-sm text-xs mt-1 text-left">{errors.message}</p>}
              </div>
            </div>
            {/* Preview */}
            <div className="pt-6 space-y-1">
              <p className='text-xs text-left'>Preview:</p>
              <p className="italic text-start">
                "Hi there! I’m{" "}
                {formData.name ? (
                  <span className="text-[#9B72EF]">{formData.name}</span>
                ) : (
                  <span className="text-[#9B72EF]">your name</span>
                )}
                . You can reach me at{" "}
                {formData.email ? (
                  <span className="text-[#9B72EF]">{formData.email}</span>
                ) : (
                  <span className="text-[#9B72EF]">your email</span>
                )}
                , Here’s my message;{" "}
                {formData.message ? (
                  <span className="text-[#9B72EF]">{formData.message}</span>
                ) : (
                  <span className="text-[#9B72EF]">your message</span>
                )}"
              </p>
            </div>
            <div className='flex justify-center gap-3 pt-8'>
              <Button text={'Close'} onClick={closeModal} type="button"></Button>
                <Button text={'Submit'} type="submit" styles={`bg-[#7B4FD0] hover:bg-[#6A3FBF]`}></Button>
            </div>
          </form>
        </div>
      </div>
      {/* Success Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-base bg-opacity-70 z-50 transition-opacity duration-300 ease-out ${isSuccessOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className={`bg-base backdrop-blur-md border border-[#59568fbd]/20 rounded-lg md:p-6 p-4 w-full max-w-xs text-center transform transition-transform duration-300 ease-out ${isSuccessOpen ? 'scale-100' : 'scale-95'
            }`}
        >
          <div className="mb-6 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-10 text-[#9B72EF] mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <p className='text-md'>Message sent successfully! <br />I'll get back to you soon!</p>
          </div>
          <Button text={'Got it'}
            onClick={closeSuccessModal}
          >
          </Button>
        </div>
      </div>
    </div>

  )
}

export default Contact
