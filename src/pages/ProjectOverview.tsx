import ProjectHeader from '@/components/ProjectHeader';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Image assets from Figma design
const imgEllipse3226 = "/icons/afcdad76e6a54041bae78e7f511725140b74e504.png";
const imgEllipse253 = "/icons/d8855d46b4ca8d554ac739a63c3e1e89d0338f9b.png";
const imgGroup = "/icons/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgStreamlineFlexDashboard3 = "/icons/19558319ea945b979494611aee69f1a69fdd5ed5.svg";
const imgCodiconDebugStepBack = "/icons/25d9978e6ee520adcae953bb81971ba680eb074e.svg";
const imgFluentArrowSprint20Filled = "/icons/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";
const imgFluentPeopleTeam16Regular = "/icons/f626b26b7a59007334b99699a973c47adb5c30df.svg";
const imgMdiReportBoxMultipleOutline = "/icons/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg";
const imgLine35 = "/icons/ff763058e78f480e18495760226f55a6a4170ae7.svg";
const imgLogo = "/icons/b84b5d40d2b309aeb74557c18f9c8aee107bb331.svg";
const imgIconamoonArrowUp2Light = "/icons/6da921a9801912b57d27cdefe8385059e7ddd31a.svg";
const imgEllipse10 = "/icons/88364341615089b24b27f35494b0b95acb2276c1.svg";
const imgGroup1 = "/icons/93765e3060a5e02b5efd9ef1791db8c21fc953ef.svg";
const imgGroup2 = "/icons/fe5ff0a6cc4ccdea2f38da4d6baf3716def90e5c.svg";
const imgMessageIconBackground = "/icons/c1b6d222986627b36f13ba42ac2e73da7b39c04a.svg";
const imgGroup3 = "/icons/e56e056d80f3538d5ece29278399adf7a83f00f8.svg";
const imgMageFilter = "/icons/eb541e44da29796a676123f07dd6a6b02f8f359b.svg";
const imgSubtract = "/icons/b327141dae44e7995f7d12061dd5a9b43aab3414.svg";
const imgPajamasCollapseLeft = "/icons/28a69ae95d5ba66094af1375314dbb52a710a84e.svg";
const img = "/icons/ebf941e488128d66d349845b389b3ee78ee00cf9.svg";
const imgSvg = "/icons/c2a1e586581c82bed930644fd4eaca8c9130d64e.svg";
const imgSvg1 = "/icons/5ba67feb4e6393f83f45a6c3927d037c8ff64d47.svg";
const imgSvg2 = "/icons/c7ac791e9ae2e4e80e98ae2787bc34c7734cc7c3.svg";
const imgSvg3 = "/icons/bbb66184b2a69291b2550dcfdc611cf2bfde48c1.svg";
const imgVector = "/icons/c9ceda3dc02924c9de4a2a2970264ec45673831a.svg";
const imgVector1 = "/icons/8e301df61d7412a255e458bcb392d90fbf0acb41.svg";
const imgFrame = "/icons/85f404089e4c76dbb6afd12446c847cb2c4ff454.svg";
const imgVector2 = "/icons/008bfc8c1a6860f58a85fd842ae8dba028cd6272.svg";
const imgGroup4 = "/icons/c08ee9139dd071349301785030c6d8a0e87b8bb0.svg";
const imgVector3 = "/icons/07b244d954bb063cf01d2bc8113d07f2d6b65571.svg";
const imgGroup5 = "/icons/a41ecf40a931b1f3d6c9e37e89358660fdc2992a.svg";
const imgOuterGauge = "/icons/111ff2b9f098193df368234df74d181d10eca161.svg";
const imgOuterGauge1 = "/icons/34ea38747bd8736ccf235f30840add7b9a4fe6e7.svg";
const imgOuterGauge2 = "/icons/accf871dab0296ae2da19bea8b5944bcd8d87f1c.svg";
const imgInnerGauge = "/icons/f700ccadedaf5c1a6799adb1cdd2bc8ed465e7d8.svg";
const imgInnerGauge1 = "/icons/eba861cc92a738cf0f6f4904ec09c4b1b3565909.svg";
const imgEllipse224 = "/icons/3a3d313dafd9a313929584fdac85bd4c25ddc0b9.svg";
const imgEllipse226 = "/icons/7f2cc763a4577335058f60051d7ce82096840ab9.svg";
const imgEllipse225 = "/icons/6315ee4f54188ff6a8b277aac4b7e53154ff641e.svg";
const imgEllipse227 = "/icons/248b513e4b78be17d2cebeabad2987f886cc96af.svg";
const imgEllipse228 = "/icons/f8371daf7e98049d36143d37c3caedaa74521ccf.svg";
const imgFrame1116606892 = "/icons/b63376883b493ac6599d9111001d0af46a8188ff.svg";
const imgMdiBugOutline = "/icons/cb2280d66195675cdb1a349a2b097f5c140ee578.svg";
const imgOuterGauge3 = "/icons/417bc3fd035d98fbabc03f97bfa0f46bce3c714f.svg";
const imgOuterGauge4 = "/icons/90b855cf7fce5f7dd85806071994c5415c6801e9.svg";
const imgInnerGauge2 = "/icons/a976ce3a82fe812691e607fb385a67a6ec15f09e.svg";
const imgInnerGauge3 = "/icons/23e17ef3dc449082d7438cc807375878f1d45ac5.svg";
const imgSvg4 = "/icons/78a8838b2392e76890de1d56e7b515d79a43a5cc.svg";
const imgWpfFuture = "/icons/01a06071bb00def338f2533eed5ebf44a16d3045.svg";
const imgCarbonInProgress = "/icons/3b16109919bcae82cf9ff5f486a76d077ae275f0.svg";
const imgSvg5 = "/icons/8195f6590487dccda43e1e1714733a9cd7d8479e.svg";
const imgIconamoonArrowUp2Light1 = "/icons/15ff4a3150f197d39be974b92800df3f319ff4b1.svg";
const imgGroup6 = "/icons/9cb9f2be749342706830efbbe85b166a64c76fd7.svg";
const imgGroup7 = "/icons/504a7a0baa897b66ac1a4c88da48aac0b989bdaa.svg";
const imgGroup8 = "/icons/82deb81e3eef438001922077aa7d43d7bf79187e.svg";
const imgGroup9 = "/icons/e85114409db77ee55744fd84562bd7e692601dff.svg";
const imgGroup10 = "/icons/4c82b0b38344b33d2066107134803de5278a9d18.svg";
const imgGroup11 = "/icons/87eaedc398216b76d32c747599045a8fd13a17ec.svg";
const imgGroup12 = "/icons/2e62acc852e98b3ca2558c7a72fc264b7c422af5.svg";
const img1 = "/icons/8a7d4b4b21492d0ec001ebd95f4256a86ef91fe8.svg";
const imgMdiBugOutline1 = "/icons/9f4c79e42dfabb21660012f2284298e6c121684f.svg";
const imgFluentStack48Regular = "/icons/bcbcc632e11139b74644e0e08b64f512c5c72a40.svg";
const imgFluentAttach28Regular = "/icons/a187de8d0218ecc63f62e32ee0d5f0e858f37e03.svg";
const imgStashPlusSolid = "/icons/e28b8423897034bc83c4d67baaf1d5c49f0ddb20.svg";
const imgLine43 = "/icons/cb242a4d6238c13aaf502dd5c6aec440a2c5202d.svg";
const imgSvg6 = "/icons/a28adb31099ee707512b5c31ffcc447b465cb104.svg";

export default function ProjectOverview() {
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
    <div className="bg-[#f6f6f6] h-screen w-full flex flex-col overflow-hidden">
      {/* Project Header - Fixed */}
     <ProjectHeader projectName='Example project name' activeTab='overview' onTabChange={handleTabClick}/>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 pt-2 pb-20">
        {/* Project Info Card */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-2xl font-bold text-[#438197]">
                  E-commerce Platform Redesign
                </h2>
                <div className="bg-[rgba(223,168,116,0.2)] px-2 py-0.5 rounded">
                  <span className="text-xs font-medium text-[#d58d49]">In progress</span>
                </div>
              </div>
              <p className="text-base text-zinc-500 mb-3">
                Client: <span className="text-[#333333]">TechCorp Industries</span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <img alt="calendar" className="w-3 h-3" src={imgSvg} />
                  <span className="text-xs text-zinc-500">Start: Jan 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="calendar" className="w-3 h-3" src={imgSvg1} />
                  <span className="text-xs text-zinc-500">Due: Apr 30, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="users" className="w-3 h-3" src={imgSvg2} />
                  <span className="text-xs text-zinc-500">8 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="progress" className="w-3 h-3" src={imgSvg3} />
                  <span className="text-xs text-zinc-500">68% complete</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-3">
                <div className="flex items-start justify-end gap-2">
                  <div className="text-right pb-4">
                    <p className="text-xs text-zinc-500">Project Manager</p>
                    <p className="text-sm font-medium text-zinc-950">Sarah Johnson</p>
                  </div>
                  <div className="bg-[#34559d] w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
                    SJ
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 ">
                  <span className="text-xs text-zinc-950">Overall Progress</span>
                  <span className="text-xs text-zinc-500">68%</span>
                </div>
                <div className="w-48 bg-[#ecf2f2] h-2 rounded-full">
                  <div className="bg-[#67909b] h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Unassigned Issues
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">4</div>
              <p className="text-xs text-[#999999]">Issues across projects</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Assigned Issues
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">44</div>
              <p className="text-xs text-[#999999]">Issues across projects</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              In progress
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">32</div>
              <p className="text-xs text-[#999999]">Currently being worked on</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Over Due Issues
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">5</div>
              <p className="text-xs text-[#999999]">Pending Beyond Deadline</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Completion Rate
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2a9d90] mb-1">32%</div>
              <p className="text-xs text-[#999999]">61 of 131 Issues completed</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
          {/* Types of Work Chart */}
          <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-medium text-[#252525] mb-1">Types of work</h3>
            <p className="text-sm text-[#999999] mb-4">Issues in all projects</p>
            <div className="flex items-center justify-center h-[168px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-xs">Epic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs">Task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-xs">Bug</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-xs">Story</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-medium text-[#252525] mb-1">Priority Breakdown</h3>
            <p className="text-sm text-[#999999] mb-4">Priority breakdown of all projects</p>
            <div className="flex items-center justify-center h-[168px]">
              <div className="text-center">
                <div className="text-2xl font-medium text-[#2a9d90] mb-2">32</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-xs">Highest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-xs">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded"></div>
                    <span className="text-xs">Lowest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Issues */}
          <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img alt="emergency" className="w-6 h-6" src={imgFrame1116606892} />
                <h3 className="text-lg font-medium text-[#252525]">Emerg Issues</h3>
              </div>
              <img alt="emergency" className="w-6 h-6" src={imgFrame1116606892} />
            </div>
            <div className="space-y-2 max-h-[168px] overflow-y-auto">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="bg-[#263238] w-4 h-4 rounded-full flex items-center justify-center">
                    <img alt="bug" className="w-2.5 h-2.5" src={imgMdiBugOutline} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#666666] mb-1">BG – 17</p>
                    <h4 className="text-sm font-medium text-[#333333] mb-1">
                      Login forgot password bugfix
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#999999] mb-1">
                      <span>Projects</span>
                      <span>Hire-Accel Portal</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#252525] mb-1">Time Left</p>
                      <div className="bg-[#c0ced2] h-4 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">{item === 1 ? '8 hrs' : item === 2 ? '10 hrs' : item === 3 ? '1 day' : '2 days'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Status Overview */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-medium text-[#242424] mb-4">Status Overview</h3>
            <div className="text-center">
              <div className="text-3xl font-medium text-[#2a9d90] mb-3">86</div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs">To-do</span>
                  <span className="text-xs font-bold">43</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-xs">In progress</span>
                  <span className="text-xs font-bold">12</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs">In review</span>
                  <span className="text-xs font-bold">3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs">Done</span>
                  <span className="text-xs font-bold">18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Overview */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-medium text-[#242424] mb-4">Team Overview</h3>
            <div className="space-y-3">
              {[
                { name: 'Alex Chen', role: 'Frontend Developer', color: '#67909b', initials: 'AC', status: 'online' },
                { name: 'Maria', role: 'Backend Developer', color: '#679b7c', initials: 'MR', status: 'online' },
                { name: 'David', role: 'UX Designer', color: '#7b679b', initials: 'DK', status: 'busy' },
                { name: 'Emily', role: 'QA Engineer', color: '#bdaa6f', initials: 'EM', status: 'busy' }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#252525]">{member.name}</p>
                      <p className="text-xs text-[#666666]">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#252525]">12/15</p>
                    <p className="text-xs text-[#666666]">Tasks</p>
                    <div className="w-16 bg-[#beced2] h-1 rounded-full mt-1">
                      <div className="bg-[#67909b] h-1 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-xs text-[#f59f0a] mt-1">85%</p>
                    <p className="text-xs text-[#666666]">workload</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sprint Overview */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <h3 className="text-lg font-medium text-[#242424] mb-4">Sprint Overview</h3>
          <div className="space-y-3">
            {[
              { name: 'Scrum 24', subtitle: 'Payments', status: 'Planned', progress: 0, color: '#4e84b4' },
              { name: 'Scrum 23', subtitle: 'Payment Integration', status: 'Active', progress: 68, color: '#f59f0a' },
              { name: 'Scrum 22', subtitle: 'User Authentication', status: 'Completed', progress: 100, color: '#16a249' }
            ].map((sprint, index) => (
              <div key={index} className="bg-[#f9f9f9] rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img alt="sprint" className="w-3.5 h-3.5" src={index === 0 ? imgWpfFuture : index === 1 ? imgCarbonInProgress : imgSvg5} />
                    <div>
                      <span className="text-sm font-medium text-[#333333]">{sprint.name} </span>
                      <span className="text-xs text-[#666666]">{sprint.subtitle}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: sprint.color }}>
                    {sprint.status}
                  </div>
                </div>
                <p className="text-xs text-[#666666] mb-2">Jun 25, 2025 - Jul 30, 2025</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#ecf2f2] h-2 rounded-full">
                    <div className="bg-[#67909b] h-2 rounded-full" style={{ width: `${sprint.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-zinc-500">{sprint.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues Analysis and Recent Comments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Issues Analysis */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img alt="analysis" className="w-6 h-6" src={imgFrame1116606892} />
                <h3 className="text-lg font-medium text-[#252525]">Issues Analysis</h3>
              </div>
              <div className="bg-[#06263d] px-2 py-1 rounded flex items-center gap-1">
                <span className="text-xs text-white">Week</span>
                <img alt="arrow" className="w-3 h-3 rotate-180" src={imgIconamoonArrowUp2Light1} />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-[#333333] mb-1">Time Spent on Tasks</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#f9f9f9] rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-[#06263d] mb-1">89</div>
                    <p className="text-xs text-[#60646c]">Assigned Issues</p>
                  </div>
                  <div className="bg-[#f9f9f9] rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-[#06263d] mb-1">85</div>
                    <p className="text-xs text-[#60646c]">Completed Issues</p>
                  </div>
                </div>
                <div className="bg-[#f9f9f9] rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[#06263d] mb-1">90%</div>
                  <p className="text-xs text-[#60646c]">This week's work tracking is higher than last week's</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img alt="comments" className="w-6 h-6" src={imgFrame1116606892} />
                <h3 className="text-lg font-medium text-[#252525]">Recent Comments</h3>
              </div>
              <div className="bg-[#586468] w-5 h-5 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">44</span>
              </div>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-[#f9f9f9] rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#263238] w-4 h-4 rounded-full flex items-center justify-center">
                      <img alt="bug" className="w-2.5 h-2.5" src={imgMdiBugOutline1} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#666666] mb-1">BG – 17</p>
                      <h4 className="text-sm font-medium text-[#333333] mb-1">
                        Login forgot password bugfix
                      </h4>
                      <p className="text-xs text-[#999999] mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque interdum sem, id eleifend mauris tempor sederty
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <img alt="user" className="w-3 h-3 rounded-full" src={imgEllipse253} />
                          <span className="text-xs font-medium text-[#333333]">Kate</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <img alt="stack" className="w-3 h-3" src={imgFluentStack48Regular} />
                            <span className="text-xs text-[#06263d] font-medium">5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img alt="attach" className="w-3 h-3" src={imgFluentAttach28Regular} />
                            <span className="text-xs text-[#06263d] font-medium">14</span>
                          </div>
                          <span className="text-xs text-[#999999]">6 mins ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bug Overview and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Bug Overview */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#242424]">Bug overview</h3>
              <div className="bg-[#06263d] w-6 h-6 rounded-full flex items-center justify-center">
                <img alt="add" className="w-3 h-3" src={imgStashPlusSolid} />
              </div>
            </div>
            <p className="text-sm text-[#999999] mb-4">
              Connect integrations with other services to be faster
            </p>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="bg-[#263238] w-4 h-4 rounded-full flex items-center justify-center">
                    <img alt="bug" className="w-2.5 h-2.5" src={imgMdiBugOutline} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#666666] mb-1">BG – 17</p>
                    <h4 className="text-sm font-medium text-[#252525] mb-1">
                      Login forgot password bugfix
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#333333] mb-1">
                      <span>Projects</span>
                      <span className="font-semibold text-[#666666]">Hire-Accel Portal</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <p className="text-xs text-[#4a4a4a] mb-1">Status</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Open</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#4a4a4a] mb-1">Priority</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Highest</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#4a4a4a] mb-1">Severity</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Critical</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#4a4a4a] mb-1">Category</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Functionality</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-medium text-[#242424] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                {
                  user: 'AC',
                  name: 'Alex Chen',
                  color: '#67909b',
                  action: 'Payment Integration Completed',
                  priority: 'high',
                  priorityColor: '#ef4343',
                  description: 'Successfully integrated Stripe payment gateway with error handling and webhook support',
                  time: '6 mins ago'
                },
                {
                  user: 'SJ',
                  name: 'Sarah Johnson',
                  color: '#679b7c',
                  action: 'API Rate Limit Risk Identified',
                  priority: 'medium',
                  priorityColor: '#f59f0a',
                  description: 'Third-party API may hit rate limits during peak usage. Need to implement caching strategy.',
                  time: '6 mins ago'
                },
                {
                  user: 'SJ',
                  name: 'Sarah Johnson',
                  color: '#7b679b',
                  action: 'API Rate Limit Risk Identified',
                  priority: 'medium',
                  priorityColor: '#f59f0a',
                  description: 'Third-party API may hit rate limits during peak usage. Need to implement caching strategy.',
                  time: '6 mins ago'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl">
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: activity.color }}
                    >
                      {activity.user}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex items-center gap-2">
                        <img alt="activity" className="w-3.5 h-3.5" src={index === 0 ? imgSvg5 : imgSvg6} />
                        <span className="text-sm font-medium text-[#333333]">{activity.action}</span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: activity.priorityColor }}>
                        {activity.priority}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#333333]">By {activity.name}</span>
                      <span className="text-xs text-[#999999]">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 