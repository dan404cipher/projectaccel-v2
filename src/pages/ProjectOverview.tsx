import React from 'react';
import { Layout } from '@/components/layout/Layout';

// Image assets from Figma design
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
const imgEllipse253 = "http://localhost:3845/assets/d8855d46b4ca8d554ac739a63c3e1e89d0338f9b.png";
const imgGroup = "http://localhost:3845/assets/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgStreamlineFlexDashboard3 = "http://localhost:3845/assets/19558319ea945b979494611aee69f1a69fdd5ed5.svg";
const imgCodiconDebugStepBack = "http://localhost:3845/assets/25d9978e6ee520adcae953bb81971ba680eb074e.svg";
const imgFluentArrowSprint20Filled = "http://localhost:3845/assets/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";
const imgFluentPeopleTeam16Regular = "http://localhost:3845/assets/f626b26b7a59007334b99699a973c47adb5c30df.svg";
const imgMdiReportBoxMultipleOutline = "http://localhost:3845/assets/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg";
const imgLine35 = "http://localhost:3845/assets/ff763058e78f480e18495760226f55a6a4170ae7.svg";
const imgLogo = "http://localhost:3845/assets/b84b5d40d2b309aeb74557c18f9c8aee107bb331.svg";
const imgIconamoonArrowUp2Light = "http://localhost:3845/assets/6da921a9801912b57d27cdefe8385059e7ddd31a.svg";
const imgEllipse10 = "http://localhost:3845/assets/88364341615089b24b27f35494b0b95acb2276c1.svg";
const imgGroup1 = "http://localhost:3845/assets/93765e3060a5e02b5efd9ef1791db8c21fc953ef.svg";
const imgGroup2 = "http://localhost:3845/assets/fe5ff0a6cc4ccdea2f38da4d6baf3716def90e5c.svg";
const imgGroup1984077193 = "http://localhost:3845/assets/c1b6d222986627b36f13ba42ac2e73da7b39c04a.svg";
const imgGroup3 = "http://localhost:3845/assets/e56e056d80f3538d5ece29278399adf7a83f00f8.svg";
const imgMageFilter = "http://localhost:3845/assets/eb541e44da29796a676123f07dd6a6b02f8f359b.svg";
const imgSubtract = "http://localhost:3845/assets/b327141dae44e7995f7d12061dd5a9b43aab3414.svg";
const imgPajamasCollapseLeft = "http://localhost:3845/assets/28a69ae95d5ba66094af1375314dbb52a710a84e.svg";
const img = "http://localhost:3845/assets/ebf941e488128d66d349845b389b3ee78ee00cf9.svg";
const imgSvg = "http://localhost:3845/assets/c2a1e586581c82bed930644fd4eaca8c9130d64e.svg";
const imgSvg1 = "http://localhost:3845/assets/5ba67feb4e6393f83f45a6c3927d037c8ff64d47.svg";
const imgSvg2 = "http://localhost:3845/assets/c7ac791e9ae2e4e80e98ae2787bc34c7734cc7c3.svg";
const imgSvg3 = "http://localhost:3845/assets/bbb66184b2a69291b2550dcfdc611cf2bfde48c1.svg";
const imgVector = "http://localhost:3845/assets/c9ceda3dc02924c9de4a2a2970264ec45673831a.svg";
const imgVector1 = "http://localhost:3845/assets/8e301df61d7412a255e458bcb392d90fbf0acb41.svg";
const imgFrame = "http://localhost:3845/assets/85f404089e4c76dbb6afd12446c847cb2c4ff454.svg";
const imgVector2 = "http://localhost:3845/assets/008bfc8c1a6860f58a85fd842ae8dba028cd6272.svg";
const imgGroup4 = "http://localhost:3845/assets/c08ee9139dd071349301785030c6d8a0e87b8bb0.svg";
const imgVector3 = "http://localhost:3845/assets/07b244d954bb063cf01d2bc8113d07f2d6b65571.svg";
const imgGroup5 = "http://localhost:3845/assets/a41ecf40a931b1f3d6c9e37e89358660fdc2992a.svg";
const imgOuterGauge = "http://localhost:3845/assets/111ff2b9f098193df368234df74d181d10eca161.svg";
const imgOuterGauge1 = "http://localhost:3845/assets/34ea38747bd8736ccf235f30840add7b9a4fe6e7.svg";
const imgOuterGauge2 = "http://localhost:3845/assets/accf871dab0296ae2da19bea8b5944bcd8d87f1c.svg";
const imgInnerGauge = "http://localhost:3845/assets/f700ccadedaf5c1a6799adb1cdd2bc8ed465e7d8.svg";
const imgInnerGauge1 = "http://localhost:3845/assets/eba861cc92a738cf0f6f4904ec09c4b1b3565909.svg";
const imgEllipse224 = "http://localhost:3845/assets/3a3d313dafd9a313929584fdac85bd4c25ddc0b9.svg";
const imgEllipse226 = "http://localhost:3845/assets/7f2cc763a4577335058f60051d7ce82096840ab9.svg";
const imgEllipse225 = "http://localhost:3845/assets/6315ee4f54188ff6a8b277aac4b7e53154ff641e.svg";
const imgEllipse227 = "http://localhost:3845/assets/248b513e4b78be17d2cebeabad2987f886cc96af.svg";
const imgEllipse228 = "http://localhost:3845/assets/f8371daf7e98049d36143d37c3caedaa74521ccf.svg";
const imgFrame1116606892 = "http://localhost:3845/assets/b63376883b493ac6599d9111001d0af46a8188ff.svg";
const imgMdiBugOutline = "http://localhost:3845/assets/cb2280d66195675cdb1a349a2b097f5c140ee578.svg";
const imgOuterGauge3 = "http://localhost:3845/assets/417bc3fd035d98fbabc03f97bfa0f46bce3c714f.svg";
const imgOuterGauge4 = "http://localhost:3845/assets/90b855cf7fce5f7dd85806071994c5415c6801e9.svg";
const imgInnerGauge2 = "http://localhost:3845/assets/a976ce3a82fe812691e607fb385a67a6ec15f09e.svg";
const imgInnerGauge3 = "http://localhost:3845/assets/23e17ef3dc449082d7438cc807375878f1d45ac5.svg";
const imgSvg4 = "http://localhost:3845/assets/78a8838b2392e76890de1d56e7b515d79a43a5cc.svg";
const imgWpfFuture = "http://localhost:3845/assets/01a06071bb00def338f2533eed5ebf44a16d3045.svg";
const imgCarbonInProgress = "http://localhost:3845/assets/3b16109919bcae82cf9ff5f486a76d077ae275f0.svg";
const imgSvg5 = "http://localhost:3845/assets/8195f6590487dccda43e1e1714733a9cd7d8479e.svg";
const imgIconamoonArrowUp2Light1 = "http://localhost:3845/assets/15ff4a3150f197d39be974b92800df3f319ff4b1.svg";
const imgGroup6 = "http://localhost:3845/assets/9cb9f2be749342706830efbbe85b166a64c76fd7.svg";
const imgGroup7 = "http://localhost:3845/assets/504a7a0baa897b66ac1a4c88da48aac0b989bdaa.svg";
const imgGroup8 = "http://localhost:3845/assets/82deb81e3eef438001922077aa7d43d7bf79187e.svg";
const imgGroup9 = "http://localhost:3845/assets/e85114409db77ee55744fd84562bd7e692601dff.svg";
const imgGroup10 = "http://localhost:3845/assets/4c82b0b38344b33d2066107134803de5278a9d18.svg";
const imgGroup11 = "http://localhost:3845/assets/87eaedc398216b76d32c747599045a8fd13a17ec.svg";
const imgGroup12 = "http://localhost:3845/assets/2e62acc852e98b3ca2558c7a72fc264b7c422af5.svg";
const img1 = "http://localhost:3845/assets/8a7d4b4b21492d0ec001ebd95f4256a86ef91fe8.svg";
const imgMdiBugOutline1 = "http://localhost:3845/assets/9f4c79e42dfabb21660012f2284298e6c121684f.svg";
const imgFluentStack48Regular = "http://localhost:3845/assets/bcbcc632e11139b74644e0e08b64f512c5c72a40.svg";
const imgFluentAttach28Regular = "http://localhost:3845/assets/a187de8d0218ecc63f62e32ee0d5f0e858f37e03.svg";
const imgStashPlusSolid = "http://localhost:3845/assets/e28b8423897034bc83c4d67baaf1d5c49f0ddb20.svg";
const imgLine43 = "http://localhost:3845/assets/cb242a4d6238c13aaf502dd5c6aec440a2c5202d.svg";
const imgSvg6 = "http://localhost:3845/assets/a28adb31099ee707512b5c31ffcc447b465cb104.svg";

export default function ProjectOverview() {
  return (
    <Layout>
      <div className="bg-[#f6f6f6] min-h-screen w-full p-6">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-10 h-10">
              <img alt="arrow" className="w-6 h-6 rotate-90" src={imgGroup} />
            </div>
            <h1 className="text-3xl font-medium text-[#438197]">
              Example project name
            </h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-10 mb-4">
            <div className="flex items-center gap-2">
              <img alt="dashboard" className="w-6 h-6" src={imgStreamlineFlexDashboard3} />
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
          </div>
          <div className="w-28 h-0.5 bg-[#438197]"></div>
        </div>

        {/* Project Info Card */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-[#438197]">
                  E-commerce Platform Redesign
                </h2>
                <div className="bg-[rgba(223,168,116,0.2)] px-3 py-1 rounded">
                  <span className="text-sm font-medium text-[#d58d49]">In progress</span>
                </div>
              </div>
              <p className="text-lg text-zinc-500 mb-4">
                Client: <span className="text-[#333333]">TechCorp Industries</span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <img alt="calendar" className="w-4 h-4" src={imgSvg} />
                  <span className="text-sm text-zinc-500">Start: Jan 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="calendar" className="w-4 h-4" src={imgSvg1} />
                  <span className="text-sm text-zinc-500">Due: Apr 30, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="users" className="w-4 h-4" src={imgSvg2} />
                  <span className="text-sm text-zinc-500">8 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="progress" className="w-4 h-4" src={imgSvg3} />
                  <span className="text-sm text-zinc-500">68% complete</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-4">
                <p className="text-sm text-zinc-500">Project Manager</p>
                <p className="text-base font-medium text-zinc-950">Sarah Johnson</p>
                <div className="bg-[#34559d] w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mt-2">
                  SJ
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-950">Overall Progress</span>
                  <span className="text-sm text-zinc-500">68%</span>
                </div>
                <div className="w-64 bg-[#ecf2f2] h-3 rounded-full">
                  <div className="bg-[#67909b] h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#333333] text-center mb-4">
              Unassigned Issues
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#06263d] mb-2">4</div>
              <p className="text-sm text-[#999999]">Issues across projects</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#333333] text-center mb-4">
              Assigned Issues
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#06263d] mb-2">44</div>
              <p className="text-sm text-[#999999]">Issues across projects</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#333333] text-center mb-4">
              In progress
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#06263d] mb-2">32</div>
              <p className="text-sm text-[#999999]">Currently being worked on</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#333333] text-center mb-4">
              Over Due Issues
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#06263d] mb-2">5</div>
              <p className="text-sm text-[#999999]">Pending Beyond Deadline</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#333333] text-center mb-4">
              Completion Rate
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2a9d90] mb-2">32%</div>
              <p className="text-sm text-[#999999]">61 of 131 Issues completed</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Types of Work Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-[#252525] mb-2">Types of work</h3>
            <p className="text-base text-[#999999] mb-6">Issues in all projects</p>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Epic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Bug</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Story</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-[#252525] mb-2">Priority Breakdown</h3>
            <p className="text-base text-[#999999] mb-6">Priority breakdown of all projects</p>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-4xl font-medium text-[#2a9d90] mb-4">32</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Highest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                    <span className="text-sm">Lowest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Issues */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img alt="emergency" className="w-8 h-8" src={imgFrame1116606892} />
                <h3 className="text-xl font-medium text-[#252525]">Emerg Issues</h3>
              </div>
              <img alt="emergency" className="w-8 h-8" src={imgFrame1116606892} />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="bg-[#263238] w-5 h-5 rounded-full flex items-center justify-center">
                    <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#666666] mb-1">BG – 17</p>
                    <h4 className="text-base font-medium text-[#333333] mb-2">
                      Login forgot password bugfix
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#999999] mb-2">
                      <span>Projects</span>
                      <span>Hire-Accel Portal</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#252525] mb-1">Time Left</p>
                      <div className="bg-[#c0ced2] h-5 rounded-lg flex items-center px-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Overview */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-[#242424] mb-6">Status Overview</h3>
            <div className="text-center">
              <div className="text-4xl font-medium text-[#2a9d90] mb-4">86</div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm">To-do</span>
                  <span className="text-sm font-bold">43</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm">In progress</span>
                  <span className="text-sm font-bold">12</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">In review</span>
                  <span className="text-sm font-bold">3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Done</span>
                  <span className="text-sm font-bold">18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Overview */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-[#242424] mb-6">Team Overview</h3>
            <div className="space-y-4">
              {[
                { name: 'Alex Chen', role: 'Frontend Developer', color: '#67909b', initials: 'AC', status: 'online' },
                { name: 'Maria', role: 'Backend Developer', color: '#679b7c', initials: 'MR', status: 'online' },
                { name: 'David', role: 'UX Designer', color: '#7b679b', initials: 'DK', status: 'busy' },
                { name: 'Emily', role: 'QA Engineer', color: '#bdaa6f', initials: 'EM', status: 'busy' }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                    </div>
                    <div>
                      <p className="text-base font-medium text-[#252525]">{member.name}</p>
                      <p className="text-xs text-[#666666]">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#252525]">12/15</p>
                    <p className="text-xs text-[#666666]">Tasks</p>
                    <div className="w-20 bg-[#beced2] h-1.5 rounded-full mt-1">
                      <div className="bg-[#67909b] h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-sm text-[#f59f0a] mt-1">85%</p>
                    <p className="text-xs text-[#666666]">workload</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sprint Overview */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-medium text-[#242424] mb-6">Sprint Overview</h3>
          <div className="space-y-4">
            {[
              { name: 'Scrum 24', subtitle: 'Payments', status: 'Planned', progress: 0, color: '#4e84b4' },
              { name: 'Scrum 23', subtitle: 'Payment Integration', status: 'Active', progress: 68, color: '#f59f0a' },
              { name: 'Scrum 22', subtitle: 'User Authentication', status: 'Completed', progress: 100, color: '#16a249' }
            ].map((sprint, index) => (
              <div key={index} className="bg-[#f9f9f9] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img alt="sprint" className="w-4 h-4" src={index === 0 ? imgWpfFuture : index === 1 ? imgCarbonInProgress : imgSvg5} />
                    <div>
                      <span className="text-base font-medium text-[#333333]">{sprint.name} </span>
                      <span className="text-xs text-[#666666]">{sprint.subtitle}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: sprint.color }}>
                    {sprint.status}
                  </div>
                </div>
                <p className="text-xs text-[#666666] mb-3">Jun 25, 2025 - Jul 30, 2025</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#ecf2f2] h-3 rounded-full">
                    <div className="bg-[#67909b] h-3 rounded-full" style={{ width: `${sprint.progress}%` }}></div>
                  </div>
                  <span className="text-sm text-zinc-500">{sprint.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues Analysis and Recent Comments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Issues Analysis */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img alt="analysis" className="w-8 h-8" src={imgFrame1116606892} />
                <h3 className="text-xl font-medium text-[#252525]">Issues Analysis</h3>
              </div>
              <div className="bg-[#06263d] px-3 py-2 rounded-lg flex items-center gap-1">
                <span className="text-sm text-white">Week</span>
                <img alt="arrow" className="w-4 h-4 rotate-180" src={imgIconamoonArrowUp2Light1} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-medium text-[#333333] mb-2">Time Spent on Tasks</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#f9f9f9] rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#06263d] mb-1">89</div>
                    <p className="text-sm text-[#60646c]">Assigned Issues</p>
                  </div>
                  <div className="bg-[#f9f9f9] rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#06263d] mb-1">85</div>
                    <p className="text-sm text-[#60646c]">Completed Issues</p>
                  </div>
                </div>
                <div className="bg-[#f9f9f9] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#06263d] mb-2">90%</div>
                  <p className="text-sm text-[#60646c]">This week's work tracking is higher than last week's</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img alt="comments" className="w-8 h-8" src={imgFrame1116606892} />
                <h3 className="text-xl font-medium text-[#252525]">Recent Comments</h3>
              </div>
              <div className="bg-[#586468] w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-sm text-white font-medium">44</span>
              </div>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-[#f9f9f9] rounded-2xl p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#263238] w-5 h-5 rounded-full flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline1} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#666666] mb-1">BG – 17</p>
                      <h4 className="text-base font-medium text-[#333333] mb-2">
                        Login forgot password bugfix
                      </h4>
                      <p className="text-xs text-[#999999] mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque interdum sem, id eleifend mauris tempor sederty
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <img alt="user" className="w-4 h-4 rounded-full" src={imgEllipse253} />
                          <span className="text-sm font-medium text-[#333333]">Kate</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <img alt="stack" className="w-3.5 h-3.5" src={imgFluentStack48Regular} />
                            <span className="text-xs text-[#06263d] font-medium">5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bug Overview */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-[#242424]">Bug overview</h3>
              <div className="bg-[#06263d] w-8 h-8 rounded-full flex items-center justify-center">
                <img alt="add" className="w-4 h-4" src={imgStashPlusSolid} />
              </div>
            </div>
            <p className="text-base text-[#999999] mb-6">
              Connect integrations with other services to be faster
            </p>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="bg-[#263238] w-5 h-5 rounded-full flex items-center justify-center">
                    <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#666666] mb-1">BG – 17</p>
                    <h4 className="text-base font-medium text-[#252525] mb-2">
                      Login forgot password bugfix
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#333333] mb-2">
                      <span>Projects</span>
                      <span className="font-semibold text-[#666666]">Hire-Accel Portal</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm text-[#4a4a4a] mb-1">Status</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-5 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Open</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#4a4a4a] mb-1">Priority</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-5 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Highest</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#4a4a4a] mb-1">Severity</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-5 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Critical</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#4a4a4a] mb-1">Category</p>
                      <div className="bg-[rgba(192,206,210,0.4)] h-5 rounded flex items-center px-2">
                        <span className="text-xs text-[#445256]">Functionality</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-[#242424] mb-6">Recent Activity</h3>
            <div className="space-y-4">
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
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl">
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: activity.color }}
                    >
                      {activity.user}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <img alt="activity" className="w-4 h-4" src={index === 0 ? imgSvg5 : imgSvg6} />
                        <span className="text-base font-medium text-[#333333]">{activity.action}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: activity.priorityColor }}>
                        {activity.priority}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#333333]">By {activity.name}</span>
                      <span className="text-xs text-[#999999]">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 