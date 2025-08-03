import React from 'react';

// Image assets from Figma design
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
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
const imgIconamoonProfileFill = "http://localhost:3845/assets/487e0f12c53c81dc91fd660664c6c5cd0ee500be.svg";
const imgGroup3 = "http://localhost:3845/assets/3cd577c12abd53bfa8c66f4cccbe1761c00f5303.svg";
const imgIcBaselineNotifications = "http://localhost:3845/assets/e2e3efe3ce7eb16f1c1a95c14e44ad3e15eff503.svg";
const imgMaterialSymbolsSupport = "http://localhost:3845/assets/6eeaabc1c5661897f4eb499490df41cad8c72684.svg";
const imgIconamoonArrowUp2Light1 = "http://localhost:3845/assets/54c9878d42c56271b44ecbadb09991b493ba770e.svg";
const imgFrame1984077829 = "http://localhost:3845/assets/fc4e83c326b639c9733fe775961f661393fd16b5.svg";
const imgGroup2087324115 = "http://localhost:3845/assets/26b5fcd6c33ad322e5e4d00ca9b740b215133eab.svg";
const imgGroup2087324113 = "http://localhost:3845/assets/08de2c2927055866b8fac7a27ae2e93aed98f5b6.svg";
const imgGroup2087324112 = "http://localhost:3845/assets/a87ce7e3585ed86e5a67adeca96af0595fbd1aee.svg";
const imgGroup2087324111 = "http://localhost:3845/assets/09c4f0c2f66afa44d8019234d8276346724f92d3.svg";
const imgGroup2087324114 = "http://localhost:3845/assets/21569b691b198f04da7e89b398827e08b079c1e6.svg";
const imgGroup2087324110 = "http://localhost:3845/assets/03c47e4ee16bd4bbd82dbad0550f674401ad0c30.svg";

export default function PreferenceScreen() {
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

      {/* Settings Navigation */}
      <div className="absolute contents left-[344px] top-[228px]">
        <div className="absolute flex h-[0px] items-center justify-center left-[344px] top-[323px] w-[0px]">
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
            <div className="font-medium leading-[0] relative shrink-0 text-[#8a9da2] text-[24px] text-left text-nowrap">
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
                      <img alt="theme-icon" className="block max-w-none size-full" src={imgGroup3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[24px] text-left text-nowrap">
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

      {/* Main Content */}
      <div className="absolute flex flex-col gap-8 items-start justify-start left-[785px] p-0 top-[200px] w-[800px]">
        <div className="flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
          {/* Title */}
          <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#438197] text-[32px] text-left w-full">
            <p className="block leading-[1.4]">Preference</p>
          </div>

          {/* Language & Region Section */}
          <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-full">
              <div className="flex flex-col justify-center relative shrink-0 text-[#333333] text-[24px] w-full">
                <p className="block leading-[1.4]">Language & Region</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] w-full">
                <p className="block leading-[1.4]">Select your preferred language & region for a personalized experience</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Language Dropdown */}
              <div className="bg-[#ffffff] flex flex-row gap-[322px] h-20 items-center justify-start px-12 py-2 relative rounded-lg shrink-0 w-full">
                <div className="capitalize font-medium h-6 leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[20px] text-left w-[358px]">
                  <p className="block leading-[normal]">English</p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg]">
                    <div className="relative size-8">
                      <img alt="dropdown-arrow" className="block max-w-none size-full" src={imgIconamoonArrowUp2Light1} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timezone Dropdown */}
              <div className="bg-[#ffffff] flex flex-row gap-[322px] h-20 items-center justify-start px-12 py-2 relative rounded-lg shrink-0 w-full">
                <div className="capitalize font-medium h-6 leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[20px] text-left w-[358px]">
                  <p className="block leading-[normal]">Timezone</p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg]">
                    <div className="relative size-8">
                      <img alt="dropdown-arrow" className="block max-w-none size-full" src={imgIconamoonArrowUp2Light1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Themes Section */}
        <div className="flex flex-col gap-[42px] items-start justify-start p-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-full">
              <div className="flex flex-col justify-center relative shrink-0 text-[#333333] text-[24px] w-full">
                <p className="block leading-[1.4]">Themes</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] w-full">
                <p className="block leading-[1.4]">Select your preferred theme for a personalized experience</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Light Mode Toggle */}
              <div className="flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left text-nowrap">
                  <p className="block leading-[1.4] whitespace-pre">Light mode</p>
                </div>
                <div className="h-8 relative shrink-0 w-16">
                  <img alt="toggle-switch" className="block max-w-none size-full" loading="lazy" src={imgFrame1984077829} />
                </div>
              </div>
              
              {/* Customize Theme */}
              <div className="flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left text-nowrap">
                  <p className="block leading-[1.4] whitespace-pre">Customize your theme</p>
                </div>
                <div className="flex flex-row items-center justify-start pl-0 pr-4 py-0 relative shrink-0">
                  <div className="flex h-[0px] items-center justify-center mr-[-16px] relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[303.317deg]">
                      <div className="h-[32.001px] relative w-[31.999px]">
                        <img alt="color-palette" className="block max-w-none size-full" loading="lazy" src={imgGroup2087324115} />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[0px] items-center justify-center mr-[-16px] relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[303.317deg]">
                      <div className="h-[32.001px] relative w-[31.999px]">
                        <img alt="color-palette" className="block max-w-none size-full" loading="lazy" src={imgGroup2087324113} />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[0px] items-center justify-center mr-[-16px] relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[303.317deg]">
                      <div className="h-[32.001px] relative w-[31.999px]">
                        <img alt="color-palette" className="block max-w-none size-full" loading="lazy" src={imgGroup2087324112} />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[0px] items-center justify-center mr-[-16px] relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[303.317deg]">
                      <div className="h-[32.001px] relative w-[31.999px]">
                        <img alt="color-palette" className="block max-w-none size-full" loading="lazy" src={imgGroup2087324111} />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[0px] items-center justify-center mr-[-16px] relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[303.317deg]">
                      <div className="h-[32.001px] relative w-[31.999px]">
                        <img alt="color-palette" className="block max-w-none size-full" loading="lazy" src={imgGroup2087324114} />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[0px] items-center justify-center mr-[-16px] relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[303.317deg]">
                      <div className="h-[31.999px] relative w-[32px]">
                        <img alt="color-palette" className="block max-w-none size-full" loading="lazy" src={imgGroup2087324110} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-full">
              <div className="flex flex-col justify-center relative shrink-0 text-[#333333] text-[24px] w-full">
                <p className="block leading-[1.4]">Accessibility</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] w-full">
                <p className="block leading-[1.4]">Select your preferred Font size & contrast for your accessibility</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Font Size Toggle */}
              <div className="flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left text-nowrap">
                  <p className="block leading-[1.4] whitespace-pre">Font size</p>
                </div>
                <div className="bg-[rgba(103,144,155,0.2)] h-8 overflow-clip relative rounded-[50px] shrink-0 w-16">
                  <div className="absolute bg-[#67909b] bottom-[12.5%] left-[6.25%] right-[56.25%] rounded-[50px] top-[12.5%]" />
                  <div className="absolute bottom-[28.13%] flex flex-col font-medium justify-center leading-[0] left-[14.06%] right-[65.63%] text-[#ffffff] text-[10px] text-left text-nowrap top-[28.13%]">
                    <p className="block leading-[1.4] whitespace-pre">Aa</p>
                  </div>
                  <div className="absolute bottom-[15.63%] flex flex-col font-medium justify-center leading-[0] left-[60.94%] right-[7.81%] text-[#ffffff] text-[16px] text-left text-nowrap top-[15.63%]">
                    <p className="block leading-[1.4] whitespace-pre">Aa</p>
                  </div>
                </div>
              </div>
              
              {/* Increase Contrast Toggle */}
              <div className="flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left text-nowrap">
                  <p className="block leading-[1.4] whitespace-pre">Increase contrast</p>
                </div>
                <div className="bg-[rgba(103,144,155,0.2)] h-8 overflow-clip relative rounded-[50px] shrink-0 w-16">
                  <div className="absolute bg-[#67909b] bottom-[12.5%] left-[6.25%] right-[56.25%] rounded-[50px] top-[12.5%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 