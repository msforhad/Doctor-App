
import { useEffect } from 'react';
import BookAppointment from '../components/home/BookAppointment.jsx';
import DoctorsSection from '../components/home/DoctorsSection.jsx';
import HederSection from '../components/home/HederSection.jsx'
import SpecialitySection from '../components/home/SpecialitySection.jsx';

const Home = () => {
  useEffect(()=>{
    scrollTo({top:0,behavior:'smooth'})
  },[])
  return (
    <>
    <HederSection></HederSection>
    <SpecialitySection></SpecialitySection>
    <DoctorsSection></DoctorsSection>
    <BookAppointment></BookAppointment>
    </>
    
  )
}

export default Home