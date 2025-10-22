import React, { useEffect } from 'react'
import { assets } from '../assets/assets'

const About = () => {
  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  },[])
  return (
    <div>
      <div className='flex flex-col gap-10 py-10 poppins mx-5 md:mx-0'>
        <p className='text-center mb-5 text-2xl font-semibold text-gray-500'>ABOUT <span className='text-black'>US</span></p>

        <div className='flex flex-col md:flex-row gap-10 md:items-end '>
          <img className='md:h-120' src={assets.about_image} alt="" />
          <p className='text-sm text-gray-500 leading-6 tracking-wide text-justify'>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. 
            <br /><br />Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way. <br /><br />
            <span className='text-black font-semibold'>Our Vision</span>
            <br /><br />
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
        </div>

        <p className='text-lg font-semibold text-gray-500'>WHY <span className='text-black'>WHY CHOOSE US</span> </p>

        <div className='flex flex-col md:flex-row'>
          {
          [
            {
              "title":'EFFICIENCY:',
              'description':'Access to a network of trusted healthcare professionals in your area.'
            },
            {
              "title":'CONVENIENCE:',
              'description':'Access to a network of trusted healthcare professionals in your area.'
            },
            {
              "title":'PERSONALIZATION:',
              'description':'Tailored recommendations and reminders to help you stay on top of your health.'
            },

          ].map((data,i)=>(
            <div key={i} className='group'>
              <div className='flex flex-col gap-5 border border-gray-300 rounded p-15 group-hover:bg-[#5f6fff] ease-in  duration-300'>
              <p className='text-xl font-semibold tracking-wide text-gray-600 group-hover:text-white duration-300 ease-in'>{data.title}</p>
              <p className='text-gray-500 text-md font-medium group-hover:text-white duration-300 ease-in'>{data.description}</p>
            </div>

            </div>


          ))
          }

        </div>
      </div>
    </div>
  )
}

export default About