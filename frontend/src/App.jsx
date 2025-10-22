import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Doctor from './pages/Doctor.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/UI/Navbar.jsx'
import Footer from './components/UI/Footer.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Appointment from './pages/Appointment.jsx'
import MyAppointment from './pages/MyAppointment.jsx'
import {ToastContainer} from 'react-toastify';
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const App = () => {

  return (
    <div className='mx-2 md:mx-[110px] 2xl:mx-[150px]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/doctors' element={<Doctor/>}></Route>
        <Route path='/doctors/:id' element={<Doctor/>}></Route>
        <Route path='/appointment/:docId' element={<Appointment/>}></Route>
        <Route path='/my-appointment' element={<MyAppointment/>}></Route>
        <Route path='/api/auth/:id' element={<Login/>}></Route>
        <Route path='/profile' element={<MyProfile/>}/>
        <Route path='/api/auth/verify-account' element={<EmailVerify/>}/>
        <Route path='/api/auth/reset-password' element={<ResetPassword/>}/>


      </Routes>
      <Footer/>
    </div>
  )
}

export default App