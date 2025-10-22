import axios from 'axios'
import { useContext } from 'react'
import {toast} from 'react-toastify'
import { AppContext } from '../context/AppContext.jsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  axios.defaults.withCredentials=true;
  const navigate = useNavigate()

  const inputRefs = React.useRef([])
  const {backendUrl,getUserData}=useContext(AppContext)
  

  const handleInput=(e,index)=>{
    if(e.target.value.length>0 && index < inputRefs.current.length-1){
      inputRefs.current[index+1].focus();
    }
  }

  const handleKeyDown=(e,index)=>{
    if(e.key === 'Backspace' && e.target.value ==='' && index > 0){
      inputRefs.current[index-1].focus();
    }
  }

  const handlePaste=(e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value=char;
      }
    })
  }

  const onSubmitHandler=async(e)=>{
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map(e=>e.value)
      const otp = otpArray.join('')
      const {data}=await axios.post(`${backendUrl}/api/auth/verify-account`,{otp},{headers:{'Content-Type':'application/json'}})

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
      
    }
  }
return (
    <div className='flex items-center justify-center min-h-90 px-6 sm:px-0   '>
      <form onSubmit={onSubmitHandler} className=' p-8 rounded-sm shadow-md border border-gray-300 w-96 text-sm' action="">
        <h1 className='text-center text-black text-2xl font-bold mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-gray-500'>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_,index)=>(
            <input 
            ref={e=>inputRefs.current[index]=e}

            type='text' 
            maxLength='1' 
            key={index} 
            required 
            className='w-12 h-12 font-bold text-xl bg-[#333A5C] text-white text-center'
            onInput={(e)=>handleInput(e,index)}
            onKeyDown={(e)=>handleKeyDown(e,index)}
            
             />
          ))
            
          }
        </div>
        <button type='submit' className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white cursor-pointer rounded-full font-semibold'>Verify Email</button>
      </form>


    </div>
  )


}

export default EmailVerify