import { specialityData } from '../../assets/assets.js'
import { NavLink } from 'react-router-dom'

const SpecialitySection =() => {
  return (
    <div className='flex flex-col items-center gap-5 my-10'>
      <p className='poppins font-semibold text-3xl'>Find by Speciality</p>
      <p className='text-center mx-10 md:mx-70 poppins font-normal text-gray-500'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className='grid grid-cols-3 md:grid-cols-6 gap-8 mx-10 md:mx-30 my-10 '>
        {
          specialityData.map((data,index)=>(
            <NavLink
                key={index}
                onClick={()=>scrollTo({top:0,behavior:'smooth'})}
                to={`/doctors/${data.speciality}`} 
                className="flex flex-col justify-center items-center hover:-translate-y-3  ease-in-out duration-200 transition delay-150"
            >
              <img className='rounded-full bg-gray-100 p-1 drop-shadow-md' key={index} src={data.image} alt="" />
              <p className='poppins text-sm text-center font-medium text-gray-500 mt-3'>{data.speciality}</p>

            </NavLink>

          ))
        }
        
      </div>
    </div>
  )
}

export default SpecialitySection