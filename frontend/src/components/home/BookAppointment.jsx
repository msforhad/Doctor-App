import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const BookAppointment = () => {
  const navigate=useNavigate()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  bg-[#5F6FFF] rounded-lg  h-100 my-15 gap-20'>
      <div className=' poppins flex flex-col md:justify-end justify-start md:items-start mr-40 pl-5 md:pl-0 md:mx-10 gap-5 mb-10 mt-22 md:mt-0'>
        <p className='text-3xl md:text-4xl font-semibold text-white leading-12 md:text-left'>Book Appointment With 100+ Trusted Doctors</p>
        <button onClick={()=>navigate('/login')} className='bg-white rounded-full w-40 h-12 text-md font-semibold outfit text-gray-500 cursor-pointer'>Create Account</button>
      </div>

      <div className='relative'>
        <img className='h-100 md:h-120 absolute bottom-0 right-0 md:right-10' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default BookAppointment