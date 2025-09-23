import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Image assets from Figma design
const imgColorTriangle101 = "http://localhost:3845/assets/c04b97ba6531b6ba0dcacf985f6bf2eba68101fe.svg";
const imgLogo = "http://localhost:3845/assets/06505569d2345c58ab029ada5c00655c78273b87.svg";
const imgGroup = "http://localhost:3845/assets/ba060a5dfdc88ea20321b0f8ee0d30af51ff23ad.svg";

export default function ForgotPasswordNew() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="bg-white relative min-h-screen w-full overflow-x-hidden">
      {/* Background Triangle - Responsive */}
      <div className="absolute h-[400px] md:h-[600px] lg:h-[800px] xl:h-[1117px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] lg:w-[1400px] xl:w-[1728px] opacity-50 md:opacity-70 lg:opacity-100">
        <img
          alt="Background decoration"
          className="block max-w-none size-full"
          src={imgColorTriangle101}
        />
      </div>

      {/* Blurred Background Element - Hidden on mobile */}
      <div className="hidden lg:block absolute -bottom-[12.82%] flex items-center justify-center -left-[19.21%] -right-[30.38%] -top-[5.19%]">
        <div className="flex-none h-[876.258px] rotate-[336.571deg] w-[1293.25px]">
          <div className="bg-[rgba(242,242,242,0.08)] overflow-clip relative rounded-bl-[5.54px] rounded-br-[2.624px] rounded-tl-[30.326px] rounded-tr-[30.326px] size-full">
            {/* Dashboard content would go here - simplified for this component */}
          </div>
        </div>
      </div>

      {/* Glass Effect Background - Hidden on mobile */}
      <div className="hidden xl:block absolute flex h-0 items-center justify-center top-1/2 -translate-x-1/2 -translate-y-1/2 w-0" style={{ left: "calc(50% + 334px)" }}>
        <div className="flex-none rotate-[270deg]">
          <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.48)] h-[900px] rounded-[48px] w-[957px]" />
        </div>
      </div>

      {/* Main Content Container - Responsive */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen px-4 md:px-8 lg:px-0">
        {/* Left Side - Branding */}
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-14 items-center justify-center p-4 md:p-8 lg:p-0 w-full lg:w-[578px] lg:translate-y-[-50%] lg:absolute lg:left-0 lg:top-1/2" style={{ top: "calc(50% + 0.5px)" }}>
          {/* Logo */}
          <div className="h-[40px] md:h-[45px] lg:h-[50px] relative shrink-0 w-[220px] md:w-[250px] lg:w-[275px]">
            <img alt="Project Accel Logo" className="block max-w-none size-full" src={imgLogo} />
          </div>
          
          {/* Tagline */}
          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] min-w-full relative shrink-0 text-[#06263d] text-[24px] md:text-[32px] lg:text-[40px] text-center" style={{ width: "min-content", fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[1.2] md:leading-[1.4] lg:leading-[67px]">
              <span>Project Accel-</span>
              <span> </span>
              <span className="font-['Roboto:SemiBold',_sans-serif] font-semibold text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                Accelerate Your Project to Success
              </span>
            </p>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 items-center justify-center p-4 md:p-8 lg:p-0 w-full lg:w-[800px] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
          {/* Form Header */}
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 items-center justify-start p-0 relative shrink-0 w-full max-w-[474px]">
            <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#06263d] text-[24px] md:text-[28px] lg:text-[32px] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="block leading-[normal]">Forgot your Password?</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex flex-col gap-6 md:gap-8 items-center justify-start p-0 relative shrink-0 w-full max-w-[800px]">
            <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#333333] text-[16px] md:text-[20px] lg:text-[24px] text-center w-full px-4 md:px-0" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="block leading-[normal]">
                Enter your email address and we'll send a link to reset password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10 lg:gap-12 items-center md:items-end justify-center p-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-4 items-center md:items-end justify-end p-0 relative shrink-0 w-full">
                {/* Email Input */}
                <div className="bg-[#e4d0bb] flex flex-row items-center justify-start px-4 md:px-8 lg:px-12 py-3 md:py-4 lg:py-2 relative rounded-lg shrink-0 w-full max-w-[800px] h-16 md:h-18 lg:h-20">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your email id"
                    className="capitalize font-['Roboto:Medium',_sans-serif] font-medium leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[16px] md:text-[18px] lg:text-[20px] text-left bg-transparent border-none outline-none w-full" 
                    style={{ fontVariationSettings: "'wdth' 100" }}
                    required
                  />
                </div>

                {/* Back to Sign In Link */}
                <div className="flex flex-row gap-2.5 items-center md:items-end justify-center md:justify-end pl-0 pr-4 md:pr-8 py-0 relative shrink-0">
                  <Link to="/login" className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#06263d] text-[16px] md:text-[18px] lg:text-[20px] text-center md:text-left hover:underline transition-colors duration-200" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[normal]">
                      <span>{`Back to `}</span>
                      <span className="text-[#06263d]">sign in</span>
                    </p>
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#06263d] flex flex-row gap-2.5 h-16 md:h-18 lg:h-20 items-center justify-center px-8 md:px-16 lg:px-[200px] py-3 md:py-4 rounded-lg w-full max-w-[400px] hover:bg-[#0a3a5a] transition-colors duration-200"
              >
                <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-white text-[18px] md:text-[20px] lg:text-[24px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="block leading-[normal]">
                    Send Reset Link
                  </p>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer - Responsive */}
      <div className="absolute flex flex-row gap-2 items-center justify-start left-4 md:left-8 lg:left-[198px] p-0 bottom-4 md:bottom-8 lg:top-[1061px] lg:bottom-auto">
        <div className="overflow-clip relative shrink-0 size-4 md:size-5 lg:size-6">
          <div className="absolute inset-[8.333%]">
            <div className="absolute inset-[-5%]">
              <img
                alt="Copyright icon"
                className="block max-w-none size-full"
                src={imgGroup}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-white text-[12px] md:text-[14px] lg:text-[16px] text-left" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="block leading-[normal]">
            2024 Project Accel. Crafted with precision
          </p>
        </div>
      </div>
    </div>
  );
} 