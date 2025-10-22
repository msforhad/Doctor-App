import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AppContext=createContext();

const AppContextProvider=(props)=>{

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
   axios.defaults.withCredentials=true;

  const [doctors,setDoctors]=useState([])
 
  //page reload korar pore logout hoye jacce tai useState er modde ('') atar jaygay (localStorage.getItem('token')?localStorage.getItem('token'):false) deoya hole are auto logout hobe nah
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

  const [userData,setUserData]=useState([])


  //admin data
  const getDoctorsData=async()=>{
    try {
      const {data}=await axios.get(`${backendUrl}/api/doctor/list`)
      if(data.success){
        const availableDoctor =data.doctors.filter((doctor)=>(doctor.available))
        setDoctors(availableDoctor)

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  //user data
  const getUserData=async()=>{
    try {
      const {data}=await axios.get(`${backendUrl}/api/user/userData`)
      data.success ? setUserData(data.users):toast.error(data.message)
      setUserData(data.user)
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }


  const value={
    doctors,getDoctorsData,
    token,setToken,
    backendUrl,
    userData,getUserData
  }

  useEffect(()=>{
    getDoctorsData()
  },[])



  return(
    <AppContext.Provider value={value}>
      {
        props.children
      }
    </AppContext.Provider>
  )
}

export {AppContext,AppContextProvider}