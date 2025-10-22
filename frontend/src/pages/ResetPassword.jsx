import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  axios.defaults.withCredentials=true;
  const { getUserData, backendUrl } = useContext(AppContext);

  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStates] = useState('send-otp');

  const inputRefs = React.useRef([])
    
  
  const handleInput=(e,index)=>{
      if(e.target.value.length>0 && index < inputRefs.current.length-1){
        inputRefs.current[index+1].focus();
      }
  }


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
    }
  };

    const handlePaste = (e) => {
      const paste = e.clipboardData.getData("text");
      const pasteArray = paste.split("");
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    };


    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        if(status==='send-otp'){
          const { data } = await axios.post(
            `${backendUrl}/api/auth/send-reset-otp`,{email},{headers:{"Content-Type":"application/json"}}
          );

          if(data.success){
            toast.success(data.message)
            setStates('new-password')
            setEmail('')
            
          }else{
            toast.error(data.message)
          }

        }else{
            const otpArray = inputRefs.current.map((e) => e.value);
            const otp = otpArray.join("");
            const { data } = await axios.post(
              `${backendUrl}/api/auth/reset-password`,
              { email, otp, newPassword },
              { headers: { "Content-Type": "application/json" } }
            );
            
            if(data.success) {
              getUserData();
              toast.success(data.message);
              setEmail('')
              setNewPassword('')
              navigate("/");
              
            }else {
              toast.error(data.message);
            }

        }


      } catch (error) {
        toast.error(error.message);
      }
    };




  return (
    <div className="flex justify-center items-center h-150 outfit">
      <div className="flex flex-col gap-10 border-1 rounded-sm border-gray-300 p-10 shadow-sm w-100 md:w-110">
        <div className="flex flex-col gap-2 items-center ">
          <p className="text-2xl font-bold text-gray-600">
            {status === "send-otp" ? "Reset" : "New"} password
          </p>
        </div>

        <div>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-transparent outline-none border rounded px-3 py-2 border-gray-400 text-gray-500 w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            {status === "new-password" && (
              <div className="flex flex-col gap-5">
                <div>
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="bg-transparent outline-none border rounded px-3 py-2 border-gray-400 text-gray-500 w-full"
                    placeholder="Enter your new password"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-red-500 font-semibold tex-sm">
                    Enter your 6-digit Otp
                  </p>

                  <div
                    className="flex justify-between mb-8"
                    onPaste={handlePaste}
                  >
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <input
                          ref={(e) => (inputRefs.current[index] = e)}
                          type="text"
                          maxLength="1"
                          key={index}
                          required
                          className="w-12 h-12 font-bold text-xl bg-[#333A5C] text-white text-center"
                          onInput={(e) => handleInput(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}

            {status === "send-otp" ? (
              <button
                className="w-full bg-[#5F6FFF] rounded-full cursor-pointer py-2 text-white font-semibold text-md"
              >Reset Password
              </button>
            ) 
            : 
            (
              <button
                
                className="w-full bg-[#5F6FFF] rounded-full cursor-pointer py-2 text-white font-semibold text-md"
              >New Password
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
