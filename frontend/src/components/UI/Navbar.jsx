import { Link, NavLink, useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets.js"
import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext.jsx"
import axios from 'axios'
import {toast} from 'react-toastify'


const Navbar = () => {
  const navigate = useNavigate()

  const {token,setToken,backendUrl,userData}=useContext(AppContext)

  
  const[showMenu,setShowMenu]=useState(false);

  const logout=async()=>{
       const {data}=await axios.post(`${backendUrl}/api/auth/logout`)
       if(data.success){
        localStorage.removeItem('token')
        setToken(false)
        navigate('/')
        toast.success(data.message)
       }else{
        toast.error(data.message)
       }
       
  }

  const verifyAccount=async()=>{
    axios.defaults.withCredentials=true;
    const {data}= await axios.post(`${backendUrl}/api/auth/send-verify-otp`)
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }


  return (
    <div>
      <div className="flex items-center justify-between border-b border-b-[#ADADAD] mx-5">
        <Link onClick={()=>scrollTo({top:0,behavior:'smooth'})} to='/'><img className="w-20 2xl:w-40 " src={assets.navbar_logo} alt="logo" />
        </Link>

        <ul className="hidden md:flex poppins text-sm 2xl:text-3xl font-semibold items-center gap-6  uppercase  my-8 2xl:my-20  ">
          {
            ['home','doctors','about','contact'].map((nav,index)=>(

              <li key={index}>
                <NavLink
                  onClick={()=>scrollTo({top:0,behavior:'smooth'})} 
                  to={nav==='home'?"/":`${nav}`}
                  className={({isActive})=>`${isActive?"border-b-2 border-b-[#5F6FFF]":""}`}
                >{nav}</NavLink>
              </li>
            ))
          }

          <li className="border-1 rounded-full w-30 h-8 2xl:w-70 2xl:h-18 border-gray-300 flex items-center justify-center ">
            <a 
            href='http://localhost:5174/add-doctor'
            target="_blank" 
            rel="noopener noreferrer"
            >Admin Panel</a>
          </li>

        </ul>

        <div className="flex gap-5">
          {
            token ?
            (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={()=>navigate('profile')} className="hover:text-black cursor-pointer">My Profile</p>
                    <p onClick={()=>navigate('my-appointment')} className="hover:text-black cursor-pointer">My Appointment</p>
                    <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                    {
                      !userData?.isAccountVerified && (
                        <p onClick={()=>{verifyAccount(); navigate('/api/auth/verify-account');}} className="hover:text-black cursor-pointer">Verify Account</p>
                      )
                    }

                    <p onClick={()=> navigate('/api/auth/register')} className="hover:text-black cursor-pointer">Create Account</p>

                  </div>
                </div>
              </div>
            )
            :
            (
              <button onClick={()=>navigate('/api/auth/register')} className="outfit font-semibold text-md 2xl:text-4xl text-white primary w-40 h-12 2xl:w-80 2xl:h-20 rounded-full cursor-pointer">Create Account
              </button>

            )
          }
          <img onClick={()=>setShowMenu(true)} src={assets.menu_icon} className="w-6 md:hidden cursor-pointer " alt="" />

          {/* mobile menu */}
          <div className={`${showMenu?'left-0':'left-220'} md:hidden top-0 z-20 overflow-hidden bg-white transition-all duration-400 ease-in-out fixed w-full h-full`}>
            <div className="flex items-start justify-between px-5 py-5">
              <img className="w-36" src={assets.navbar_logo} alt="" />
              <img className="w-7 cursor-pointer " onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 text-lg font-semibold outfit">
              <NavLink onClick={()=>setShowMenu(false)} className={({isActive})=>`${isActive?'bg-[#5f6fff] text-white rounded':''} px-6 py-2 rounded inline-block`} to='/'>Home</NavLink>
              <NavLink onClick={()=>setShowMenu(false)} className={({isActive})=>`${isActive?'bg-[#5f6fff] text-white rounded':''} px-6 py-2 rounded inline-block`} to='/doctors'>Doctors</NavLink>
              <NavLink onClick={()=>setShowMenu(false)} className={({isActive})=>`${isActive?'bg-[#5f6fff] text-white rounded':''} px-6 py-2 rounded inline-block`} to='/about'>About</NavLink>
              <NavLink onClick={()=>setShowMenu(false)} className={({isActive})=>`${isActive?'bg-[#5f6fff] text-white rounded':''} px-6 py-2 rounded inline-block`} to='/contact'>contact</NavLink>
            </ul>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Navbar