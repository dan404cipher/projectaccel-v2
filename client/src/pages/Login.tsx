import React, { useState } from "react";
import bgImage from "/src/assets/icons/bg.svg"; // background svg import
import { Copyright, Eye, EyeClosed, EyeOff } from "lucide-react";
import logo from '/src/assets/icons/Logo.svg'
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/lib/validator";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth/authSlice";
import type { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";

export const  Login=() =>{
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector((state: RootState) => state.auth);
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
    
    // Validate form before submission
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (error.email || error.password) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    
    try{
      const res = await dispatch(loginUser({email: form.email, password: form.password}));
      
      if(res.payload.success){
        toast.success(res.payload.message);
        navigate('/dashboard');
      }
      else{
        toast.error(res.payload.message || "Login failed");
      }
    }
    catch(err:any){
      toast.error("An error occurred during login");
    }
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-20 py-8 font-roboto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* Login container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-6xl min-h-[600px] rounded-3xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-8">
            <div className="flex flex-col gap-6 lg:gap-10 items-center">
                <img src={logo} alt="logo" className="w-16 h-16 lg:w-20 lg:h-20" />
                <span className="font-roboto text-2xl sm:text-3xl lg:text-[40px] font-semibold text-white text-center">
                <span className="text-[#06263D]">Project Accel - </span> Accelerate Your <br></br> Project to Success
                </span>
            </div>
        </div>
        <div className="bg-[#ffffff7a] w-full h-full rounded-2xl backdrop-blur-xl p-6 sm:p-8 lg:p-12 flex items-center justify-center">
          {/* login form */}
          <div className="w-full max-w-md flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-[#06263D] w-full">
              <div className="flex flex-col gap-3">
                <div className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-center">Welcome Back!</div>
                <div className="text-center font-medium text-lg sm:text-xl lg:text-3xl">
                  Sign in to continue your journey
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-sm sm:text-base lg:text-xl font-medium text-center">
                  Please enter your details below to access your account
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <input 
                      name="email" 
                      onChange={handleChange} 
                      className="lowercase bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                      placeholder="Enter Your E-Mail-ID" 
                    />
                    {error.email && 
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.email}
                      </div>
                    }
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center bg-[#E4D0BB] rounded-lg pr-4">
                      <input 
                        name="password" 
                        onChange={handleChange} 
                        type={showPassword ? "text" : "password"} 
                        className="bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                        placeholder="Enter Your Password" 
                      />
                      <div onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" /> : <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />}
                      </div>
                    </div>
                    {error.password &&
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.password}
                      </div>
                    }
                  </div>
                  
                  <div className="flex items-center justify-end pr-2 py-1 cursor-pointer">
                    <span className="font-medium text-sm sm:text-base" onClick={()=>navigate('/forgot-password')}>Forget Password</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <button 
                  className="bg-[#06263D] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-[80%] lg:w-[60%] disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg font-medium" 
                  type="submit" 
                  disabled={!form.email || !form.password || !!error.email || !!error.password || loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
                
                <div className="flex items-center gap-2 text-[#5A5A5A] text-sm sm:text-base text-center">
                  <span>Don't have an account yet?</span>
                  <span 
                    className="text-[#06263D] font-medium cursor-pointer hover:underline"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up free for 14 days
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 sm:px-8 lg:px-20 py-1 w-full text-white text-xs sm:text-sm lg:text-base">
        <Copyright size={16}/>2025 Project Accel. Crafted with precision
      </div>
    </div>
  );
}
