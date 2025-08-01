import React from 'react';
import { Layout } from '@/components/layout/Layout';

// Image assets from Figma design
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
const img2 = "http://localhost:3845/assets/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "http://localhost:3845/assets/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "http://localhost:3845/assets/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "http://localhost:3845/assets/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "http://localhost:3845/assets/f373c72d51af21d02977bea40bdb4a1d38533f48.png";
const img7 = "http://localhost:3845/assets/e8ca84c111215893799dd1a1575ed9277e36a0ed.png";
const imgLogo = "http://localhost:3845/assets/b84b5d40d2b309aeb74557c18f9c8aee107bb331.svg";
const imgIconamoonArrowUp2Light = "http://localhost:3845/assets/6da921a9801912b57d27cdefe8385059e7ddd31a.svg";
const imgEllipse10 = "http://localhost:3845/assets/88364341615089b24b27f35494b0b95acb2276c1.svg";
const imgGroup = "http://localhost:3845/assets/93765e3060a5e02b5efd9ef1791db8c21fc953ef.svg";
const imgGroup1 = "http://localhost:3845/assets/fe5ff0a6cc4ccdea2f38da4d6baf3716def90e5c.svg";
const imgGroup1984077193 = "http://localhost:3845/assets/c1b6d222986627b36f13ba42ac2e73da7b39c04a.svg";
const imgGroup2 = "http://localhost:3845/assets/e56e056d80f3538d5ece29278399adf7a83f00f8.svg";
const imgMageFilter = "http://localhost:3845/assets/eb541e44da29796a676123f07dd6a6b02f8f359b.svg";
const imgGroup3 = "http://localhost:3845/assets/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgStreamlineFlexDashboard3 = "http://localhost:3845/assets/19558319ea945b979494611aee69f1a69fdd5ed5.svg";
const imgCodiconDebugStepBack = "http://localhost:3845/assets/25d9978e6ee520adcae953bb81971ba680eb074e.svg";
const imgFluentArrowSprint20Filled = "http://localhost:3845/assets/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";
const imgFluentPeopleTeam16Regular = "http://localhost:3845/assets/f626b26b7a59007334b99699a973c47adb5c30df.svg";
const imgMdiReportBoxMultipleOutline = "http://localhost:3845/assets/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg";
const imgLine35 = "http://localhost:3845/assets/97d1e99b3fd30737cdfd73a1cde46f84d96098b3.svg";
const imgSubtract = "http://localhost:3845/assets/1dbd1f8e058554c0de78294c5b16c7d70ee9bbd8.svg";
const imgPajamasCollapseLeft = "http://localhost:3845/assets/28a69ae95d5ba66094af1375314dbb52a710a84e.svg";
const img = "http://localhost:3845/assets/ebf941e488128d66d349845b389b3ee78ee00cf9.svg";
const img1 = "http://localhost:3845/assets/7c927e169f33a813536c75efc7a1f6a075bc7421.svg";
const img8 = "http://localhost:3845/assets/ac219d72c89e10b7410405a81fe6b233a9af6c93.svg";
const img9 = "http://localhost:3845/assets/ef171a17ec4b77b6976558bf1f15fe749eff8bf8.svg";
const img10 = "http://localhost:3845/assets/e8a93699b8544e8672ef16ceb053e08d13e6eb52.svg";
const img11 = "http://localhost:3845/assets/57b4ed4c8b84a1622fb3b235fb5a9ea11a143525.svg";
const img12 = "http://localhost:3845/assets/d01d29cf9c35b06aa948a0c0535a848ba4464c2c.svg";
const img13 = "http://localhost:3845/assets/149722239e4f250fb6e6a41ac7c710b29b5c0d7e.svg";
const img14 = "http://localhost:3845/assets/34f2994ec12d0a8dadde39d377898c6ab3b73cf3.svg";
const img15 = "http://localhost:3845/assets/16590fb1c2b55a11f570d67551f4b8115a2b0ecb.svg";
const img16 = "http://localhost:3845/assets/2a6f318b0e3a9ddd7bed3e99975de7c7cfdc1fa7.svg";
const imgGroup4 = "http://localhost:3845/assets/ae8ffd5049056fe261298ef9e97b82b6e3f2a4ae.svg";
const imgSolarFilterBroken = "http://localhost:3845/assets/37ac6255a9f6071e9df7eaea53f150b0cd36ff76.svg";
const imgLucideSortDesc = "http://localhost:3845/assets/b3c3c9bd0d2578ea02b628bf34cfc1821d5473a8.svg";
const imgEllipse3246 = "http://localhost:3845/assets/cebfe28422e12c731ee3640d638a6bc51febc0e0.svg";

export default function BacklogPrototype() {
  return (
    <Layout>
      <div className="bg-[#f6f6f6] relative min-h-screen w-full">
        {/* Project Header */}
        <div className="flex items-center gap-4 mb-6 px-6">
          <div className="flex items-center justify-center rotate-90">
            <div className="relative w-10 h-10">
              <img alt="arrow" className="w-full h-full" src={imgGroup3} />
            </div>
          </div>
          <h1 className="text-3xl font-medium text-[#438197]">
            Example project name
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-10 mb-8 px-6">
          <div className="flex items-center gap-2">
            <img alt="overview" className="w-6 h-6" src={imgStreamlineFlexDashboard3} />
            <span className="text-xl font-medium text-[#06263d]">Overview</span>
          </div>
          <div className="flex items-center gap-2">
            <img alt="backlog" className="w-6 h-6" src={imgCodiconDebugStepBack} />
            <span className="text-xl font-medium text-[#06263d]">Backlog</span>
          </div>
          <div className="flex items-center gap-2">
            <img alt="sprint" className="w-6 h-6" src={imgFluentArrowSprint20Filled} />
            <span className="text-xl font-medium text-[#06263d]">Active Sprint</span>
          </div>
          <div className="flex items-center gap-2">
            <img alt="team" className="w-6 h-6" src={imgFluentPeopleTeam16Regular} />
            <span className="text-xl font-medium text-[#06263d]">Team</span>
          </div>
          <div className="flex items-center gap-2">
            <img alt="report" className="w-6 h-6" src={imgMdiReportBoxMultipleOutline} />
            <span className="text-xl font-medium text-[#06263d]">Report</span>
          </div>
          {/* Active tab indicator */}
          <div className="absolute h-0.5 left-[461px] top-[258px] w-[105px]">
            <img alt="line" className="w-full h-full" src={imgLine35} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-[#f2f2f2] rounded-[40px] mx-6 p-8">
          {/* List View Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-medium text-[#06263d]">
                List View / Sort by status
              </h2>
              <div className="flex items-center gap-1">
                <div className="bg-[#438197] rounded-full w-7 h-7 flex items-center justify-center">
                  <span className="text-white text-base font-medium">22</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <div className="bg-[rgba(6,38,61,0.4)] rounded-lg w-8 h-8 flex items-center justify-center">
                <img alt="search" className="w-4 h-4" src={imgGroup4} />
              </div>
              <div className="bg-[rgba(6,38,61,0.4)] rounded-lg w-8 h-8 flex items-center justify-center">
                <img alt="filter" className="w-4 h-4" src={imgSolarFilterBroken} />
              </div>
              <div className="bg-[rgba(6,38,61,0.4)] rounded-lg w-8 h-8 flex items-center justify-center">
                <img alt="sort" className="w-4 h-4" src={imgLucideSortDesc} />
              </div>
            </div>
          </div>

          {/* Sprint Cards */}
          <div className="space-y-6">
            {/* Sprint 1 - Active */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6">
                      <img alt="checkbox" className="w-full h-full" src={img9} />
                    </button>
                    <button className="w-6 h-6 rotate-180">
                      <img alt="drag" className="w-full h-full" src={img10} />
                    </button>
                    <h3 className="text-2xl font-medium text-[#06263d]">SCRUM Sprint 1</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-[#438197] rounded-full w-7 h-7 flex items-center justify-center">
                      <span className="text-white text-base font-medium">4</span>
                    </div>
                  </div>
                </div>
                <span className="text-base text-[#838488]">01 Dec-07 Dec (3 issue items)</span>
              </div>

              {/* Complete Sprint Button */}
              <div className="flex justify-end mb-6">
                <button className="bg-[#06263d] text-white px-3 py-4 rounded-lg text-sm font-medium">
                  Complete Sprint
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 mb-4 text-xl font-medium text-[#252525]">
                <div>Type</div>
                <div>Issue Title</div>
                <div>Assign to</div>
                <div>Status</div>
                <div>Priority</div>
                <div className="text-right">Due date</div>
                <div className="text-center">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img7} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-right font-medium text-[#e52828]">Dec 5</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img7} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-right font-medium text-[#e52828]">Dec 6</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img7} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-right font-medium text-[#e52828]">Dec 5</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sprint 2 - Planned */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6">
                      <img alt="checkbox" className="w-full h-full" src={img9} />
                    </button>
                    <button className="w-6 h-6 rotate-180">
                      <img alt="drag" className="w-full h-full" src={img14} />
                    </button>
                    <h3 className="text-2xl font-medium text-[#06263d]">SCRUM Sprint 1</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-[#438197] rounded-full w-7 h-7 flex items-center justify-center">
                      <span className="text-white text-base font-medium">8</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="w-6 h-6">
                    <img alt="edit" className="w-full h-full" src={img15} />
                  </button>
                  <span className="text-base text-[#838488]">Add date (8 issues items)</span>
                </div>
              </div>

              {/* Start Sprint Button */}
              <div className="flex justify-end mb-6">
                <button className="bg-[#06263d] text-white px-3 py-4 rounded-lg text-sm font-medium">
                  Start Sprint
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 mb-4 text-xl font-medium text-[#252525]">
                <div>Type</div>
                <div>Issue Title</div>
                <div>Assign to</div>
                <div>Status</div>
                <div>Priority</div>
                <div className="text-right">Due date</div>
                <div className="text-center">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img7} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-right font-medium text-[#e52828]">Dec 5</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img7} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-right font-medium text-[#e52828]">Dec 5</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img7} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-right font-medium text-[#e52828]">Dec 5</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Backlog */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6">
                      <img alt="checkbox" className="w-full h-full" src={img9} />
                    </button>
                    <button className="w-6 h-6 rotate-180">
                      <img alt="drag" className="w-full h-full" src={img16} />
                    </button>
                    <h3 className="text-2xl font-medium text-[#06263d]">Backlog</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-[#438197] rounded-full w-7 h-7 flex items-center justify-center">
                      <span className="text-white text-base font-medium">9</span>
                    </div>
                  </div>
                </div>
                <span className="text-base text-[#838488]">(9 issues items)</span>
              </div>

              {/* Create Sprint Button */}
              <div className="flex justify-end mb-6">
                <button className="bg-[#06263d] text-white px-3 py-4 rounded-lg text-sm font-medium">
                  Create Sprint
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 mb-4 text-xl font-medium text-[#252525]">
                <div>Type</div>
                <div>Issue Title</div>
                <div>Assign to</div>
                <div>Status</div>
                <div>Priority</div>
                <div className="text-right">Due date</div>
                <div className="text-center">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-7 gap-4 items-center py-4">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={img1} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-3 py-2 rounded text-sm font-medium w-fit">
                    To-do
                  </div>
                  <div className="bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-3 py-2 rounded text-sm font-medium w-fit">
                    Low
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-6 h-6 rotate-90">
                      <img alt="menu" className="w-full h-full" src={img8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 