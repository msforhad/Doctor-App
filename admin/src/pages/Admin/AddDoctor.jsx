
import assets from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Await } from 'react-router-dom'

const AddDoctor = () => {

  const [docImg,setDocImg]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('1 Year')
  const [fees,setFees]=useState('')
  const [about,setAbout]=useState('')
  const [speciality,setSpeciality]=useState('General physician')
  const [degree,setDegree]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')

  const {backendUrl,token}=useContext(AdminContext)

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      if(!docImg){
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      //console lgo formed data
      // formData.forEach((value,key)=>{
      //   console.log(`${key}:${value}`)
      // })

      const {data}=await axios.post(`${backendUrl}api/admin/add-doctor`,formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setFees('')
        setAbout('')
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error) 
    }

  }
  return (
    <div className='w-[100%]'>
      <form onSubmit={onSubmitHandler} className='m-5'>
        <p className='mb-3 text-lg font-medium'>Add Doctor</p>

        <div className='bg-white px-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll pt-5'>
          <div className='flex items-center justify-start gap-4  mb-8 text-gray-500'>
            <label htmlFor="doc-img">
              <img className='w-20 bg-gray-100 rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
            </label>
            <input className='hidden' onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' />
            <p>Upload doctor <br />Picture</p>
          </div>

          <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='Name' required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email}  className='border rounded px-3 py-2 border-gray-300' type="email" placeholder='Email' required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='border rounded px-3 py-2 border-gray-300' type="password" placeholder='Password' required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Experience</p>
                <select  onChange={(e)=>setExperience(e.target.value)} value={experience}  className='border rounded px-3 py-2 border-gray-300' name="" id="">
                  <option value="1 Year" id="">1 Year</option>
                  <option value="2 Year" id="">2 Year</option>
                  <option value="3 Year" id="">3 Year</option>
                  <option value="4 Year" id="">4 Year</option>
                  <option value="5 Year" id="">5 Year</option>
                  <option value="6 Year" id="">6 Year</option>
                  <option value="7 Year" id="">7 Year</option>
                  <option value="8 Year" id="">8 Year</option>
                  <option value="9 Year" id="">9 Year</option>
                  <option value="10 Year" id="">10 Year</option>
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Fees</p>
                <input onChange={(e)=>setFees(e.target.value)} value={fees}  className='border rounded px-3 py-2 border-gray-300' type="number" placeholder='Fees' required />
              </div>
            </div>

            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Speciality</p>
                <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality}  className='border rounded px-3 py-2 border-gray-300' name="" id="">
                  <option value="General physician" key="">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Eduction</p>
                <input  onChange={(e)=>setDegree(e.target.value)} value={degree}  className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='Eduction' required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Address</p>
                <input onChange={(e)=>setAddress1(e.target.value)} value={address1}  className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='address 1' required />
                <input onChange={(e)=>setAddress2(e.target.value)} value={address2}  className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='address 2' required />
              </div>
            </div> 
          </div>

          <div className='flex-1 flex flex-col gap-1 mt-5 text-gray-600'>
            <p>About Doctor</p>
            <textarea  onChange={(e)=>setAbout(e.target.value)} value={about}  className='border rounded px-3 py-2 border-gray-300' placeholder='Write about doctor' rows={5} required />
          </div>

          <button type='submit' className='bg-indigo-500 px-5 py-2 rounded-full my-5 text-white font-semibold text-lg cursor-pointer'>Add doctor</button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor