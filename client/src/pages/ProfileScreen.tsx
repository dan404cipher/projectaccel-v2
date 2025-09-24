import React, { act, useState } from 'react';
import { FaUser, FaBell, FaCog, FaCheck, FaQuestion, FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import profile from '/src/assets/icons/profile.avif'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { BiSupport } from "react-icons/bi";
import { BiSolidNotepad } from "react-icons/bi";
import { FaRocket } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";





export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const tabs = [
    {
      label: 'Profile',
      value: 'profile',
      icon: FaUser,
    },

    {
      label: 'Preference',
      value: 'preference',
      icon: FaCog,
    },

    {
      label: 'Notification',
      value: 'notification',
      icon: FaBell,
    }, {
      label: 'Help & Support',
      value: 'help-support',
      icon: FaQuestion,
    }
  ];

  const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
  const img3 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
  const img4 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
  const img5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
  return (
    <div className='w-full h-full py-10 flex font-roboto'>
      <div className=' w-1/4 h-full border-r border-gray-400 flex flex-col gap-5'>
        {
          tabs.map((tab) => (
            <div key={tab.value} className={`flex items-center gap-3 cursor-pointer p-2 px-4 relative${activeTab === tab.value ? '' : ''}`} onClick={() => setActiveTab(tab.value)}>
              {activeTab === tab.value && (
                <div className="w-2 h-[70%] flex items-center justify-center bg-[#06263D] absolute left-0 top-2 rounded-full py-2"></div>
              )}
              <tab.icon className={`w-5 h-5 ${activeTab === tab.value ? 'text-[#06263D]' : 'text-[#8A9DA2]'}`} />
              <span className={`text-2xl font-medium ${activeTab === tab.value ? 'text-[#06263D]' : 'text-[#8A9DA2]'}`}>{tab.label}</span>
            </div>
          ))
        }
      </div>
      <div className='flex flex-1'>
        {
          activeTab === 'profile' && (
            <div className='px-20 flex flex-col gap-5 font-roboto flex-1'>
              <div className='text-[#438197] text-2xl font-medium'>Personal Information</div>
              {/* profile details */}
              <div className='flex gap-10'>
                {/* profile image */}
                <div className='w-[100px] h-[100px] relative'>
                  <img src={profile} alt="profile" className='w-full h-full object-cover rounded-full' />
                  <div className='absolute bottom-0 right-0 bg-[#67909B] rounded-md p-2 cursor-pointer'>
                    <FaPencilAlt className='text-white' />
                  </div>
                </div>
                {/* Profile details */}
                <div className='flex flex-col gap-3'>
                  <div className='text-[#06263D] text-2xl font-medium'>Develper Name</div>
                  <div className='text-[#333333] text-base font-medium'>Front End Developer</div>
                  <div className='text-[#666666] text-sm font-medium'>+1234567890</div>
                </div>
                {/* Employee ID */}
                <div className='font-medium text-[#666666] text-base'>EMPID-VA1087</div>
              </div>
              {/* Password Change  */}
              <div className='flex flex-col flex-1'>
                <div className='text-[#333333] text-xl font-medium'>Change Password</div>
                <div className='text-[#999999] text-base font-medium'>Select your preferred language for a personalized experience</div>
                <form className='w-full flex flex-col gap-8 mt-5'>
                  <div className='flex items-center gap-2 bg-white py-3 px-5 rounded-lg w-full'>
                    <input type={showPassword ? 'text' : 'password'} className='w-full h-10 border outline-none border-none border-[#999999] rounded-md p-2 font-medium text-base' placeholder='Current Password' />
                    {showPassword ? <FaEye className='text-2xl cursor-pointer text-[#5A5A5A]' onClick={() => setShowPassword(!showPassword)} /> : <FaEyeSlash className='text-2xl cursor-pointer text-[#5A5A5A]' onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                  <div className='flex items-center gap-2 bg-white py-3 px-5 rounded-lg w-full'>
                    <input type={showPassword ? 'text' : 'password'} className='w-full h-10 border outline-none border-none border-[#999999] rounded-md p-2 font-medium text-base' placeholder='New Password' />
                    {showPassword ? <FaEye className='text-2xl cursor-pointer text-[#5A5A5A]' onClick={() => setShowPassword(!showPassword)} /> : <FaEyeSlash className='text-2xl cursor-pointer text-[#5A5A5A]' onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                  <div className='flex items-center gap-2 bg-white py-3 px-5 rounded-lg w-full'>
                    <input type={showPassword ? 'text' : 'password'} className='w-full h-10 border outline-none border-none border-[#999999] rounded-md p-2 font-medium text-base' placeholder='Confirm Password' />
                    {showPassword ? <FaEye className='text-2xl cursor-pointer text-[#5A5A5A]' onClick={() => setShowPassword(!showPassword)} /> : <FaEyeSlash className='text-2xl cursor-pointer text-[#5A5A5A]' onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className='bg-[#67909B] text-white py-3 px-5 rounded-lg'>Change Password</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
        {
          activeTab === 'preference' && (
            <div className='px-20 flex flex-col gap-5 font-roboto flex-1'>
              <div className='text-[#438197] text-2xl font-medium'>Preference</div>
              {/* Prefernce content */}
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col'>
                  <div className='text-[#333333] text-xl font-medium'>Language & Region</div>
                  <div className='text-[#999999]'>Select your preferred language & region for a personalized experience</div>
                  <form className='flex flex-col gap-4 mt-4'>
                    <Select>
                      <SelectTrigger className='w-full h-10 px-4 py-3'>
                        <SelectValue placeholder='Select Language' className='px-3 py-3' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='en'>English</SelectItem>
                        <SelectItem value='es'>Spanish</SelectItem>
                        <SelectItem value='fr'>French</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className='w-full h-10 px-4 py-3'>
                        <SelectValue placeholder='Select Timezone' className='px-3 py-3' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='in'>India</SelectItem>
                        <SelectItem value='us'>United States</SelectItem>
                        <SelectItem value='uk'>United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </form>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <div className=' text-[#333333] text-xl font-medium'>
                    Themes
                  </div>
                  <div className='text-[#999999]'>Select your preferred theme for a personalized experience</div>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Light mode</div>
                  <ThemeSwitch />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Customize your theme</div>
                  <div className="flex -space-x-1.5">
                    <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img2} />
                    <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img3} />
                    <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img4} />
                    <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img5} />
                    <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img2} />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col'>
                  <div className='text-[#333333] text-xl font-medium'>
                    Accessibility
                  </div>
                  <div className='text-[#999999]'>Select your preferred Font size & contrast for your accessibility</div>
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <div className='text-[#666666] text-xl font-medium'>Font size</div>
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <div className='text-[#666666] text-xl font-medium'>Increase contrast</div>
                </div>
              </div>
            </div>
          )
        }
        {
          activeTab === 'notification' && (
            <div className='px-20 flex flex-col gap-5 font-roboto flex-1'>
              <div className='text-[#438197] text-2xl font-medium'>Notifications</div>
              {/* Notification content */}
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col'>
                  <span className='text-[#333333] text-xl font-medium'>Gerenal</span>
                  <span className='text-[#999999]'>Select your preferred Font size & contrast for your accessibility</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Mute Notifications</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Email Notifications</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Email Notifications</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Push Notifications</div>
                  <Switch
                  />
                </div>

              </div>
              {/* Project & Task Activity */}
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col'>
                  <span className='text-[#333333] text-xl font-medium'>Project & Task Activity</span>
                  <span className='text-[#999999]'>Select your preferred Font size & contrast for your accessibility</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Task assigned</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Project status changes</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Task Comment</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Task deadline Alert</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Overdue task alerts</div>
                  <Switch
                  />
                </div>
              </div>
              {/* Communication */}
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                  <span className='text-[#333333] text-xl font-medium'> Communication</span>
                  <span className='text-[#999999]'>Select your preferred Font size & contrast for your accessibility</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Message</div>
                  <Switch
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-[#666666] text-xl font-medium'>Mention</div>
                  <Switch
                  />
                </div>
              </div>
            </div>
          )
        }
        {
          activeTab === 'help-support' && (
            <div className='px-20 flex flex-col gap-5 font-roboto flex-1'>
              <div className='flex items-center justify-between'>
                <div className='text-[#438197] text-2xl font-medium'>Help & Support</div>
                <div className='bg-[#67909B] flex items-center justify-center p-2 rounded-full cursor-pointer'>
                  <BiSupport className='text-xl text-white' />
                </div>
              </div>
              {/* help-support content  */}
              <div className='flex flex-col gap-5 mt-4'>
                <input placeholder=' How can i help you ?' className='px-10 py-5 rounded-md' />
                {/* support grid */}
                <div className=' grid grid-cols-5 gap-3 h-[150px]'>
                  <div className='flex flex-col gap-4 items-center justify-center bg-[#8A9DA229] rounded-lg p-5'>
                    <FaRocket className='text-3xl text-[#06263D]' />
                    <span className='text-[#333333] text-xl font-medium text-center'>Get Started</span>
                  </div>
                  <div className='flex flex-col gap-4 items-center justify-center bg-[#8A9DA229] rounded-lg p-5'>
                    <BiSolidNotepad className='text-3xl text-[#06263D]' />
                    <span className='text-[#333333] text-xl font-medium text-center'>Project Management</span>
                  </div>
                  <div className='flex flex-col gap-4 items-center justify-center bg-[#8A9DA229] rounded-lg p-5'>
                    <FaUsers className='text-3xl text-[#06263D]' />
                    <span className='text-[#333333] text-xl font-medium text-center'>Team
                      Collaboration</span>
                  </div>
                  <div className='flex flex-col gap-4 items-center justify-center bg-[#8A9DA229] rounded-lg p-5'>
                    <FaRocket className='text-3xl text-[#06263D]' />
                    <span className='text-[#333333] text-xl font-medium text-center'>Integrations</span>
                  </div>
                  <div className='flex flex-col gap-4 items-center justify-center bg-[#8A9DA229] rounded-lg p-5'>
                    <RiUserSettingsFill className='text-3xl text-[#06263D]' />
                    <span className='text-[#333333] text-xl font-medium text-center'>Account
                      Settings</span>
                  </div>
                </div>
                {/* contact us */}
                <div className='flex flex-col gap-5'>
                  <span className='text-[#438197] text-base font-medium'>Contact Us</span>
                  <div className='flex items-center justify-between border-b border-gray-200 pt-10 pb-10'>
                    <div className='flex flex-col gap-2'>
                      <span className='text-[#333333] text-base font-medium'>Support Email</span>
                      <span className='text-[#999999] text-sm font-medium'>example@v-accel.ai</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <span className='text-[#333333] text-base font-medium'>Helpline</span>
                      <span className='text-[#999999] text-sm font-medium'>91-8976542435</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <span className='text-[#333333] text-base font-medium'>Toll-free number</span>
                      <span className='text-[#999999] text-sm font-medium'>1800 7654 3345</span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <span className='text-[#438197] text-base font-medium'>FAQs</span>
                  <div className='flex items-center justify-between'>

                    <div className='flex flex-col gap-5'>
                      <div className='flex items-center justify-between text-[#333333] text-base font-medium'>
                        How do I reset my password?
                      </div>
                      <div className='text-[#999999] text-sm font-medium' >
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna aliqua ed do eiusmodeiusmodconsectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna
                        eiusmod ed do eiusmod
                      </div>
                    </div>
                    <IoIosArrowDown className='text-2xl text-[#06263D]' />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}