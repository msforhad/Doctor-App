import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext()

const AdminContextProvider = (props)=>{

  const [token,setToken]=useState(localStorage.getItem('token')? localStorage.getItem('token'):'')

  // const [token,setToken]=useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors,setDoctors]=useState([])

  const getAllDoctors=async()=>{
    try {
      const {data}=await axios.post(`${backendUrl}api/admin/all-doctors`,{},{headers:{token}})
      if(data.success){
        setDoctors(data.doctors)
        console.log(data.doctors)
        console.log(data)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message) 
    }
  }

  const changeAvailability=async(docId)=>{
    try {
      const {data}= await axios.post(`${backendUrl}api/admin/change-availability`,{docId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  const value={
    token,setToken,backendUrl,doctors,getAllDoctors,changeAvailability
  }
  return(
    <AdminContext.Provider value={value}>
      {
        props.children
      }
    </AdminContext.Provider>
  )
}

export {AdminContext,AdminContextProvider} 