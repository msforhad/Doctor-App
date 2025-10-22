import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {
  const doctors=useContext(AppContext)
  return (
    <div className='mx-5'>
      <p className='border-b border-gray-300 text-xl font-semibold mt-15 pb-5'>My appointment</p>
      <div className='my-5'>
        {
          doctors.slice(0,10).map((item,index)=>(
            <div className='grid grid-cols-[40%50%] md:grid-cols-[15%60%20%] gap-5 border-b border-gray-300 my-5 pb-3 ' key={index}>
              <div >
                <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              </div>
              <div className='flex flex-col justify-end outfit text-sm text-gray-500 gap-1 items-start'>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
                <p>address:</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
                <p><span>Date & Time:<span>25, July,2024|8:30 PM</span></span></p>
              </div>
              <div className='flex flex-col md:flex-col justify-end items-end gap-2'>
                <button className='w-full border px-5 py-1 text-md font-semibold border-green-500 text-green-500 cursor-pointer rounded'>Pay Online</button>
                <button className='w-full border px-5 py-1 text-md font-semibold border-red-500 text-red-500 cursor-pointer rounded'>Cancel appointment</button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default MyAppointment