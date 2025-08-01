import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Image assets from Figma design
const imgColorTriangle101 = "http://localhost:3845/assets/c04b97ba6531b6ba0dcacf985f6bf2eba68101fe.svg";
const imgLogo = "http://localhost:3845/assets/06505569d2345c58ab029ada5c00655c78273b87.svg";
const imgMdiEyeOff = "http://localhost:3845/assets/20a55f4f9becdef19eda7e4603c5bf1a49fc38a1.svg";
const imgGroup = "http://localhost:3845/assets/ba060a5dfdc88ea20321b0f8ee0d30af51ff23ad.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Color Triangle - Optimized for MacBook */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img
          alt="Background decoration"
          className="w-full h-full object-cover max-w-6xl"
          src={imgColorTriangle101}
        />
      </div>

      {/* Blurred Background Element - MacBook optimized */}
      <div className="absolute top-1/2 right-0 transform translate-y-[-50%] opacity-15">
        <div className="backdrop-blur-md bg-white/40 rounded-full w-80 h-80 xl:w-96 xl:h-96" />
      </div>

      {/* Main Container - Optimized for MacBook 13" */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 xl:p-16 bg-gradient-to-br from-blue-50 to-indigo-100 lg:bg-transparent">
          {/* Logo */}
          <div className="mb-6 lg:mb-8 xl:mb-10">
            <img 
              alt="Project Accel Logo" 
              className="h-10 w-auto lg:h-12 xl:h-14" 
              src={imgLogo} 
            />
          </div>
          
          {/* Main Tagline */}
          <div className="text-center max-w-sm lg:max-w-md xl:max-w-lg px-4">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 lg:text-[#06263d] leading-tight mb-3 lg:mb-4">
              <span className="block mb-1">Project Accel</span>
              <span className="block text-blue-600 lg:text-white text-lg lg:text-xl xl:text-2xl">
                Accelerate Your Project to Success
              </span>
            </h1>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 xl:p-12">
          <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
            {/* Welcome Text */}
            <div className="text-center mb-6 lg:mb-8 xl:mb-10">
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 lg:text-[#06263d] mb-2">
                Welcome Back!
              </h2>
              <p className="text-sm lg:text-base xl:text-lg text-gray-600 lg:text-[#333333]">
                Sign in to continue your journey
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-4 lg:space-y-6">
              <p className="text-center text-gray-600 lg:text-[#333333] text-xs lg:text-sm xl:text-base">
                Please enter your details below to access your account
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your e-mail ID"
                    className="w-full px-3 lg:px-4 py-3 lg:py-4 bg-[#e4d0bb] border-none rounded-lg text-gray-700 lg:text-[#5a5a5a] text-sm lg:text-base placeholder-gray-500 lg:placeholder-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-3 lg:space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                      className="w-full px-3 lg:px-4 py-3 lg:py-4 bg-[#e4d0bb] border-none rounded-lg text-gray-700 lg:text-[#5a5a5a] text-sm lg:text-base placeholder-gray-500 lg:placeholder-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all pr-10 lg:pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 p-1 lg:p-2 hover:bg-gray-200 rounded transition-colors"
                    >
                      <img
                        alt="Toggle password visibility"
                        className="w-4 h-4 lg:w-5 lg:h-5"
                        src={imgMdiEyeOff}
                      />
                    </button>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      to="/forgot-password"
                      className="text-xs lg:text-sm xl:text-base text-[#06263d] hover:text-[#0a4a7a] font-semibold transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-[#06263d] text-white py-3 lg:py-4 px-4 lg:px-6 rounded-lg text-sm lg:text-base xl:text-lg font-medium hover:bg-[#0a4a7a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#06263d] focus:ring-opacity-50"
                >
                  Sign in
                </button>
              </form>

              {/* Sign up link */}
              <div className="text-center pt-3 lg:pt-4">
                <p className="text-xs lg:text-sm xl:text-base text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-[#06263d] hover:text-[#0a4a7a] font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Copyright - MacBook optimized */}
      <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 xl:bottom-6 xl:left-6 flex items-center gap-1 lg:gap-2 text-white lg:text-gray-600">
        <div className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5">
          <img
            alt="Copyright"
            className="w-full h-full"
            src={imgGroup}
          />
        </div>
        <p className="text-xs lg:text-sm font-medium">
          2024 Project Accel. Crafted with precision
        </p>
      </div>
    </div>
  );
} 