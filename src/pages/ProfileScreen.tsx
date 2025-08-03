import React from 'react';

// Image assets from Figma design
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
const imgEllipse7 = "http://localhost:3845/assets/50f8b17184fca272963c626c32761b37aac820b2.png";
const imgLogo = "http://localhost:3845/assets/b84b5d40d2b309aeb74557c18f9c8aee107bb331.svg";
const imgIconamoonArrowUp2Light = "http://localhost:3845/assets/6da921a9801912b57d27cdefe8385059e7ddd31a.svg";
const imgEllipse10 = "http://localhost:3845/assets/88364341615089b24b27f35494b0b95acb2276c1.svg";
const imgGroup = "http://localhost:3845/assets/93765e3060a5e02b5efd9ef1791db8c21fc953ef.svg";
const imgGroup1 = "http://localhost:3845/assets/fe5ff0a6cc4ccdea2f38da4d6baf3716def90e5c.svg";
const imgMessageIconBackground = "http://localhost:3845/assets/c1b6d222986627b36f13ba42ac2e73da7b39c04a.svg";
const imgGroup2 = "http://localhost:3845/assets/e56e056d80f3538d5ece29278399adf7a83f00f8.svg";
const imgMageFilter = "http://localhost:3845/assets/eb541e44da29796a676123f07dd6a6b02f8f359b.svg";
const imgSubtract = "http://localhost:3845/assets/1dbd1f8e058554c0de78294c5b16c7d70ee9bbd8.svg";
const imgPajamasCollapseLeft = "http://localhost:3845/assets/28a69ae95d5ba66094af1375314dbb52a710a84e.svg";
const img = "http://localhost:3845/assets/ebf941e488128d66d349845b389b3ee78ee00cf9.svg";
const imgLine27 = "http://localhost:3845/assets/5c5ae86a41b21741dd2c43b19c33de528f79bde9.svg";
const imgGroup3 = "http://localhost:3845/assets/c1ea5885faa1c48f0a7a339a1e769d839e95a97c.svg";
const imgMdiEyeOff = "http://localhost:3845/assets/51ba4a949894b271d0cbc4b065a262f9b956e3f5.svg";
const imgIconamoonProfileFill = "http://localhost:3845/assets/362ea8712774fd984d13d6a83388b333127ad1df.svg";
const imgGroup4 = "http://localhost:3845/assets/8c1e0a738a8e77ba75afd06a20e28703c82d36f4.svg";
const imgIcBaselineNotifications = "http://localhost:3845/assets/e2e3efe3ce7eb16f1c1a95c14e44ad3e15eff503.svg";
const imgMaterialSymbolsSupport = "http://localhost:3845/assets/6eeaabc1c5661897f4eb499490df41cad8c72684.svg";

export default function ProfileScreen() {
  return (
    <div className="bg-[#f6f6f6] relative size-full min-h-screen">
      {/* Top Bar */}
      <div className="absolute backdrop-blur-[50px] backdrop-filter bg-[#c0ced2] flex flex-row gap-[425px] h-[88px] items-center justify-start left-1/2 px-10 py-4 rounded-[100px] top-6 translate-x-[-50%] w-[1680px]">
        {/* Logo and Workspace */}
        <div className="flex flex-row gap-10 items-center justify-start p-0 relative shrink-0 w-[414px]">
          <div className="h-5 relative shrink-0 w-[110px]">
            <img alt="logo" className="block max-w-none size-full" src={imgLogo} />
          </div>
          <div className="inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="bg-[rgba(255,255,255,0.07)] h-12 ml-0 mt-0 relative rounded-[100px] w-[264px]">
              <div className="absolute flex flex-row gap-[42px] items-center justify-start left-6 p-0 top-3">
                <div className="capitalize font-medium leading-[0] relative shrink-0 text-[#06263d] text-[20px] text-left text-nowrap">
                  <p className="block leading-[normal] whitespace-pre">Workspace name</p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg]">
                    <div className="relative size-6">
                      <img alt="arrow" className="block max-w-none size-full" src={imgIconamoonArrowUp2Light} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="absolute flex flex-row gap-6 items-start justify-center left-[1275px] p-0 top-1/2 translate-y-[-50%]">
          <div className="flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
            {/* AI Icon */}
            <div className="relative shrink-0 size-12">
              <div className="absolute contents left-0 top-0">
                <div className="absolute left-0 size-12 top-0">
                  <div className="absolute bottom-[-25%] left-[-16.67%] right-[-16.67%] top-[-8.33%]">
                    <img alt="ai-bg" className="block max-w-none size-full" src={imgEllipse10} />
                  </div>
                </div>
                <div className="absolute left-1/2 overflow-clip size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div className="absolute bottom-[0.77%] left-[8.73%] right-[8.33%] top-[8.33%]">
                    <img alt="ai-icon" className="block max-w-none size-full" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Icon */}
            <div className="relative shrink-0 size-12">
              <div className="absolute contents left-0 top-0">
                <div className="absolute left-0 size-12 top-0">
                  <div className="absolute bottom-[-25%] left-[-16.67%] right-[-16.67%] top-[-8.33%]">
                    <img alt="notification-bg" className="block max-w-none size-full" src={imgEllipse10} />
                  </div>
                </div>
                <div className="absolute left-1/2 overflow-clip size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div className="absolute bottom-[5.22%] left-[9.38%] right-[5.2%] top-[5.21%]">
                    <img alt="notification-icon" className="block max-w-none size-full" src={imgGroup1} />
                  </div>
                </div>
              </div>
            </div>

            {/* Message Icon */}
            <div className="relative shrink-0 size-12">
              <div className="absolute left-0 size-12 top-0">
                <div className="absolute bottom-[-25%] left-[-16.67%] right-[-16.67%] top-[-8.33%]">
                  <img alt="message-bg" className="block max-w-none size-full" src={imgMessageIconBackground} />
                </div>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-[#ffffff] flex flex-row gap-2.5 items-center justify-start pl-2 pr-4 py-[5px] relative rounded-3xl shrink-0">
            <div className="relative shrink-0 size-[38px]">
              <div className="absolute bottom-[-26.32%] left-[-15.79%] right-[-15.79%] top-[-5.26%]">
                <img alt="user-avatar" className="block max-w-none size-full" height="50" src={imgEllipse3226} width="50" />
              </div>
            </div>
            <div className="flex flex-row gap-3.5 items-center justify-start p-0 relative shrink-0">
              <div className="flex flex-col gap-1 items-start justify-center leading-[0] p-0 relative shrink-0 text-left text-nowrap">
                <div className="relative shrink-0 text-[#292d32] text-[14px]">
                  <p className="block leading-[normal] text-nowrap whitespace-pre">Lisa</p>
                </div>
                <div className="relative shrink-0 text-[12px] text-[rgba(41,45,50,0.44)]">
                  <p className="block leading-[normal] text-nowrap whitespace-pre">Prodcut manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-[#ffffff] h-12 relative rounded-[100px] shrink-0 w-[356px]">
          <div className="absolute flex flex-row gap-4 items-center justify-center left-6 p-0 top-3">
            <div className="overflow-clip relative shrink-0 size-6">
              <div className="absolute bottom-[13.11%] left-[8.33%] right-[13.11%] top-[8.33%]">
                <div className="absolute inset-[-7.07%]">
                  <img alt="search-icon" className="block max-w-none size-full" src={imgGroup2} />
                </div>
              </div>
            </div>
            <div className="font-normal leading-[0] lowercase relative shrink-0 text-[#999999] text-[16px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">search for anything...</p>
            </div>
          </div>
          <div className="absolute left-[308px] size-6 top-3">
            <img alt="filter-icon" className="block max-w-none size-full" src={imgMageFilter} />
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute h-[957px] left-6 top-[136px] w-60">
        <div className="absolute h-[957px] left-0 top-0 w-60">
          <img alt="sidebar-bg" className="block max-w-none size-full" src={imgSubtract} />
        </div>
        
        {/* Collapse Icon */}
        <div className="absolute bg-[#c0ced2] flex flex-row gap-2.5 items-center justify-center left-[218px] p-[8px] rounded-[20px] size-10 top-[477px]">
          <div className="relative shrink-0 size-4">
            <img alt="collapse" className="block max-w-none size-full" loading="lazy" src={imgPajamasCollapseLeft} />
          </div>
        </div>

        {/* Dashboard */}
        <div className="absolute flex flex-row gap-4 items-center justify-start left-7 px-2 py-0.5 rounded-lg top-[98px]">
          <div className="relative shrink-0 size-6">
            <div className="absolute inset-0 overflow-clip">
              <div className="absolute left-1/2 size-[14.4px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className="absolute inset-[-6.25%]">
                  <img alt="dashboard-icon" className="block max-w-none size-full" src={img} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start p-0 relative shrink-0">
            <div className="font-semibold leading-[0] relative shrink-0 text-[#06263d] text-[18px] text-left w-[165px]">
              <p className="block leading-[normal]">Dash Board</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="absolute flex flex-row gap-4 items-center justify-center left-7 px-2 py-0.5 rounded-lg top-[174px]">
          <div className="relative shrink-0 size-6">
            <div className="absolute inset-0 overflow-clip">
              <div className="absolute left-1/2 size-[14.4px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className="absolute inset-[-6.25%]">
                  <img alt="projects-icon" className="block max-w-none size-full" src={img} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start p-0 relative shrink-0">
            <div className="font-semibold leading-[0] relative shrink-0 text-[#06263d] text-[18px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Projects</p>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="absolute flex flex-col gap-4 items-start justify-start left-7 p-0 top-[325px] w-[171px]">
          <div className="flex flex-row gap-4 items-center justify-center px-2 py-0.5 relative rounded-lg shrink-0">
            <div className="relative shrink-0 size-6">
              <div className="absolute inset-0 overflow-clip">
                <div className="absolute left-1/2 size-[14.4px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div className="absolute inset-[-6.25%]">
                    <img alt="project-icon" className="block max-w-none size-full" src={img} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start p-0 relative shrink-0">
              <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[16px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">Ricemill Portal</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center px-2 py-0.5 relative rounded-lg shrink-0 w-full">
            <div className="relative shrink-0 size-6">
              <div className="absolute inset-0 overflow-clip">
                <div className="absolute left-1/2 size-[14.4px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div className="absolute inset-[-6.25%]">
                    <img alt="project-icon" className="block max-w-none size-full" src={img} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start p-0 relative shrink-0">
              <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[16px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">V-accel Website</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center px-2 py-0.5 relative rounded-lg shrink-0">
            <div className="relative shrink-0 size-6">
              <div className="absolute inset-0 overflow-clip">
                <div className="absolute left-1/2 size-[14.4px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div className="absolute inset-[-6.25%]">
                    <img alt="project-icon" className="block max-w-none size-full" src={img} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start p-0 relative shrink-0">
              <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[16px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">Hire-accel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Labels */}
        <div className="absolute font-medium leading-[0] left-[29px] text-[#5a5a5a] text-[14px] text-left text-nowrap top-10">
          <p className="block leading-[normal] whitespace-pre">MANAGE</p>
        </div>
        <div className="absolute font-medium leading-[0] left-7 text-[#5a5a5a] text-[14px] text-left text-nowrap top-[282px]">
          <p className="block leading-[normal] whitespace-pre">RECENT</p>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="absolute flex h-[0px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[0px]" style={{ top: "calc(50% + 55px)", left: "calc(50% - 167px)" }}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[955px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
              <img alt="divider" className="block max-w-none size-full" src={imgLine27} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute flex flex-col gap-14 items-center justify-start left-[785px] p-0 top-[200px] w-[800px]">
        <div className="flex flex-col gap-12 items-start justify-start p-0 relative shrink-0 w-full">
          {/* Personal Information Section */}
          <div className="flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#438197] text-[32px] text-left w-full">
              <p className="block leading-[1.4]">Personal Information</p>
            </div>
            <div className="flex flex-row gap-[139px] items-center justify-start p-0 relative shrink-0 w-full">
              <div className="flex flex-row gap-10 items-start justify-start p-0 relative shrink-0">
                <div className="relative shrink-0 size-[100px]">
                  <div className="absolute left-0 size-[100px] top-0">
                    <img alt="profile-avatar" className="block max-w-none size-full" height="100" src={imgEllipse7} width="100" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[321px]">
                  <div className="flex flex-row font-medium gap-8 items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap w-full">
                    <div className="flex flex-col justify-center relative shrink-0 text-[#252525] text-[24px] text-left">
                      <p className="block leading-[1.4] text-nowrap whitespace-pre">Developer Name </p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0 text-[#666666] text-[16px] text-center">
                      <p className="block leading-[1.4] text-nowrap whitespace-pre">EMPID-VA1087</p>
                    </div>
                  </div>
                  <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-center w-36">
                    <div className="flex flex-col justify-center min-w-full relative shrink-0 text-[#333333] text-[16px]" style={{ width: "min-content" }}>
                      <p className="block leading-[1.4]">Front end Developer</p>
                    </div>
                    <div className="flex flex-col justify-center relative shrink-0 text-[#666666] text-[14px] text-nowrap">
                      <p className="block leading-[1.4] whitespace-pre">example@v-accel.ai</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2.5 h-[60px] items-center justify-center px-[200px] py-4 relative rounded-lg shrink-0 w-[200px]">
                <div className="absolute border border-[#06263d] border-solid inset-0 pointer-events-none rounded-lg" aria-hidden="true" />
                <div className="flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-8">
                    <div className="absolute bottom-[16.67%] left-[16.67%] right-[12.5%] top-[15.95%]">
                      <div className="absolute bottom-[-2.32%] left-[-2.21%] right-[-2.21%] top-[-2.32%]">
                        <img alt="edit-icon" className="block max-w-none size-full" src={imgGroup3} />
                      </div>
                    </div>
                  </div>
                  <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[20px] text-center text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Edit Avatar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-full">
              <div className="flex flex-col justify-center relative shrink-0 text-[#333333] text-[24px] w-full">
                <p className="block leading-[1.4]">Change Password</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] w-full">
                <p className="block leading-[1.4]">Select your preferred language for a personalized experience</p>
              </div>
            </div>
            
            {/* Password Fields */}
            <div className="bg-[#ffffff] flex flex-row gap-[322px] h-20 items-center justify-start px-12 py-2 relative rounded-lg shrink-0 w-[800px]">
              <div className="capitalize font-medium h-6 leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[20px] text-left w-[358px]">
                <p className="block leading-[normal]">Current Password</p>
              </div>
              <div className="relative shrink-0 size-6">
                <img alt="eye-off" className="block max-w-none size-full" src={imgMdiEyeOff} />
              </div>
            </div>
            
            <div className="bg-[#ffffff] flex flex-row gap-[322px] h-20 items-center justify-start px-12 py-2 relative rounded-lg shrink-0 w-full">
              <div className="capitalize font-medium h-6 leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[20px] text-left w-[358px]">
                <p className="block leading-[normal]">Change Password</p>
              </div>
              <div className="relative shrink-0 size-6">
                <img alt="eye-off" className="block max-w-none size-full" loading="lazy" src={imgMdiEyeOff} />
              </div>
            </div>
            
            <div className="bg-[#ffffff] flex flex-row gap-[322px] h-20 items-center justify-start px-12 py-2 relative rounded-lg shrink-0 w-full">
              <div className="capitalize font-medium h-6 leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[20px] text-left w-[358px]">
                <p className="block leading-[normal]">Confirm Password</p>
              </div>
              <div className="relative shrink-0 size-6">
                <img alt="eye-off" className="block max-w-none size-full" loading="lazy" src={imgMdiEyeOff} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="bg-[#06263d] flex flex-row gap-2.5 h-[60px] items-center justify-center px-[200px] py-4 relative rounded-lg shrink-0 w-[200px]">
          <div className="flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
            <div className="font-medium leading-[0] relative shrink-0 text-[#ffffff] text-[24px] text-center text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Save changes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="absolute contents left-[344px] top-[228px]">
        <div className="absolute flex h-[0px] items-center justify-center left-[344px] top-[228px] w-[0px]">
          <div className="flex-none rotate-[90deg]">
            <div className="bg-[#06263d] h-2 rounded-[40px] w-8" />
          </div>
        </div>
        <div className="absolute flex flex-col gap-[63px] items-start justify-start left-[368px] p-0 top-[228px] w-[241px]">
          {/* Profile */}
          <div className="flex flex-row gap-[37px] items-center justify-start p-0 relative shrink-0">
            <div className="relative shrink-0 size-8">
              <img alt="profile-icon" className="block max-w-none size-full" src={imgIconamoonProfileFill} />
            </div>
            <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Profile </p>
            </div>
          </div>
          
          {/* Preference */}
          <div className="flex flex-row gap-10 items-center justify-start p-0 relative shrink-0">
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg]">
                <div className="overflow-clip relative size-8">
                  <div className="absolute inset-[11.458%]">
                    <div className="absolute inset-[-5.068%]">
                      <img alt="theme-icon" className="block max-w-none size-full" src={imgGroup4} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-medium leading-[0] relative shrink-0 text-[#8a9da2] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Preference</p>
            </div>
          </div>
          
          {/* Notification */}
          <div className="flex flex-row gap-10 items-center justify-start p-0 relative shrink-0">
            <div className="relative shrink-0 size-8">
              <img alt="notification-icon" className="block max-w-none size-full" src={imgIcBaselineNotifications} />
            </div>
            <div className="font-medium leading-[0] relative shrink-0 text-[#8a9da2] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Notification</p>
            </div>
          </div>
          
          {/* Help & Support */}
          <div className="flex flex-row gap-10 items-center justify-start p-0 relative shrink-0 w-full">
            <div className="relative shrink-0 size-8">
              <img alt="support-icon" className="block max-w-none size-full" src={imgMaterialSymbolsSupport} />
            </div>
            <div className="font-medium leading-[0] relative shrink-0 text-[#8a9da2] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Help & support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 