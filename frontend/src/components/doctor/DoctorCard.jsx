import { useNavigate } from "react-router-dom"


const DoctorCard = (doctors) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='grid grid-col md:grid-cols-3 gap-5'>
        
        {
          doctors.doctorsFilterData.length==0?(<div className="poppins text-md">No doctors found. . .</div>):
          (
          doctors.doctorsFilterData?.map((doctor,index)=>(doctor.available&&
            <div onClick={()=>{navigate(`/appointment/${doctor._id}`); scrollTo({top:0,behavior:'smooth'})}} key={index}  className='border-1 rounded-xl border-[#C9D8Fd] hover:-translate-y-3 delay-150 ease-in-out duration-300 cursor-pointer'>
              <img className='bg-[#EAEFFF] rounded-t-xl w-full' src={doctor.image} alt="" />
              <div className={`relative flex items-center gap-3 poppins  ml-5 mt-5 mb-2 text-green-500`}>
                <p className='absolute top-[-28px] text-6xl text-center '>.</p>
                <p className='relative left-5 text-sm'>Available</p>
                
              </div>
              <p className='pl-5 poppins text-md font-semibold pt-1'>{doctor.name}</p>
              <p className='pl-5 poppins text-sm font-medium pb-3 pt-1 text-gray-500'>{doctor.speciality}</p>
            </div>
          ))
        )
        }
      </div>
    </div>
  )
}

export default DoctorCard