import React from 'react'
import assets from '../assets/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {token,setToken}=useContext(AdminContext)

  const navigate = useNavigate()

  const logout = ()=>{
    navigate('/')
    token && setToken('')
    token&& localStorage.removeItem('token')
  }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
      <div className='flex items-center gap-4 text-xs'>
        <img className='h-15' src={assets.navbar_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{token ?'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='cursor-pointer bg-indigo-500 text-white text-sm px-8 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar