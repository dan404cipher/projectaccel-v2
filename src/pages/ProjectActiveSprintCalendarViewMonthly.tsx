import React from 'react';

// Image assets from Figma design
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
const imgEllipse245 = "http://localhost:3845/assets/1efce360d87b30ec2db1ba5e95388c3502cc66c6.png";
const imgEllipse246 = "http://localhost:3845/assets/b94cbf9ca3ce5a6d134ced526a2197b6b290c90c.png";
const imgEllipse244 = "http://localhost:3845/assets/932056fe0cc72a47b303bd6b183bcc20755f5c8e.png";
const imgEllipse243 = "http://localhost:3845/assets/c7374a205af6c39cb14588865e1611624cac1281.png";
const imgEllipse242 = "http://localhost:3845/assets/5af926273c9ffbf23e40c05e69d6e90ad16fff56.png";
const imgEllipse247 = "http://localhost:3845/assets/5e8ebfd479625e19c8c0d4ccd07ec2ee8f85c2b1.png";
const imgEllipse248 = "http://localhost:3845/assets/65acd653f46481876bc40a06844f7f3f0b39dbf2.png";
const imgMessageImage = "http://localhost:3845/assets/549adedaf6a08fe46ca55b8b2789450fdcafc1a2.png";
const imgMessageImage1 = "http://localhost:3845/assets/1b7c25c56f183dc719d5d91114093d609877bc2b.png";
const imgEllipse7 = "http://localhost:3845/assets/32eef709333eab5ca6f1bb879fca0056155b730c.png";
const imgEllipse249 = "http://localhost:3845/assets/0eb3dcf08305ae1724f0b9ff7621fdfc2a3178e9.png";
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
const imgLine41 = "http://localhost:3845/assets/c34c596b2c930059301a2acb7b587763b151c07e.svg";
const imgLine42 = "http://localhost:3845/assets/82de0f23bcefa253abdc2eabfb7ce7676a0c2e27.svg";
const imgGroup3 = "http://localhost:3845/assets/ae8ffd5049056fe261298ef9e97b82b6e3f2a4ae.svg";
const imgSolarFilterBroken = "http://localhost:3845/assets/37ac6255a9f6071e9df7eaea53f150b0cd36ff76.svg";
const imgMynauiPinSolid = "http://localhost:3845/assets/37be3726d8402ee7df6efba359d420b55f097eaf.svg";
const imgHugeiconsTickDouble02 = "http://localhost:3845/assets/a10e7cc827f99603e363b717f127038ef150ed4f.svg";
const imgAttachIconContainer = "http://localhost:3845/assets/a307e05b9217f0cafcbcd25c60dfb4127b761c9f.svg";
const imgEmojiIconContainer = "http://localhost:3845/assets/b23f5c51ab0282839e2bf2520fd43b3f82e78327.svg";
const imgMynauiSend = "http://localhost:3845/assets/5b6a776035db12f45e9b6a4d06ed6321404d301c.svg";
const imgSolarMenuDotsBold = "http://localhost:3845/assets/4c464bcabafe4d5a0292de628e2232311b09bad2.svg";

export default function ProjectActiveSprintCalendarViewMonthly() {
  return (
    <div className="bg-[#f6f6f6] relative size-full min-h-screen">
      {/* Top Bar */}
      <div className="absolute backdrop-blur-[50px] backdrop-filter bg-[#c0ced2] flex flex-row gap-[425px] h-[88px] items-center justify-start left-6 px-10 py-4 rounded-[100px] top-6 w-[1680px]">
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
        <div className="absolute font-medium leading-[0] left-7 text-[#5a5a5a] text-[14px] text-left text-nowrap top-[282px] uppercase">
          <p className="block leading-[normal] whitespace-pre">RECENT</p>
        </div>
      </div>

      {/* Main Background */}
      <div className="absolute bg-[#ffffff] h-[957px] left-[304px] rounded-3xl top-[136px] w-[956px]" />
      
      {/* Side Navigation Background */}
      <div className="absolute bg-[#ffffff] h-[957px] left-[1284px] rounded-3xl top-[136px] w-[420px]" />

      {/* Channel Info Container */}
      <div className="absolute flex flex-row gap-[67px] items-center justify-start left-[1300px] p-0 top-40">
        <div className="bg-[#67909b] flex flex-row gap-3 items-center justify-start px-4 py-2 relative rounded-3xl shadow-[0px_4px_8px_0px_rgba(6,38,61,0.16)] shrink-0">
          <div className="font-medium leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Channel</p>
          </div>
          <div className="inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="bg-[#ffffff] h-8 ml-0 mt-0 rounded-2xl shadow-[2px_4px_4px_0px_rgba(6,38,61,0.16)] w-[72px]" />
            <div className="font-medium h-4 ml-[35.942px] mt-2 relative text-[#06263d] text-[14px] text-center translate-x-[-50%] w-[51.878px]">
              <p className="block leading-[normal]">Chat</p>
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
            <div className="font-medium leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Unread</p>
            </div>
            <div className="bg-[#c0ced2] flex flex-col gap-2.5 items-center justify-center px-1 py-0 relative rounded-[100px] shrink-0 size-5">
              <div className="font-normal leading-[0] relative shrink-0 text-[#06263d] text-[8px] text-center text-nowrap">
                <p className="block leading-[normal] whitespace-pre">99+</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0">
          <div className="inline-grid place-items-start relative shrink-0">
            <div className="bg-[#67909b] ml-0 mt-0 rounded-lg size-8" />
            <div className="ml-2 mt-2 overflow-clip relative size-4">
              <div className="absolute bottom-[13.11%] left-[8.33%] right-[13.11%] top-[8.33%]">
                <div className="absolute inset-[-3.98%]">
                  <img alt="search" className="block max-w-none size-full" src={imgGroup3} />
                </div>
              </div>
            </div>
          </div>
          <div className="inline-grid place-items-start relative shrink-0">
            <div className="bg-[#67909b] ml-0 mt-0 rounded-lg size-8" />
            <div className="ml-2 mt-2 relative size-4">
              <img alt="filter" className="block max-w-none size-full" src={imgSolarFilterBroken} />
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="absolute flex flex-row gap-4 items-center justify-start left-[1300px] p-0 top-60">
        <div className="relative shrink-0 size-[50px]">
          <img alt="user-avatar" className="block max-w-none size-full" height="50" src={imgEllipse245} width="50" />
        </div>
        <div className="flex flex-row gap-[86px] items-center justify-start p-0 relative shrink-0">
          <div className="capitalize flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-[175px]">
            <div className="relative shrink-0 text-[#333333] text-[14px] w-full">
              <p className="block leading-[normal]">Example name</p>
            </div>
            <div className="relative shrink-0 text-[#666666] text-[12px] w-full">
              <p className="block leading-[normal]">Lorum ipsum dqnilds hueasjinhi</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end justify-center p-0 relative shrink-0 w-[61px]">
            <div className="font-medium leading-[0] lowercase min-w-full relative shrink-0 text-[#999999] text-[12px] text-left">
              <p className="block leading-[normal]">6 mins ago</p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
              <div className="relative shrink-0 size-4">
                <img alt="pin" className="block max-w-none size-full" src={imgMynauiPinSolid} />
              </div>
              <div className="bg-[#008000] flex flex-col gap-2.5 items-center justify-center px-1 py-0 relative rounded-[100px] shrink-0 size-4">
                <div className="font-medium leading-[0] relative shrink-0 text-[#ffffff] text-[10px] text-center w-full">
                  <p className="block leading-[normal]">4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More User List Items */}
      {[imgEllipse246, imgEllipse244, imgEllipse243, imgEllipse242, imgEllipse246, imgEllipse244, imgEllipse245].map((avatar, index) => (
        <div key={index} className={`absolute flex flex-row gap-4 items-center justify-start left-[1301px] p-0 w-[388px] ${index === 0 ? 'top-[427px]' : index === 1 ? 'top-[525px]' : index === 2 ? 'top-[623px]' : index === 3 ? 'top-[721px]' : index === 4 ? 'top-[819px]' : index === 5 ? 'top-[917px]' : 'top-[1015px]'}`}>
          <div className="relative shrink-0 size-[50px]">
            <img alt="user-avatar" className="block max-w-none size-full" height="50" src={avatar} width="50" />
          </div>
          <div className="flex flex-row gap-[86px] items-center justify-start p-0 relative shrink-0">
            <div className="capitalize flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-[175px]">
              <div className="relative shrink-0 text-[#333333] text-[14px] w-full">
                <p className="block leading-[normal]">Example name</p>
              </div>
              <div className="relative shrink-0 text-[#666666] text-[12px] w-full">
                <p className="block leading-[normal]">Lorum ipsum dqnilds hueasjinhi</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 h-[38px] items-end justify-start p-0 relative shrink-0 w-[61px]">
              <div className="font-medium leading-[0] lowercase relative shrink-0 text-[#999999] text-[12px] text-left w-full">
                <p className="block leading-[normal]">6 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Selected User Background */}
      <div className="absolute bg-[rgba(235,117,0,0.04)] h-[88px] left-[1284px] top-[314px] w-[420px]" />

      {/* Selected User */}
      <div className="absolute flex flex-row gap-4 items-center justify-start left-[1301px] p-0 top-[329px] w-[387px]">
        <div className="relative shrink-0 size-[50px]">
          <img alt="user-avatar" className="block max-w-none size-full" height="50" src={imgEllipse247} width="50" />
        </div>
        <div className="flex flex-row gap-[86px] items-center justify-start p-0 relative shrink-0 w-[321px]">
          <div className="capitalize flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-[175px]">
            <div className="relative shrink-0 text-[#333333] text-[14px] w-full">
              <p className="block leading-[normal]">Example name</p>
            </div>
            <div className="relative shrink-0 text-[#666666] text-[12px] w-full">
              <p className="block leading-[normal]">Lorum ipsum dqnilds hueasjinhi</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end justify-center p-0 relative shrink-0 w-[61px]">
            <div className="font-medium leading-[0] lowercase min-w-full relative shrink-0 text-[#999999] text-[12px] text-left">
              <p className="block leading-[normal]">6 mins ago</p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
              <div className="relative shrink-0 size-4">
                <img alt="pin" className="block max-w-none size-full" src={imgMynauiPinSolid} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="absolute flex flex-row gap-4 items-center justify-start left-[328px] p-0 top-[272px]">
        <div className="relative shrink-0 size-12">
          <img alt="user-avatar" className="block max-w-none size-full" height="48" src={imgEllipse248} width="48" />
        </div>
        <div className="bg-[#fef9f5] flex flex-row gap-2.5 items-center justify-center p-[16px] relative rounded-bl-[4px] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[24px] shrink-0">
          <div className="font-medium leading-[0] relative shrink-0 text-[#666666] text-[14px] text-left text-nowrap tracking-[-0.28px]">
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-row gap-2 items-start justify-start left-[408px] p-0 top-[328px]">
        <div className="font-medium leading-[0] relative shrink-0 text-[#999999] text-[12px] text-left text-nowrap tracking-[-0.24px]">
          <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">6 mins ago </p>
        </div>
      </div>

      {/* More Messages */}
      <div className="absolute flex flex-row gap-4 items-center justify-start left-[328px] p-0 top-[478px]">
        <div className="relative shrink-0 size-12">
          <img alt="user-avatar" className="block max-w-none size-full" height="48" src={imgEllipse248} width="48" />
        </div>
        <div className="bg-[#fef9f5] flex flex-row gap-2.5 items-center justify-center p-[16px] relative rounded-bl-[4px] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[24px] shrink-0">
          <div className="font-medium leading-[0] relative shrink-0 text-[#666666] text-[14px] text-left text-nowrap tracking-[-0.28px]">
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
        </div>
      </div>

      {/* Image Messages */}
      <div className="absolute flex flex-row gap-4 items-start justify-start left-[328px] p-0 top-[580px]">
        <div className="relative shrink-0 size-12">
          <img alt="user-avatar" className="block max-w-none size-full" height="48" src={imgEllipse248} width="48" />
        </div>
        <div className="inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="bg-[#d9d9d9] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] h-[93px] ml-0 mt-0 rounded-lg w-[100px]" style={{ backgroundImage: `url('${imgMessageImage}')` }} />
          <div className="bg-[#d9d9d9] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] h-[94px] ml-[31px] mt-4 rounded-lg w-[101px]" style={{ backgroundImage: `url('${imgMessageImage1}')` }} />
        </div>
      </div>

      {/* Right Side Messages */}
      <div className="absolute flex flex-row gap-4 items-center justify-start left-[800px] p-0 top-[374px]">
        <div className="bg-[#f0f5f7] flex flex-row gap-2.5 items-center justify-center p-[16px] relative rounded-bl-[24px] rounded-br-[4px] rounded-tl-[24px] rounded-tr-[24px] shrink-0">
          <div className="font-medium leading-[0] relative shrink-0 text-[#666666] text-[14px] text-left text-nowrap tracking-[-0.28px]">
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
        </div>
        <div className="relative shrink-0 size-12">
          <img alt="user-avatar" className="block max-w-none size-full" height="48" src={imgEllipse7} width="48" />
        </div>
      </div>
      <div className="absolute flex flex-row gap-2 items-start justify-start left-[1075px] p-0 top-[430px]">
        <div className="relative shrink-0 size-4">
          <img alt="read" className="block max-w-none size-full" src={imgHugeiconsTickDouble02} />
        </div>
        <div className="font-medium leading-[0] relative shrink-0 text-[#999999] text-[12px] text-left text-nowrap tracking-[-0.24px]">
          <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">6 mins ago </p>
        </div>
      </div>

      {/* Message Input */}
      <div className="absolute bg-neutral-100 h-20 left-[328px] rounded-[88px] top-[965px] w-[908px]" />
      <div className="absolute flex flex-row gap-4 items-center justify-start left-[352px] p-0 translate-y-[-50%]" style={{ top: "calc(50% + 446.5px)" }}>
        <div className="flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
          <div className="relative shrink-0 size-8">
            <img alt="attach" className="block max-w-none size-full" loading="lazy" src={imgAttachIconContainer} />
          </div>
          <div className="relative shrink-0 size-8">
            <img alt="emoji" className="block max-w-none size-full" loading="lazy" src={imgEmojiIconContainer} />
          </div>
        </div>
        <div className="capitalize font-medium leading-[0] opacity-90 relative shrink-0 text-[#999999] text-[16px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Write your message...</p>
        </div>
      </div>
      <div className="absolute bg-[#06263d] flex flex-row gap-[100px] items-center justify-center left-[1156px] p-[8px] rounded-[100px] size-14 top-[977px]">
        <div className="relative shrink-0 size-6">
          <img alt="send" className="block max-w-none size-full" loading="lazy" src={imgMynauiSend} />
        </div>
      </div>

      {/* Message Header */}
      <div className="absolute bg-[#ffffff] h-28 left-[304px] rounded-tl-[24px] rounded-tr-[24px] top-[136px] w-[956px]">
        <div className="absolute border border-[rgba(103,144,155,0.16)] border-solid inset-0 pointer-events-none rounded-tl-[24px] rounded-tr-[24px]" aria-hidden="true" />
      </div>
      <div className="absolute flex flex-row gap-[607px] items-center justify-start left-[328px] p-0 top-40">
        <div className="flex flex-row gap-6 items-center justify-center p-0 relative shrink-0">
          <div className="relative shrink-0 size-16">
            <img alt="user-avatar" className="block max-w-none size-full" height="64" src={imgEllipse249} width="64" />
          </div>
          <div className="flex flex-col font-medium gap-1 items-start justify-center leading-[0] p-0 relative shrink-0 text-left text-nowrap">
            <div className="capitalize relative shrink-0 text-[#252525] text-[20px]">
              <p className="block leading-[normal] text-nowrap whitespace-pre">Example user name</p>
            </div>
            <div className="relative shrink-0 text-[#999999] text-[12px]">
              <p className="block leading-[normal] text-nowrap whitespace-pre">Active 24m ago</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 size-8">
          <img alt="menu" className="block max-w-none size-full" src={imgSolarMenuDotsBold} />
        </div>
      </div>
    </div>
  );
} 