import React, { useState } from "react";
import bgImage from "/icons/bg.svg"; // background svg import
import { Copyright, Eye, EyeClosed, EyeOff } from "lucide-react";
import logo from '/icons/Logo.svg'
import { useNavigate } from "react-router-dom";

export const  ForgotPassword=() =>{
  const navigate=useNavigate();
  const [form,setForm]=useState<{email:string}>({email:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}=e.target;
    setForm({...form,[name]:value});
  }

  const handleSubmit=()=>{
    navigate('/reset-password')
  }

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-20 pt-20 font-roboto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* Login container */}
      <div className="relative z-10 grid grid-cols-2 gap-5 w-full h-full rounded-3xl mb-16 overflow-hidden">
        <div className=" w-full h-full flex items-center justify-center ">
            <div className="flex flex-col gap-10 items-center">
                <img src={logo} alt="logo" />
                <span className="font-roboto text-[40px] font-semibold text-white text-center">
                <span className="text-[#06263D]">Project Accel  - </span>   Accelerate Your <br></br> Project to Success
                </span>
            </div>
        </div>
        <div className="bg-[#ffffff7a] w-full h-full rounded-2xl backdrop-blur-xl p-12 flex items-end">
          {/* login form */}
          <div className="w-full h-[80%] flex flex-col items-center justify-end">
            <form className="flex flex-col justify-between gap-10 text-[#06263D] w-full h-full" onClick={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="text-center font-medium text-3xl">
                Forgot your Password ?
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-medium text-center">
                Enter your email address and we’ll send a link to reset password
                </div>
                <div className="flex items-center w-full h-full mt-6">
                  <input name="email" onChange={handleChange} className=" bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-8 py-4 border-none outline-none text-[#5A5A5A] font-medium text-xl placeholder:text-[#5A5A5A] w-full" placeholder="Enter Your E-Mail-ID" />
                </div>
                <div className="flex items-center justify-end pr-4 py-1 cursor-pointer">
                  <span className="font-medium" onClick={()=>navigate('/login')}>Back to sign in </span>
                </div>
              </div>
              <div className="flex items-center justify-center mt-20">
                <button className="bg-[#06263D] text-white px-8 py-4 rounded-lg w-[50%]" type="submit">Send Reset Link</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-20 py-1 w-full text-white text-base">
      <Copyright size={16}/>2025 Project Accel. Crafted with percision
      </div>
    </div>
  );
}
