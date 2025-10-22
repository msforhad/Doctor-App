import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import DoctorCard from './DoctorCard'

const RelatedDoctors = ({docId,speciality}) => {

  const {doctors}=useContext(AppContext)
  const [relDoc,setRlDoc]=useState([])

  useEffect(()=>{
    if(doctors.length>0 && speciality){
      const doctorsDate = doctors.filter((doc)=> doc.speciality === speciality && doc._id!== docId)
      setRlDoc(doctorsDate)
    }
  },[doctors,speciality,docId])
  return (
    <div>
      <div className='flex flex-col items-center gap-3 my-10 poppins'>
        <p className='font-semibold text-2xl'>Related Doctors</p>
        <p className='text-gary-500 text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      </div>
      <DoctorCard doctorsFilterData={relDoc}></DoctorCard>
    </div>
  )
}

export default RelatedDoctors