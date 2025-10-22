import  { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { assets } from '../assets/assets.js'
import RelatedDoctors from '../components/doctor/RelatedDoctors.jsx'

const Appointment = () => {
  const {docId}=useParams()
  const {doctors}=useContext(AppContext)


  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo,setDocInfo]=useState(null)
  const [docSlot,setDocSlot]=useState([])
  const[slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')

  const getAvailableSlots=async()=>{
    setDocSlot([])

    //getting current date
    let today = new Date()

    for(let i=0;i<7;i++){
      //getting date with index---------------------------------------
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i);


      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      //setting hours
      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()> 10 ? currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30:0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while(currentDate<endTime){
        let formattedTime = currentDate.toLocaleString([],{hour:'2-digit',minute:'2-digit'})
        // add slot to array
        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })

        // increment  current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlot(prev=>([...prev,timeSlots]))
    }

  }

  useEffect(()=>{
    setDocInfo(null)
    if (Array.isArray(doctors) && doctors.length > 0 && docId) {
    const docData = doctors.find(doc => String(doc._id) === String(docId));
    setDocInfo(docData||null);
  }
  },[doctors,docId])
  


  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
  },[docSlot])


  return (
    <div className='my-10 mx-10'>
      {
        docInfo ?
        (
          <div className='grid grid-cols-1 md:grid-cols-[23%77%] gap-2 justify-items-center'>
            <div>
              <img className='bg-[#5f6fff] rounded ' src={docInfo.image} alt="" />
            </div>

            <div>

              <div className='poppins text-gray-500 border rounded border-gray-500 p-5'>

                <div className='flex gap-2 items-center'>
                  <p className='text-xl font-semibold '>{docInfo.name} </p>
                  <img className='h-4' src={assets.verified_icon} alt="" />
                </div>

                <p className='font-semibold outfit my-1'>{docInfo.degree} - {docInfo.speciality}<span className='border rounded-full px-2 py-.5 ml-2 font-normal border-gray-400'>{docInfo.experience}</span></p>

                <p className='mt-2 font-semibold '>About</p>

                <p className='text-justify ml-2 leading-5 tracking-wide text-sm'>{docInfo.about}</p>
                <p className='ml-2 mt-3 font-semibold'>Appointment fee: <span>${docInfo.fees}</span></p>
              </div>

              <p className='text-lg font-semibold py-5'>Booking slots</p>
              <div className='flex gap-3 items-center'>
                {
                  docSlot.length > 0 && docSlot.map((item,index)=>(
                    <div onClick={()=>setSlotIndex(index)} className={`border border-gray-400 rounded-full px-3 py-5 flex flex-col items-center outfit font-medium cursor-pointer ${slotIndex===index?'bg-[#5f6fff] text-white':''}`} key={index}>
                      <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                      <p>{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                  ))
                }

              </div>

              <div className='flex flex-wrap justify-between gap-3 outfit py-5'>
                {
                  docSlot.length && docSlot[slotIndex].map((item,index)=>(
                    <p onClick={()=>setSlotTime(item.time)} key={index} className={`cursor-pointer border px-3 py-1.5 rounded-full border-gray-400 text-gray-500 ${item.time===slotTime?'bg-[#5f6fff] text-white':''}`}>
                      {item.time.toLowerCase()}
                    </p>
                  ))
                }
              </div>
              <button className='cursor-pointer px-5 py-3 text-semibold text-md outfit my-5 text-white rounded-full bg-[#5f6fff]'>Book an appointment</button>
            </div>

            
          </div>
        )
        :
        (
          <p>Loading doctor info...</p>
        )
      }
      <RelatedDoctors docId={docId} speciality={docInfo ? docInfo.speciality:''} ></RelatedDoctors>

    </div>
  )
}

export default Appointment