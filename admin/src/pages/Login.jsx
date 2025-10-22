import { useContext } from 'react'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state,setState]=useState('Admin')

  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const {setToken,backendUrl}=useContext(AdminContext)

  const onSubmitHandler= async(event)=>{
    event.preventDefault()
    try {
      if(state==='Admin'){
        const {data}=await axios.post(`${backendUrl}api/admin/login`,{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }

      }
      
    } catch (error) {
      console.log(error)  
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-md text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-gray-400'>{state}</span> Login</p>

        <div className='flex flex-col gap-2 w-full'>
          <p className='text-lg font-semibold'>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 ' type="email" required />
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <p className='text-lg font-semibold'>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 ' type="password" required />
        </div>

        <button className='bg-indigo-500 text-white w-full py-2 rounded text-md font-semibold cursor-pointer'>Login</button>
        {
          state ==='Admin'?
          <p>Doctor Login?<span onClick={()=>setState('Doctor')} className='cursor-pointer text-indigo-500 underline'> Click here</span></p>
          :
          <p>Admin Login?<span onClick={()=>setState('Admin')}className='cursor-pointer text-indigo-500 underline'> Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login