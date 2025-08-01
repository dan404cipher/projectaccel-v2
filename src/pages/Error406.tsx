import React from 'react';
import { Link } from 'react-router-dom';

// Image assets from Figma design
const imgVector = "http://localhost:3845/assets/758ad2f02a1f3d2f64ce7777da14460e76554177.svg";
const imgGroup2087324102 = "http://localhost:3845/assets/1936f309549d407657ca1ac48fc54c6274f4694a.svg";
const imgGroup2087324099 = "http://localhost:3845/assets/1c2da7451442520b299a90800f600bebb3e49f25.svg";
const imgNumber2 = "http://localhost:3845/assets/4a13364ce012a243f67aee5aacf83b0892b248ce.svg";
const imgVector1 = "http://localhost:3845/assets/3916e13b4c252fa51394d392560a2474e7ab3c74.svg";

export default function Error406() {
  return (
    <div className="bg-white relative min-h-screen w-full overflow-hidden">
      {/* Background Vector */}
      <div className="absolute bottom-0 h-[1117px] left-1/2 translate-x-[-50%] w-[1728px]">
        <div className="absolute bottom-[-0.27%] left-[-0.17%] right-[-0.17%] top-[-0.27%]">
          <img alt="Background" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>

      {/* Login Button */}
      <div className="absolute bg-[#06263d] flex items-center justify-center left-1/2 px-[200px] py-4 rounded-lg top-[870.73px] translate-x-[-50%] w-[400px]">
        <Link to="/login" className="text-white font-medium text-2xl hover:bg-[#0a3a5a] transition-colors duration-200 px-4 py-2 rounded">
          Login
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="absolute left-1/2 top-[180px] translate-x-[-50%] w-full max-w-6xl">
        {/* Rotated Group Element */}
        <div className="absolute bottom-[60.33%] flex items-center justify-center left-[27.66%] right-[28.63%] top-[16.11%]">
          <div className="flex-none h-[185.92px] rotate-[353.926deg] w-[739.657px]">
            <div className="relative size-full">
              <img
                alt="Decorative element"
                className="block max-w-none size-full"
                src={imgGroup2087324102}
              />
            </div>
          </div>
        </div>

        {/* Large "1" Character */}
        <div className="absolute font-bold h-[437.24px] left-[1102.08px] text-[#455a64] text-[420px] text-center top-[227.93px] translate-x-[-50%] w-[178.888px] leading-none">
          <span className="block leading-[normal]">1</span>
        </div>

        {/* Center Group Element */}
        <div className="absolute bottom-[37.34%] left-[41.26%] right-[41.21%] top-[35.56%]">
          <img
            alt="Center decoration"
            className="block max-w-none size-full"
            src={imgGroup2087324099}
          />
        </div>

        {/* Number 2 decoration */}
        <div className="absolute bottom-[37.06%] left-[26.79%] right-[59.2%] top-[35.28%]">
          <img alt="Number 2 decoration" className="block max-w-none size-full" src={imgNumber2} />
        </div>

        {/* Vector Element */}
        <div className="absolute bottom-[40.1%] left-[35.7%] right-[26.79%] top-[31.4%]">
          <div className="absolute bottom-[-0.09%] left-[-0.05%] right-[-0.05%] top-[-0.09%]">
            <img alt="Vector decoration" className="block max-w-none size-full" src={imgVector1} />
          </div>
        </div>
      </div>

      {/* Error Message */}
      <div className="absolute bottom-[30.53%] top-[65.26%] left-1/2 translate-x-[-50%] text-center">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-normal text-[#666666] leading-tight">
          Unauthorized access! Please login to continue
        </h1>
      </div>

      {/* Additional Error Details */}
      <div className="absolute bottom-[20%] left-1/2 translate-x-[-50%] text-center space-y-4">
        <p className="text-xl lg:text-2xl text-[#666666]">
          Error 406 - Not Acceptable
        </p>
        <p className="text-lg text-[#999999] max-w-md mx-auto">
          You need to be authenticated to access this resource. Please log in with your credentials.
        </p>
      </div>

      {/* Floating Elements Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#06263d] rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#06263d] rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#06263d] rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-[#06263d] rounded-full animate-pulse opacity-25"></div>
      </div>

      {/* Alternative Navigation */}
      <div className="absolute bottom-[10%] left-1/2 translate-x-[-50%] text-center space-y-2">
        <Link 
          to="/" 
          className="text-[#06263d] hover:text-[#0a3a5a] font-medium transition-colors duration-200 block"
        >
          ← Back to Home
        </Link>
        <Link 
          to="/forgot-password" 
          className="text-[#666666] hover:text-[#06263d] font-medium transition-colors duration-200 block"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
} 