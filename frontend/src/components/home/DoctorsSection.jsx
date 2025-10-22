
import {  useNavigate } from 'react-router-dom'
import DoctorCard from '../doctor/DoctorCard.jsx'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext.jsx'

const DoctorsSection = () => {
  const navigate = useNavigate()
  
  const {doctors}=useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='flex flex-col items-center justify-center gap-5'>
        <p className='text-4xl font-bold poppins'>Top Doctors to Book</p>
        <p className='poppins text-md text-gray-500  text-center'>Simply browse through our extensive list of trusted <br />doctors.</p>
      </div>

      <DoctorCard doctorsFilterData={doctors.slice(0,9)}></DoctorCard>

      <button 
      onClick={()=>{navigate('/doctors'),scrollTo({top:0,behavior:'smooth'})}}
      className='outfit font-semibold text-md border-1 border-[#C9D8Fd] cursor-pointer bg-[#EAEFFF] rounded-full w-30 h-12'>Lode More
      </button>
    </div>
  )
}

export default DoctorsSection