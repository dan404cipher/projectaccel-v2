import  { useState } from "react";
import bgImage from "/src/assets/icons/bg.svg"; // background svg import
import { Copyright } from "lucide-react";
import logo from '/src/assets/icons/Logo.svg'
import onboardImage from '/src/assets/icons/Onboard1.svg';
import onboardImage2 from '/src/assets/icons/Onboard2.svg';


export const Onboard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { label: 'Step 1', description: 'Create your account' },
    { label: 'Step 2', description: 'Verify your email' },
    { label: 'Step 3', description: 'Set up your profile' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-20 pt-20 font-roboto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* Login container */}
      <div className="relative z-10 flex gap-5 w-full h-full rounded-3xl mb-16 overflow-hidden">
        <div className=" h-full flex items-center justify-center w-[40%]">
          <div className="flex flex-col gap-10 items-center">
            <img src={logo} alt="logo" />
            <div className="flex flex-col items-center justify-center gap-5">
              <span className="text-[40px] font-bold text-white">Onboard</span>
              <span className="text-3xl font-medium text-white">Let’s Start with a Quick Tour</span>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff7a] w-full h-full rounded-2xl backdrop-blur-xl p-12 flex flex-1 justify-center">
         {
          currentStep === 0 ? (
            <div className="flex flex-col w-full gap-10">
            <div className="mb-8 w-full">
              <div className="flex items-center justify-center mb-4">
                <span className="text-[#06263D] font-medium text-center text-2xl">Steps</span>
              </div>

              {/* Progress Bar */}
              <div className="flex space-x-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${index <= currentStep
                      ? 'bg-[#06263D]'
                      : 'bg-white bg-opacity-30'
                      }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full h-[60%]">
              <img src={onboardImage} className="w-full h-full"/>
            </div>
            <div className="flex items-center justify-center">
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[#06263D] font-medium text-center text-2xl">Skip</div>
              <div className="bg-[#06263D] text-white font-medium text-center text-2xl rounded-lg px-4 py-1" onClick={handleNext}>Next</div>
            </div>
          </div>
          ):(
            <div className="flex flex-col w-full gap-10">
            <div className="mb-8 w-full">
              <div className="flex items-center justify-center mb-4">
                <span className="text-[#06263D] font-medium text-center text-2xl">Steps</span>
              </div>

              {/* Progress Bar */}
              <div className="flex space-x-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${index <= currentStep
                      ? 'bg-[#06263D]'
                      : 'bg-white bg-opacity-30'
                      }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full h-[60%]">
              <img src={onboardImage2} className="w-full h-full"/>
            </div>
            <div className="flex items-center justify-center">
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[#06263D] font-medium text-center text-2xl">Skip</div>
              <div className="bg-[#06263D] text-white font-medium text-center text-2xl rounded-lg px-4 py-1" onClick={handleNext}>Next</div>
            </div>
          </div>
          )
         }
        </div>
      </div>
      <div className="flex items-center gap-3 px-20 py-1 w-full text-white text-base">
        <Copyright size={16} />2025 Project Accel. Crafted with percision
      </div>
    </div>
  );
}
