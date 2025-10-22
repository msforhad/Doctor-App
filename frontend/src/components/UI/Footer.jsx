import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col gap-10 poppins mt-20 mx-2'>
      <div className='grid md:grid-cols-[60%15%15%] gap-10'>
        <div className='flex flex-col items-start justify-start'>
          <img className='w-20' src={assets.navbar_logo} alt="" />
          <p className='text-sm text-gray-500 text-justify md:mr-50'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-md font-bold'>COMPANY</p>
          <NavLink className='text-sm font-medium hover:underline decoration-2 decoration-orange-500 underline-offset-3 ' to='/'>Home</NavLink>
          <NavLink className='text-sm font-medium hover:underline decoration-2 decoration-orange-500 underline-offset-3 ' to='/about'>About Us</NavLink>
          <NavLink className='text-sm font-medium hover:underline decoration-2 decoration-orange-500 underline-offset-3 ' to='/delivery'>Delivery</NavLink>
          <NavLink className='text-sm font-medium hover:underline decoration-2 decoration-orange-500 underline-offset-3 ' to='/privacy'>Privacy Policy</NavLink>
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-md font-bold'>GET IN TOUCH</p>
          <p className='text-sm font-medium'>+0-000-000-000</p>
          <p className='text-sm font-medium'>aroggoLink@gmail.com</p>
        </div>
      </div>

      <div className='border-t-1 border-t-gray-200'>
        <p className='text-center text-sm text-gray-500 py-5'>Copyright 2024 @ AroggoLink - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer