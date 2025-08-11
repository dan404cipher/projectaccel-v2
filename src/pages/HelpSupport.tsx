import React, { useState } from 'react';
import ProjectHeader from '@/components/ProjectHeader';
import { useNavigate } from 'react-router-dom';

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
const imgGroup3 = "http://localhost:3845/assets/8c1e0a738a8e77ba75afd06a20e28703c82d36f4.svg";
const imgIcBaselineNotifications = "http://localhost:3845/assets/e2e3efe3ce7eb16f1c1a95c14e44ad3e15eff503.svg";
const imgMaterialSymbolsSupport = "http://localhost:3845/assets/e81aa0c13207a01d63a376b00c6d07d2a8a8d5df.svg";
const imgStreamlineStartupSolid = "http://localhost:3845/assets/e369db08b3ba1e7938ac5e18d029e624d2ae6a2c.svg";
const imgEosIconsProject = "http://localhost:3845/assets/aaf9bd805b3bb3fc08e153f1af5fa4e714cb07a6.svg";
const imgRiTeamFill = "http://localhost:3845/assets/3f74201c412174b0de14e20005d70d669847e832.svg";
const imgGroup4 = "http://localhost:3845/assets/45b4d0494d875a1d8c05e8ca614f03e2ce9323e4.svg";
const imgMaterialSymbolsSettingsAccountBoxRounded = "http://localhost:3845/assets/f4ea32ef1b24a1d804f8e9ddc9f1b019e7e5492d.svg";
const imgLine29 = "http://localhost:3845/assets/f3369ba62f7af4a5086c46f25c50b53a6700ed80.svg";
const imgIconamoonArrowUp2Light1 = "http://localhost:3845/assets/051a4f22b6dad27a6b0f727f9cd989a94a2d3876.svg";
const imgIconamoonArrowUp2Light2 = "http://localhost:3845/assets/54c9878d42c56271b44ecbadb09991b493ba770e.svg";
const imgGroup1984077195 = "http://localhost:3845/assets/55a2cc886712fb7ac0be0b2139d55e7ebf391a07.svg";

export const HelpSupport = () => {
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'overview':
        navigate('/project-overview');
        break;
      case 'backlog':
        navigate('/backlog');
        break;
      case 'sprint':
        navigate('/active-sprint');
        break;
      case 'team':
        navigate('/project-team');
        break;
      case 'report':
        navigate('/report');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-[#f6f6f6] relative size-full min-h-screen">
{/* Project Header */}
    <ProjectHeader projectName="Example project name" activeTab="report" onTabChange={handleTabClick}/>
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
        <div className="absolute flex h-[0px] items-center justify-center left-[344px] top-[513px] w-[0px]">
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
            <div className="font-medium leading-[0] relative shrink-0 text-[#06263d] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Help & support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Icon */}
      <div className="absolute flex flex-row items-center justify-between left-[785px] p-0 top-[191px] w-[800px]">
        <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#438197] text-[32px] text-left text-nowrap">
          <p className="block leading-[1.4] whitespace-pre">Help & Support</p>
        </div>
        <div className="relative shrink-0 size-10">
          <div className="absolute bottom-[-30%] left-[-20%] right-[-20%] top-[-10%]">
            <img alt="support-icon" className="block max-w-none size-full" src={imgGroup1984077195} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute bg-[#ffffff] flex flex-row gap-[322px] h-20 items-center justify-start left-[785px] px-12 py-2 rounded-lg top-[268px] w-[800px]">
        <div className="capitalize font-medium h-6 leading-[0] opacity-90 relative shrink-0 text-[#5a5a5a] text-[20px] text-left w-[358px]">
          <p className="block leading-[normal]">How can we help you?</p>
        </div>
      </div>

      {/* Help Categories */}
      <div className="absolute flex flex-row gap-6 items-center justify-start leading-[0] left-[785px] p-0 top-[380px]">
        {/* Getting Started */}
        <div className="inline-grid place-items-start relative shrink-0">
          <div className="bg-[rgba(138,157,162,0.16)] ml-0 mt-0 rounded-2xl size-[140px]" />
          <div className="flex flex-col gap-6 h-[85.867px] items-center justify-center ml-[6.533px] mt-[27.067px] p-0 relative w-[126.933px]">
            <div className="relative shrink-0 size-10">
              <img alt="startup-icon" className="block max-w-none size-full" src={imgStreamlineStartupSolid} />
            </div>
            <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#333333] text-[16px] text-left text-nowrap">
              <p className="block leading-[1.4] whitespace-pre">Getting Started</p>
            </div>
          </div>
        </div>

        {/* Project Management */}
        <div className="inline-grid place-items-start relative shrink-0">
          <div className="bg-[rgba(138,157,162,0.16)] ml-0 mt-0 rounded-2xl size-[140px]" />
          <div className="flex flex-col gap-6 h-28 items-center justify-center ml-[14.934px] mt-3.5 p-0 relative w-[111.067px]">
            <div className="relative shrink-0 size-10">
              <img alt="project-icon" className="block max-w-none size-full" src={imgEosIconsProject} />
            </div>
            <div className="flex flex-col font-medium justify-center leading-[1.4] relative shrink-0 text-[#333333] text-[16px] text-center text-nowrap whitespace-pre">
              <p className="block mb-0">Project</p>
              <p className="block">Management</p>
            </div>
          </div>
        </div>

        {/* Team Collaboration */}
        <div className="inline-grid place-items-start relative shrink-0">
          <div className="bg-[rgba(138,157,162,0.16)] ml-0 mt-0 rounded-2xl size-[140px]" />
          <div className="flex flex-col gap-6 items-center justify-center ml-3.5 mt-3.5 p-0 relative size-28">
            <div className="relative shrink-0 size-10">
              <img alt="team-icon" className="block max-w-none size-full" src={imgRiTeamFill} />
            </div>
            <div className="flex flex-col font-medium justify-center leading-[1.4] relative shrink-0 text-[#333333] text-[16px] text-center text-nowrap whitespace-pre">
              <p className="block mb-0">Team</p>
              <p className="block">Collaboration</p>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="inline-grid place-items-start relative shrink-0">
          <div className="bg-[rgba(138,157,162,0.16)] ml-0 mt-0 rounded-2xl size-[140px]" />
          <div className="flex flex-col gap-6 h-[85.867px] items-center justify-center ml-[19.6px] mt-[27.067px] p-0 relative w-[100.8px]">
            <div className="overflow-clip relative shrink-0 size-10">
              <div className="absolute inset-[8.333%]">
                <div className="absolute inset-[-5%]">
                  <img alt="connect-icon" className="block max-w-none size-full" src={imgGroup4} />
                </div>
              </div>
            </div>
            <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#333333] text-[16px] text-left text-nowrap">
              <p className="block leading-[1.4] whitespace-pre">Integrations</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="inline-grid place-items-start relative shrink-0">
          <div className="ml-0 mt-0 relative size-[140px]">
            <div className="absolute bg-[rgba(138,157,162,0.16)] left-0 rounded-2xl size-[140px] top-0" />
          </div>
          <div className="flex flex-col gap-6 h-[100.8px] items-center justify-center ml-[42.467px] mt-[19.598px] p-0 relative w-14">
            <div className="relative shrink-0 size-10">
              <img alt="settings-icon" className="block max-w-none size-full" src={imgMaterialSymbolsSettingsAccountBoxRounded} />
            </div>
            <div className="flex flex-col font-medium justify-center leading-[1.4] relative shrink-0 text-[#333333] text-[16px] text-left text-nowrap whitespace-pre">
              <p className="block mb-0">Account</p>
              <p className="block">Settings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and FAQs Section */}
      <div className="absolute flex flex-col gap-8 items-start justify-start left-[785px] p-0 top-[552px] w-[800.003px]">
        {/* Contact Us */}
        <div className="flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-[800.003px]">
          <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-medium justify-center leading-[0] min-w-full relative shrink-0 text-[#438197] text-[24px] text-left" style={{ width: "min-content" }}>
              <p className="block leading-[1.4]">Contact us</p>
            </div>
            <div className="flex flex-row gap-[120px] items-center justify-start p-0 relative shrink-0">
              {/* Support Email */}
              <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-[139px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#666666] text-[20px] w-full">
                  <p className="block leading-[1.4]">Support Email</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] tracking-[-0.32px] w-full">
                  <p className="block leading-[24px]">example@v-accel.ai</p>
                </div>
              </div>

              {/* Helpline */}
              <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-[111px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#666666] text-[20px] w-full">
                  <p className="block leading-[1.4]">Helpline </p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] tracking-[-0.32px] w-full">
                  <p className="block leading-[24px]">91-8976542435</p>
                </div>
              </div>

              {/* Toll-free number */}
              <div className="flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap w-[149px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#666666] text-[20px]">
                  <p className="block leading-[1.4] text-nowrap whitespace-pre">Toll-free number</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#999999] text-[16px] tracking-[-0.32px]">
                  <p className="block leading-[24px] text-nowrap whitespace-pre">1800 7654 3345</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
              <img alt="divider" className="block max-w-none size-full" loading="lazy" src={imgLine29} />
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-[800.003px]">
          <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#438197] text-[24px] text-left w-full">
            <p className="block leading-[1.4]">FAQs</p>
          </div>
          <div className="flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0 w-full">
            {/* Expanded FAQ */}
            <div className="flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[800.003px]">
              <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left w-full">
                <p className="block leading-[1.4]">How do I reset my password?</p>
              </div>
              <div className="flex flex-row gap-2 items-center justify-end p-0 relative shrink-0 w-full">
                <div className="basis-0 flex flex-col font-medium grow justify-center leading-[24px] min-h-px min-w-px relative shrink-0 text-[#999999] text-[16px] text-left tracking-[-0.32px]">
                  <p className="block mb-0">
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna aliqua ed do eiusmodeiusmodconsectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna
                  </p>
                  <p className="block">eiusmod ed do eiusmod </p>
                </div>
                <div className="relative shrink-0 size-8">
                  <img alt="arrow-up" className="block max-w-none size-full" loading="lazy" src={imgIconamoonArrowUp2Light1} />
                </div>
              </div>
            </div>

            {/* Collapsed FAQs */}
            <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
                  <img alt="divider" className="block max-w-none size-full" loading="lazy" src={imgLine29} />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left w-[767px]">
                  <p className="block leading-[1.4]">How do I reset my password?</p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg]">
                    <div className="relative size-8">
                      <img alt="arrow-down" className="block max-w-none size-full" loading="lazy" src={imgIconamoonArrowUp2Light2} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
                  <img alt="divider" className="block max-w-none size-full" loading="lazy" src={imgLine29} />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#666666] text-[20px] text-left w-[767px]">
                  <p className="block leading-[1.4]">Can I duplicate a task or project?</p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg]">
                    <div className="relative size-8">
                      <img alt="arrow-down" className="block max-w-none size-full" loading="lazy" src={imgIconamoonArrowUp2Light2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}