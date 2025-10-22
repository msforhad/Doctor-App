import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const{setToken,backendUrl,getUserData}=useContext(AppContext)

  const navigator=useNavigate();

  const[states,setStates]=useState('Sign Up')

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    try {
      if(states==='Sign Up'){
       const {data}= await axios
       .post(`${backendUrl}/api/auth/register`,{name,password,email},
        {
          withCredentials:true,
          headers:{"Content-Type":"application/json"}
        })

        if(data.success){
          localStorage.setItem('token',data.token)
          console.log(data.token)
          setToken(data.token)
          setEmail('')
          setName('')
          setPassword('')
          getUserData()
          navigator('/')
          toast.success(data.message)
        }else{
          toast.error(data.message)
        };

      }else{
        const {data}=await axios
        .post(`${backendUrl}/api/auth/login`,{password,email},
          {
            withCredentials:true,
            headers:{"Content-Type":"application/json"}
          })
      
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          setEmail('')
          setPassword('')
          getUserData()
          navigator('/')
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      } 
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  },[])


  return (
    <div className='flex justify-center items-center h-150 outfit'>
      <div className='flex flex-col gap-5 border-1 rounded-sm border-gray-300 p-10 shadow-sm w-100 md:w-110'>
        <div className='flex flex-col gap-2 '>
          <p className='text-xl font-semibold text-gray-600'>{states==='Sign Up'?'Create Account':'Login'}</p>
          <p className='text-md font-medium text-gray-500'>Please {states==='Sign Up'?'sign up':'login'} to book appointment</p>
        </div>

        <div>
          <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
            {
              states==='Sign Up' && (
                <div>
                  <input 
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  type="text" 
                  className='bg-transparent outline-none border rounded px-3 py-2 border-gray-400 text-gray-500 w-full' 
                  placeholder='Enter your full name'
                  required
                   />
                </div>

              )
            }


            <div>
              <input
                value={email}
                onChange={e=>setEmail(e.target.value)}
                type="email" 
                className='bg-transparent outline-none border rounded px-3 py-2 border-gray-400 text-gray-500 w-full' 
                placeholder='Enter your email'
                required
                 />
            </div>

            <div>
              <input
                value={password}
                onChange={e=>setPassword(e.target.value)} 
                type="password" 
                className='bg-transparent outline-none border rounded px-3 py-2 border-gray-400 text-gray-500 w-full' 
                placeholder='Enter your password'
                required
                 />
            </div>

            {
              states==='Login' && (
                <p onClick={()=>navigator('/api/auth/reset-password')} className='text-indigo-500 cursor-pointer text-sm hover:underline'>Forget password?</p>

              )
            }


            <button type='submit' className='w-full bg-[#5F6FFF] rounded-full cursor-pointer py-2 text-white font-semibold text-md'>{states}
            </button>
          </form>

          {states==='Sign Up'?
          (
            <p className='pt-5 outfit text-sm text-gray-500'>Already have an account? {''}
            <span className='text-indigo-500 hover:underline cursor-pointer text-md font-medium' onClick={()=>{setStates('Login'); navigator('/api/auth/login');}}>Login here</span>
            </p>
          )
          :
          (
            <p className='pt-5 outfit text-sm text-gray-500'>Don't have an account?{' '}
            <span className='text-indigo-500 hover:underline cursor-pointer text-md font-medium' onClick={()=>{setStates('Sign Up');navigator('/api/auth/register')}}>Sign Up</span>
            </p>
          )
          }
        </div>
      </div>


    </div>
  )
}

export default Login