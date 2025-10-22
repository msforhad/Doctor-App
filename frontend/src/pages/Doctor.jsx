import { NavLink, useParams } from 'react-router-dom'
import {  specialityData } from '../assets/assets.js'
import DoctorCard from '../components/doctor/DoctorCard.jsx'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'

const Doctor = () => {
  const {id}=useParams();

  const {doctors } = useContext(AppContext)

  const [doctorsData,setDoctorsData]=useState([])

  const [filterMenu,setFilterMenu]=useState(false);

  useEffect(()=>{
    
    if(id){
      const filter = doctors.filter((data)=>data.speciality.toLowerCase().includes(id?.toLowerCase()))
      setDoctorsData(filter)
      
    }else{
    setDoctorsData(doctors)
    }
  },[id,doctors])

  return (
    <div className='mt-10 flex flex-col gap-10'>
      <p className='poppins text-md font-semibold'>Browse through the doctors specialist.</p>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='flex flex-col gap-5 outfit text-md text-gray-500'>
          <p onClick={()=>setFilterMenu(!filterMenu)} className='border rounded-sm px-5 py-1 border-gray-300 w-20 cursor-pointer md:hidden'>Filter  
          </p>
          {
            specialityData.map((data,index)=>(
              <NavLink to={`/doctors/${data.speciality}`} className={`${filterMenu?'':'hidden md:block'} ${data.speciality.toLowerCase()===id?.toLowerCase()?'bg-[#EAEFFF]':''}  border-1 rounded-sm px-5 py-1 border-gray-300`} key={index}>{data.speciality}</NavLink>
            ))
          }

        </div>

        <DoctorCard doctorsFilterData={doctorsData} ></DoctorCard>
        
      </div>
    </div>
  )
}

export default Doctor