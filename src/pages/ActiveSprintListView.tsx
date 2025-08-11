import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '@/components/ProjectHeader';

// Image assets from Figma design
const imgGroup = "/icons/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgStreamlineFlexDashboard3 = "/icons/19558319ea945b979494611aee69f1a69fdd5ed5.svg";
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
const imgEllipse243 = "http://localhost:3845/assets/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const imgEllipse244 = "http://localhost:3845/assets/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const imgEllipse245 = "http://localhost:3845/assets/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const imgEllipse246 = "http://localhost:3845/assets/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const imgEllipse247 = "http://localhost:3845/assets/f373c72d51af21d02977bea40bdb4a1d38533f48.png";
const imgEllipse242 = "http://localhost:3845/assets/e8ca84c111215893799dd1a1575ed9277e36a0ed.png";
const imgLogo = "http://localhost:3845/assets/b84b5d40d2b309aeb74557c18f9c8aee107bb331.svg";
const imgIconamoonArrowUp2Light = "http://localhost:3845/assets/6da921a9801912b57d27cdefe8385059e7ddd31a.svg";
const imgEllipse10 = "http://localhost:3845/assets/88364341615089b24b27f35494b0b95acb2276c1.svg";
const imgGroup1 = "http://localhost:3845/assets/fe5ff0a6cc4ccdea2f38da4d6baf3716def90e5c.svg";
const imgGroup1984077193 = "http://localhost:3845/assets/c1b6d222986627b36f13ba42ac2e73da7b39c04a.svg";
const imgGroup2 = "http://localhost:3845/assets/e56e056d80f3538d5ece29278399adf7a83f00f8.svg";
const imgMageFilter = "http://localhost:3845/assets/eb541e44da29796a676123f07dd6a6b02f8f359b.svg";
const imgGroup3 = "http://localhost:3845/assets/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgSiDashboardFill = "http://localhost:3845/assets/5ac3c5615fbd1cad010f0b75903f41f026f896e6.svg";
const imgPhKanbanFill = "http://localhost:3845/assets/e2ce8adfcd886987cce0123d57e63e02541a1d0d.svg";
const imgLine35 = "http://localhost:3845/assets/81ce532d0a0d98f2326d579d1a3f2e96926b2b05.svg";
const imgSubtract = "http://localhost:3845/assets/1dbd1f8e058554c0de78294c5b16c7d70ee9bbd8.svg";
const imgPajamasCollapseLeft = "http://localhost:3845/assets/28a69ae95d5ba66094af1375314dbb52a710a84e.svg";
const img = "http://localhost:3845/assets/ebf941e488128d66d349845b389b3ee78ee00cf9.svg";
const imgPhKanbanFill1 = "http://localhost:3845/assets/fdfd6519ff8dc5acdbb6048589d6921fea71cbe8.svg";
const imgProiconsTaskList = "http://localhost:3845/assets/935666228f191e7eff80fb57543eff5c627baebf.svg";
const imgFontistoDate = "http://localhost:3845/assets/bce17fdf9a51ff413188a2e607f8b8803f6fae97.svg";
const imgMynauiChartGantt = "http://localhost:3845/assets/e178fe15f264f6b933e72ff0d92acfdb728a5346.svg";
const imgIconamoonArrowUp2Fill = "http://localhost:3845/assets/ea7ccfc7f4c1db6d820507da0151b38b5af4695e.svg";
const imgEllipse3246 = "http://localhost:3845/assets/57b4ed4c8b84a1622fb3b235fb5a9ea11a143525.svg";
const imgCheckbox = "http://localhost:3845/assets/484f69df9df67da437dce6a99dec51bda11e52e3.svg";
const imgSort = "http://localhost:3845/assets/ae9b26c0db33897d1028a0b109c9d4161dbffe08.svg";
const imgIcRoundPlus = "http://localhost:3845/assets/2dacb29c8f36b60ecfa6a998e2b28744ffd4e1dd.svg";
const imgQlementineIconsDrag16 = "http://localhost:3845/assets/949547e3a890827325725733994a0ad4dcde1080.svg";
const imgMdiBugOutline = "http://localhost:3845/assets/78243820230748e1536afa6524861dc16102acd5.svg";
const imgSolarMenuDotsBold = "http://localhost:3845/assets/8a979a8cdfa677b78d2d6aa2adaa2593f7446dfa.svg";
const imgGroup2087324184 = "http://localhost:3845/assets/4624d36e15d8dca29ca65c268b1ef1dd374aac1e.svg";
const imgGroup4 = "http://localhost:3845/assets/ae53b5edffe92853938be68d9643cc569c527ca2.svg";
const imgLucideSortDesc = "http://localhost:3845/assets/9d83a8d7e9a88e769a7429c861aa53a5c092b1c5.svg";
const imgFluentGroup24Regular = "http://localhost:3845/assets/c66d9c4f0de85cf008c34c3ad437fa008be564db.svg";
const imgFluentArrowSprint20Filled1 = "http://localhost:3845/assets/73f802ab897d9a51d1c751ca20d91a3752bdac65.svg";
const imgEllipse3247 = "http://localhost:3845/assets/cebfe28422e12c731ee3640d638a6bc51febc0e0.svg";
const imgFluentPeopleTeam16Regular = "/icons/f626b26b7a59007334b99699a973c47adb5c30df.svg";
const imgMdiReportBoxMultipleOutline = "/icons/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg";
const imgCodiconDebugStepBack = "/icons/25d9978e6ee520adcae953bb81971ba680eb074e.svg";
const imgFluentArrowSprint20Filled = "/icons/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";

export default function ActiveSprintListView() {
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
        navigate('/team');
        break;
      case 'report':
        navigate('/report');
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-[#f6f6f6] min-h-screen w-full">
      {/* Project Header */}
      <ProjectHeader 
        projectName="Example project name"
        activeTab="sprint"
        onTabChange={handleTabClick}
      />

      {/* View Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-medium text-[#06263d]">
            List View / Sort by status
          </h2>
          <div className="flex items-center">
            <img alt="count" className="w-7 h-7" src={imgEllipse3247} />
            <span className="text-base font-medium text-white ml-1">22</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#67909b] rounded-lg p-2.5">
              <img alt="search" className="w-4 h-4" src={imgGroup4} />
            </div>
            <div className="bg-[#67909b] rounded-lg p-2.5">
              <img alt="sort" className="w-4 h-4" src={imgLucideSortDesc} />
            </div>
            <div className="bg-[#67909b] rounded-lg p-2.5">
              <img alt="group" className="w-4 h-4" src={imgFluentGroup24Regular} />
            </div>
            <div className="bg-[#67909b] rounded-lg p-2.5">
              <img alt="sprint" className="w-4 h-4" src={imgFluentArrowSprint20Filled1} />
            </div>
          </div>
          <button className="bg-[#67909b] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Complete Sprint
          </button>
        </div>
      </div>

      {/* Status Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* To-Do Column */}
        <div className="bg-white rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <div className="rotate-180">
                <img alt="arrow" className="w-6 h-6" src={imgIconamoonArrowUp2Fill} />
              </div>
              <h3 className="text-2xl font-medium text-[#06263d]">To-Do</h3>
            </div>
            <div className="flex items-center">
              <img alt="count" className="w-7 h-7" src={imgEllipse3246} />
              <span className="text-base font-medium text-white ml-1">2</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-[rgba(103,144,155,0.06)] rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-4">
                  <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-medium text-[#252525]">Type</span>
                    <img alt="sort" className="w-6 h-6" src={imgSort} />
                  </div>
                </div>
                <span className="text-xl font-medium text-[#252525]">Issue Title</span>
              </div>
              <div className="flex items-center gap-15">
                <span className="text-xl font-medium text-[#252525]">Assign to</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Status</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Priority</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525] text-right">Due date</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <span className="text-xl font-medium text-[#252525] text-center">Action</span>
              </div>
            </div>
          </div>

          {/* Task Rows */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img alt="drag" className="w-6 h-6" src={imgQlementineIconsDrag16} />
                <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-xs text-[#666666]">TA – 117</span>
                </div>
                <span className="text-base font-medium text-[#252525]">Publish blog page</span>
              </div>
              <div className="flex items-center gap-28">
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-12">
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-4">
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                        </div>
                        <span className="text-xs font-medium text-[#333333]">24+</span>
                      </div>
                      <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1">
                        <span className="text-sm font-medium text-[#8a96f7]">To-do</span>
                      </div>
                    </div>
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1">
                      <span className="text-sm font-medium text-[#d58d49]">Low</span>
                    </div>
                  </div>
                  <span className="text-base font-medium text-[#e52828]">Dec 5</span>
                </div>
                <img alt="menu" className="w-6 h-6" src={imgSolarMenuDotsBold} />
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div className="flex justify-end">
            <div className="bg-[#67909b] rounded-lg p-2">
              <img alt="plus" className="w-6 h-6" src={imgIcRoundPlus} />
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-white rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <div className="rotate-180">
                <img alt="arrow" className="w-6 h-6" src={imgIconamoonArrowUp2Fill} />
              </div>
              <h3 className="text-2xl font-medium text-[#06263d]">In progress</h3>
            </div>
            <div className="flex items-center">
              <img alt="count" className="w-7 h-7" src={imgEllipse3246} />
              <span className="text-base font-medium text-white ml-1">2</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-[rgba(103,144,155,0.06)] rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-4">
                  <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-medium text-[#252525]">Type</span>
                    <img alt="sort" className="w-6 h-6" src={imgSort} />
                  </div>
                </div>
                <span className="text-xl font-medium text-[#252525]">Issue Title</span>
              </div>
              <div className="flex items-center gap-15">
                <span className="text-xl font-medium text-[#252525]">Assign to</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Status</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Priority</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525] text-right">Due date</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <span className="text-xl font-medium text-[#252525] text-center">Action</span>
              </div>
            </div>
          </div>

          {/* Task Rows */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img alt="drag" className="w-6 h-6" src={imgQlementineIconsDrag16} />
                <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-xs text-[#666666]">TA – 117</span>
                </div>
                <span className="text-base font-medium text-[#252525]">Publish blog page</span>
              </div>
              <div className="flex items-center gap-28">
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-12">
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-4">
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                        </div>
                        <span className="text-xs font-medium text-[#333333]">24+</span>
                      </div>
                      <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1">
                        <span className="text-sm font-medium text-[#8a96f7]">To-do</span>
                      </div>
                    </div>
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1">
                      <span className="text-sm font-medium text-[#d58d49]">Low</span>
                    </div>
                  </div>
                  <span className="text-base font-medium text-[#e52828]">Dec 5</span>
                </div>
                <img alt="menu" className="w-6 h-6" src={imgSolarMenuDotsBold} />
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div className="flex justify-end">
            <div className="bg-[#67909b] rounded-lg p-2">
              <img alt="plus" className="w-6 h-6" src={imgIcRoundPlus} />
            </div>
          </div>
        </div>

        {/* In Review Column */}
        <div className="bg-white rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <div className="rotate-180">
                <img alt="arrow" className="w-6 h-6" src={imgIconamoonArrowUp2Fill} />
              </div>
              <h3 className="text-2xl font-medium text-[#06263d]">In review</h3>
            </div>
            <div className="flex items-center">
              <img alt="count" className="w-7 h-7" src={imgEllipse3246} />
              <span className="text-base font-medium text-white ml-1">2</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-[rgba(103,144,155,0.06)] rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-4">
                  <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-medium text-[#252525]">Type</span>
                    <img alt="sort" className="w-6 h-6" src={imgSort} />
                  </div>
                </div>
                <span className="text-xl font-medium text-[#252525]">Issue Title</span>
              </div>
              <div className="flex items-center gap-15">
                <span className="text-xl font-medium text-[#252525]">Assign to</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Status</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Priority</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525] text-right">Due date</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <span className="text-xl font-medium text-[#252525] text-center">Action</span>
              </div>
            </div>
          </div>

          {/* Task Rows */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img alt="drag" className="w-6 h-6" src={imgQlementineIconsDrag16} />
                <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-xs text-[#666666]">TA – 117</span>
                </div>
                <span className="text-base font-medium text-[#252525]">Publish blog page</span>
              </div>
              <div className="flex items-center gap-28">
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-12">
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-4">
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                        </div>
                        <span className="text-xs font-medium text-[#333333]">24+</span>
                      </div>
                      <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1">
                        <span className="text-sm font-medium text-[#8a96f7]">To-do</span>
                      </div>
                    </div>
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1">
                      <span className="text-sm font-medium text-[#d58d49]">Low</span>
                    </div>
                  </div>
                  <span className="text-base font-medium text-[#e52828]">Dec 5</span>
                </div>
                <img alt="menu" className="w-6 h-6" src={imgSolarMenuDotsBold} />
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div className="flex justify-end">
            <div className="bg-[#67909b] rounded-lg p-2">
              <img alt="plus" className="w-6 h-6" src={imgIcRoundPlus} />
            </div>
          </div>
        </div>

        {/* Done Column */}
        <div className="bg-white rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <div className="rotate-180">
                <img alt="arrow" className="w-6 h-6" src={imgIconamoonArrowUp2Fill} />
              </div>
              <h3 className="text-2xl font-medium text-[#06263d]">Done</h3>
            </div>
            <div className="flex items-center">
              <img alt="count" className="w-7 h-7" src={imgEllipse3246} />
              <span className="text-base font-medium text-white ml-1">2</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-[rgba(103,144,155,0.06)] rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-4">
                  <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-medium text-[#252525]">Type</span>
                    <img alt="sort" className="w-6 h-6" src={imgSort} />
                  </div>
                </div>
                <span className="text-xl font-medium text-[#252525]">Issue Title</span>
              </div>
              <div className="flex items-center gap-15">
                <span className="text-xl font-medium text-[#252525]">Assign to</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Status</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525]">Priority</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-medium text-[#252525] text-right">Due date</span>
                  <img alt="sort" className="w-6 h-6" src={imgSort} />
                </div>
                <span className="text-xl font-medium text-[#252525] text-center">Action</span>
              </div>
            </div>
          </div>

          {/* Task Rows */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img alt="drag" className="w-6 h-6" src={imgQlementineIconsDrag16} />
                <img alt="checkbox" className="w-6 h-6" src={imgCheckbox} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-xs text-[#666666]">TA – 117</span>
                </div>
                <span className="text-base font-medium text-[#252525]">Publish blog page</span>
              </div>
              <div className="flex items-center gap-28">
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-12">
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-4">
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                          <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                        </div>
                        <span className="text-xs font-medium text-[#333333]">24+</span>
                      </div>
                      <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1">
                        <span className="text-sm font-medium text-[#8a96f7]">To-do</span>
                      </div>
                    </div>
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1">
                      <span className="text-sm font-medium text-[#d58d49]">Low</span>
                    </div>
                  </div>
                  <span className="text-base font-medium text-[#e52828]">Dec 5</span>
                </div>
                <img alt="menu" className="w-6 h-6" src={imgSolarMenuDotsBold} />
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div className="flex justify-end">
            <div className="bg-[#67909b] rounded-lg p-2">
              <img alt="plus" className="w-6 h-6" src={imgIcRoundPlus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 