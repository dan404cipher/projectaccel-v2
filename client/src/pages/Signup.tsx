import React, { useState } from "react";
import bgImage from "/src/assets/icons/bg.svg"; // background svg import
import { Copyright, Eye, EyeClosed, EyeOff, Building2, User, Mail, Lock, Briefcase, Calendar } from "lucide-react";
import logo from '/src/assets/icons/Logo.svg'
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "@/lib/validator";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/store/auth/authSlice";
import type { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  workspaceName: string;
  designation: string;
  yearsOfExperience: string;
}

interface SignupErrors {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  workspaceName: string | null;
  designation: string | null;
  yearsOfExperience: string | null;
}

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    workspaceName: "",
    designation: "",
    yearsOfExperience: ""
  });
  const [error, setError] = useState<SignupErrors>({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    workspaceName: null,
    designation: null,
    yearsOfExperience: null
  });

  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      workspaceName: null,
      designation: null,
      yearsOfExperience: null
    };

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailError = validateEmail(form.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Password validation
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Workspace name validation
    if (!form.workspaceName.trim()) {
      newErrors.workspaceName = "Workspace name is required";
    } else if (form.workspaceName.trim().length < 2) {
      newErrors.workspaceName = "Workspace name must be at least 2 characters";
    }

    // Designation validation
    if (!form.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    // Years of experience validation
    if (!form.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required";
    } else if (isNaN(Number(form.yearsOfExperience)) || Number(form.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = "Please enter a valid number";
    }

    setError(newErrors);
    return !Object.values(newErrors).some(err => err !== null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    setError({ ...error, [name]: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const res = await dispatch(signupUser({
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        workspaceName: form.workspaceName.trim(),
        designation: form.designation.trim(),
        yearsOfExperience: Number(form.yearsOfExperience)
      }));
      
      if (res.payload.success) {
        toast.success(res.payload.message || "Account created successfully! Welcome to Project Accel!");
        navigate('/dashboard');
      } else {
        toast.error(res.payload.message || "Signup failed");
      }
    } catch (err: any) {
      toast.error("An error occurred during signup");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-20 py-8 font-roboto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Signup container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-7xl min-h-[700px] rounded-3xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="flex flex-col gap-6 lg:gap-10 items-center">
            <img src={logo} alt="logo" className="w-16 h-16 lg:w-20 lg:h-20" />
            <span className="font-roboto text-2xl sm:text-3xl lg:text-[40px] font-semibold text-white text-center">
              <span className="text-[#06263D]">Project Accel - </span> Start Your <br></br> Project Journey
            </span>
          </div>
        </div>
        <div className="bg-[#ffffff7a] w-full h-full rounded-2xl backdrop-blur-xl p-6 sm:p-8 lg:p-12 flex items-center justify-center pr-0">
          {/* signup form */}
          <div 
            className="signup-scroll w-full max-w-lg flex flex-col gap-6 max-h-[600px] overflow-y-auto -mr-2 pr-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#06263D transparent',
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-[#06263D] w-full">
              <div className="flex flex-col gap-3">
                <div className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-center">Create Account!</div>
                <div className="text-center font-medium text-lg sm:text-xl lg:text-3xl">
                  Join Project Accel and create your workspace
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="text-sm sm:text-base lg:text-xl font-medium text-center">
                  Please fill in your details to create your account and workspace
                </div>
                
                {/* Personal Information Section */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-[#06263D] flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    Personal Information
                  </h3>
                  
                  {/* Name Field */}
                  <div className="flex flex-col">
                    <input 
                      name="name" 
                      onChange={handleChange} 
                      value={form.name}
                      className="bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                      placeholder="Full Name" 
                    />
                    {error.name && 
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.name}
                      </div>
                    }
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col">
                    <input 
                      name="email" 
                      onChange={handleChange} 
                      value={form.email}
                      type="email"
                      className="bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full lowercase" 
                      placeholder="Email Address" 
                    />
                    {error.email && 
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.email}
                      </div>
                    }
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col">
                    <div className="flex items-center bg-[#E4D0BB] rounded-lg pr-4">
                      <input 
                        name="password" 
                        onChange={handleChange} 
                        value={form.password}
                        type={showPassword ? "text" : "password"} 
                        className="bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                        placeholder="Password" 
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

                  {/* Confirm Password Field */}
                  <div className="flex flex-col">
                    <div className="flex items-center bg-[#E4D0BB] rounded-lg pr-4">
                      <input 
                        name="confirmPassword" 
                        onChange={handleChange} 
                        value={form.confirmPassword}
                        type={showConfirmPassword ? "text" : "password"} 
                        className="bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                        placeholder="Confirm Password" 
                      />
                      <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <Eye className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" /> : <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />}
                      </div>
                    </div>
                    {error.confirmPassword &&
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.confirmPassword}
                      </div>
                    }
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-[#06263D] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                    Professional Information
                  </h3>
                  
                  {/* Designation Field */}
                  <div className="flex flex-col">
                    <input 
                      name="designation" 
                      onChange={handleChange} 
                      value={form.designation}
                      className="bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                      placeholder="Designation (e.g., Project Manager, Developer)" 
                    />
                    {error.designation && 
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.designation}
                      </div>
                    }
                  </div>

                  {/* Years of Experience Field */}
                  <div className="flex flex-col">
                    <input 
                      name="yearsOfExperience" 
                      onChange={handleChange} 
                      value={form.yearsOfExperience}
                      type="number"
                      min="0"
                      max="50"
                      className="bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                      placeholder="Years of Experience" 
                    />
                    {error.yearsOfExperience && 
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.yearsOfExperience}
                      </div>
                    }
                  </div>
                </div>

                {/* Workspace Information Section */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-[#06263D] flex items-center gap-2">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Workspace Information
                  </h3>
                  
                  {/* Workspace Name Field */}
                  <div className="flex flex-col">
                    <input 
                      name="workspaceName" 
                      onChange={handleChange} 
                      value={form.workspaceName}
                      className="bg-[#E4D0BB] autofill:bg-[#E4D0BB] rounded-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-none outline-none text-[#5A5A5A] font-medium text-base sm:text-lg lg:text-xl placeholder:text-[#5A5A5A] w-full" 
                      placeholder="Company/Workspace Name" 
                    />
                    {error.workspaceName && 
                      <div className="flex items-center w-full justify-start text-[#BC3939] py-1 px-2 text-sm font-medium">
                        {error.workspaceName}
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button 
                  className="bg-[#06263D] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-[80%] lg:w-[70%] text-base sm:text-lg lg:text-xl font-medium hover:bg-[#0a3a5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={
                    !form.name || !form.email || !form.password || !form.confirmPassword || 
                    !form.workspaceName || !form.designation || !form.yearsOfExperience ||
                    !!error.name || !!error.email || !!error.password || !!error.confirmPassword ||
                    !!error.workspaceName || !!error.designation || !!error.yearsOfExperience ||
                    loading
                  }
                >
                  {loading ? "Creating Account..." : "Create Account & Workspace"}
                </button>
                
                <div className="flex items-center gap-2 text-[#5A5A5A] text-sm sm:text-base text-center">
                  <span>Already have an account?</span>
                  <span 
                    className="text-[#06263D] font-medium cursor-pointer hover:underline"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
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
};
