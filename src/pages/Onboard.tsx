import React, { useState } from "react";
import bgImage from "/icons/bg.svg"; // background svg import
import { Copyright, Eye, EyeClosed, EyeOff } from "lucide-react";
import logo from '/icons/Logo.svg'
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/services/auth";

export const  Onboard=() =>{

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
        ss
        </div>
      </div>
      <div className="flex items-center gap-3 px-20 py-1 w-full text-white text-base">
      <Copyright size={16}/>2025 Project Accel. Crafted with percision
      </div>
    </div>
  );
}
