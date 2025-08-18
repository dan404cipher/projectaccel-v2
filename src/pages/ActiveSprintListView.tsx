import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectKanbanBoard from './ProjectKanbanBoard';

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
  const [activeSprintTab, setActiveSprintTab] = useState<'kanbanView' | 'listView' | 'sortByStatus'>('kanbanView');

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

  const handleActiveSprintTabChange = (tab: string) => {
    setActiveSprintTab(tab as 'kanbanView' | 'listView' | 'sortByStatus');
  };
  return (
    <div className="h-full w-full flex flex-col overflow-hidden rounded-lg">
      {/* Project Header */}
      <ProjectHeader 
        projectName="Example project name"
        activeTab="sprint"
        activeSprintTab={activeSprintTab}
        onTabChange={handleTabClick}
                onActiveSprintTabChange={handleActiveSprintTabChange}
      />

      {/* Conditional Content Based on Active Sprint Tab */}
      {activeSprintTab === "kanbanView" && (
        <ProjectKanbanBoard />
      )}

      {activeSprintTab === "listView" && (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-[#06263d] mb-4">List View</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600">List view content will be displayed here.</p>
            {/* Add your list view component here */}
          </div>
        </div>
      )}

      {activeSprintTab === "sortByStatus" && (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-[#06263d] mb-4">Sort by Status</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600">Sort by status content will be displayed here.</p>
            {/* Add your sort by status component here */}
          </div>
        </div>
      )}
      
    </div>
  );
} 