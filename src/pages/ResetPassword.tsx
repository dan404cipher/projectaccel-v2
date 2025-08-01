import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Image assets from Figma design
const imgColorTriangle101 = "http://localhost:3845/assets/c04b97ba6531b6ba0dcacf985f6bf2eba68101fe.svg";
const imgLogo = "http://localhost:3845/assets/06505569d2345c58ab029ada5c00655c78273b87.svg";
const imgMdiEyeOff = "http://localhost:3845/assets/20a55f4f9becdef19eda7e4603c5bf1a49fc38a1.svg";
const imgGroup = "http://localhost:3845/assets/ba060a5dfdc88ea20321b0f8ee0d30af51ff23ad.svg";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset with:', { newPassword, confirmPassword });
  };

  return (
    <div className="bg-white relative min-h-screen w-full overflow-hidden">
      {/* Background Triangle */}
      <div className="absolute h-[1117px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1728px] opacity-20">
        <img
          alt="Background decoration"
          className="block max-w-none size-full"
          src={imgColorTriangle101}
        />
      </div>

      {/* Glass Effect Background */}
      <div className="absolute bottom-[-12.82%] flex items-center justify-center left-[-19.21%] right-[30.38%] top-[-5.19%]">
        <div className="flex-none h-[876.258px] rotate-[336.571deg] w-[1293.25px]">
          <div className="bg-[rgba(242,242,242,0.08)] overflow-clip relative rounded-bl-[5.54px] rounded-br-[2.624px] rounded-tl-[30.326px] rounded-tr-[30.326px] size-full backdrop-blur-sm">
            {/* Dashboard content would go here - simplified for reset password page */}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center px-8 lg:px-16 xl:px-24">
          <div className="max-w-md space-y-8 text-center">
            {/* Logo */}
            <div className="h-[50px] w-[275px]">
              <img alt="Project Accel Logo" className="block max-w-none size-full" src={imgLogo} />
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#06263d] leading-tight">
                Project Accel-
                <span className="font-semibold text-white"> Accelerate Your Project to Success</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="w-full max-w-md space-y-8">
            {/* Form Header */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-[#06263d]">
                Reset password
              </h2>
            </div>

            {/* Form Description */}
            <div className="text-center">
              <p className="text-lg lg:text-xl xl:text-2xl font-medium text-[#333333]">
                Please kindly set your new password to access your account
              </p>
            </div>

            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div className="relative">
                <div className="bg-[#e4d0bb] flex items-center justify-between px-6 py-4 rounded-lg">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    className="flex-1 bg-transparent text-[#5a5a5a] text-lg font-medium placeholder-[#5a5a5a] placeholder-opacity-90 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="flex-shrink-0 ml-4"
                  >
                    <img
                      alt="Toggle password visibility"
                      className="w-8 h-8"
                      src={imgMdiEyeOff}
                    />
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="bg-[#e4d0bb] flex items-center justify-between px-6 py-4 rounded-lg">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter Confirm Password"
                    className="flex-1 bg-transparent text-[#5a5a5a] text-lg font-medium placeholder-[#5a5a5a] placeholder-opacity-90 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex-shrink-0 ml-4"
                  >
                    <img
                      alt="Toggle password visibility"
                      className="w-8 h-8"
                      src={imgMdiEyeOff}
                    />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#06263d] text-white font-medium text-2xl py-4 px-8 rounded-lg hover:bg-[#0a3a5a] transition-colors duration-200"
              >
                Reset Password
              </button>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-[#06263d] hover:text-[#0a3a5a] font-medium transition-colors duration-200"
                >
                  ← Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        <div className="w-6 h-6 overflow-hidden">
          <div className="w-full h-full">
            <img
              alt="Copyright"
              className="block max-w-none size-full"
              src={imgGroup}
            />
          </div>
        </div>
        <span className="text-white text-base font-normal">
          2024 Project Accel. Crafted with precision
        </span>
      </div>
    </div>
  );
} 