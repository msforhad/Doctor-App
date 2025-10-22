
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'

const MyProfile = () => {
  const {userData,setUserData}=useContext(AppContext)
  console.log(userData)
  const[isEdit,setIsEdit]=useState(false)
  return userData && (
    <div>
      <div className='mx-10 my-15 poppins text-gray-500 font-medium'>
        <div className='flex flex-col'>
          <div className='flex gap-5 '>
            <img className='rounded h-70' src={userData.profile_pic} alt="" />
            <img className='rounded h-70' src={userData.profile_pic} alt="" />
          </div>

          <p className='text-2xl font-semibold mt-10'>{userData.name}</p>
          <hr className='w-full md:w-170 text-gray-400' />
          <p className='my-10 underline tracking-wider text-xl text-black cont-medium'>Contact information</p>
          <p className='mb-5'>Email id: <span className='text-indigo-500 pl-10'>vincent@gmail.com</span></p>
          <p>Phone: <span className='text-indigo-500 pl-10'>+000 000 000 000</span></p>
          <address className='my-5'>Address: <span className='pl-10'>57th cross,richmond circle,church Road,Landon</span></address>
          <p className='my-5 underline tracking-wider text-xl text-black cont-medium'>Basic information</p>
          <p className='my-5'>Gender: <span className='pl-10'>Male</span></p>
          <p>Birthday: <span className='pl-10'>20 July,2024</span></p>
        </div>
        <div className='my-10'>
          <button className='border font-semibold px-5 py-2 rounded hover:bg-black hover:text-white duration-300 ease-in border-gray-500'>Edit</button>
          <button  className='border font-semibold px-5 py-2 rounded hover:bg-black hover:text-white duration-300 ease-in border-gray-500 ml-5'>Save information</button>
        </div>
      </div>
    </div>
  )
}

export default MyProfile