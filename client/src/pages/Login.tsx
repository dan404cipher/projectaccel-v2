import React, { useState } from "react";
import bgImage from "/src/assets/icons/bg.svg"; // background svg import
import { Copyright, Eye, EyeClosed, EyeOff } from "lucide-react";
import logo from '/src/assets/icons/Logo.svg'
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/lib/validator";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth/authSlice";
import type { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

export const  Login=() =>{
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [form,setForm]=useState<{email:string,password:string}>({email:"",password:""});
  const [error,setError]=useState<{email:string|null,password:string|null}>({email:null,password:null});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
    
    setError({...error, [name]: null});
    
    if (name === 'email') {
      const emailError = validateEmail(value);
      if (emailError) {
        setError({...error, [name]: emailError});
      }
    } else if (name === 'password') {
      const passwordError = validatePassword(value);
      if (passwordError) {
        setError({...error, [name]: passwordError});
      }
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res = await dispatch(loginUser({email: form.email, password: form.password}));
      console.log(res)
      if(res.payload.success){
        toast.success(res.payload.message);
        navigate('/');
      }
      else{
        toast.error(res.payload);
      }
    }
    catch(err:any){
    }
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
        <div className="bg-[#ffffff7a] w-full h-full rounded-2xl backdrop-blur-xl p-12 flex items-end justify-center">
          {/* login form */}
          <div className="w-full h-[80%] flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full  gap-10 text-[#06263D] w-full">
              <div className="flex flex-col gap-3">
                <div className=" text-[40px] font-bold text-center">Welcome Back!</div>
                <div className="text-center font-medium text-3xl">
                  Sign in to continue your journey
                </div>
              </div>
              <div className="flex flex-col mt-5">
                <div className="text-xl font-medium text-center">
                  Please enter your details below to access your account
                </div>
                <div className="flex flex-col items-center w-full h-full mt-6">
                  <input name="email" onChange={handleChange} className=" lowercase bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-8 py-4 border-none outline-none text-[#5A5A5A] font-medium text-xl placeholder:text-[#5A5A5A] w-full" placeholder="Enter Your E-Mail-ID" />
                  {error.email && 
                  <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-base font-medium">
                  {error.email}
                  </div>}
                </div>
                <div className="flex items-center w-full h-full bg-[#E4D0BB] rounded-lg pr-4 mt-6">
                  <input name="password" onChange={handleChange} type={showPassword ?"text": "password"} className=" bg-[#E4D0BB] rounded-lg px-8 py-4 border-none outline-none text-[#5A5A5A] font-medium text-xl placeholder:text-[#5A5A5A] w-full" placeholder="Enter Your Password" />
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye className="w-6 h-6 cursor-pointer" /> : <EyeOff className="w-6 h-6 cursor-pointer" />}
                  </div>
                </div>
                {error.password &&
                 <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-base font-medium">
                  {error.password}
                </div>}
                <div className="flex items-center justify-end pr-6 py-1 cursor-pointer">
                  <span className="font-medium" onClick={()=>navigate('/forgot-password')}>Forget Password</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                  <button className="bg-[#06263D] text-white px-8 py-4 rounded-lg w-[50%]" type="submit" disabled={!form.email || !form.password || !!error.email || !!error.password}>Sign In</button>
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
