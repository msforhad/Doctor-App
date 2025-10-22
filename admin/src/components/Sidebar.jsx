import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import assets from '../assets/assets.js'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const {token}=useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r border-gray-300'>
      {
        token &&
        <ul className='flex flex-col gap-5 my-5'>
           <li>
             <NavLink className={({isActive})=>`flex gap-2 items-center py-3.5 px-3 md:px-9 md:min-w-72  ${isActive?'bg-[#f2f3ff] border-r-4 border-indigo-500':''}`} to={'/admin-dashboard'}>
               <img className='min-h-5' src={assets.home_icon} alt="" />
               <p className='text-md font-semibold'>Dashboard</p>
             </NavLink>
           </li>

           <li>
             <NavLink className={({isActive})=>`flex gap-2 items-center py-3.5 px-3 md:px-9 md:min-w-72  ${isActive?'bg-[#f2f3ff] border-r-4 border-indigo-500':''}`} to={'/all-appointments'}>
               <img className='min-h-5' src={assets.appointment_icon}  alt="" />
               <p className='text-md font-semibold'>Appointment</p>
             </NavLink>
           </li>

           <li>
             <NavLink className={({isActive})=>`flex gap-2 items-center py-3.5 px-3 md:px-9 md:min-w-72  ${isActive?'bg-[#f2f3ff] border-r-4 border-indigo-500':''}`} to={'/add-doctor'}>
               <img className='min-h-5' src={assets.add_icon} alt="" />
               <p className='text-md font-semibold'>Add Doctor</p>
             </NavLink>
           </li>

           <li>
             <NavLink className={({isActive})=>`flex gap-2 items-center py-3.5 px-3 md:px-9 md:min-w-72  ${isActive?'bg-[#f2f3ff] border-r-4 border-indigo-500':''}`} to={'/doctor-list'}>
               <img className='min-h-5' src={assets.people_icon} alt="" />
               
               <p className='text-md font-semibold'>Doctor List</p>
             </NavLink>
           </li>
        </ul>
      }

    </div>
  )
}

export default Sidebar