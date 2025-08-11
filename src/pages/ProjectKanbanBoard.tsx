
// Image assets from Figma design
const imgEllipse12 = "/icons/8dfb37f1c44b89cb8fd0798a06c53bd80dcfc600.png";
const imgEllipse13 = "/icons/732647e8b520de80006c6fe583f7fa220490cccf.png";
const imgEllipse15 = "/icons/d6fe311a0f3e161a383b51f2328646aa2f1c672a.png";
const imgEllipse248 = "/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const imgEllipse242 = "/icons/2c9169f96717641f0bb06a7a6be7046836bd4ada.png";
const imgEllipse246 = "/icons/be8f7c59d45aca4f6175e23713a9d21d9742abc7.png";
const imgGroup3 = "/icons/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgSiDashboardFill = "http://localhost:3845/assets/5ac3c5615fbd1cad010f0b75903f41f026f896e6.svg";
const imgCodiconDebugStepBack = "http://localhost:3845/assets/2176357e9181f53976019d69384d18af292f2abf.svg";
const imgFluentArrowSprint20Filled = "http://localhost:3845/assets/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";
const imgPhKanbanFill = "http://localhost:3845/assets/e2ce8adfcd886987cce0123d57e63e02541a1d0d.svg";
const imgClarityDateLine = "http://localhost:3845/assets/064b642908ce6cbe140760e38a6e00e45ce77a36.svg";
const img1 = "http://localhost:3845/assets/32071ad77bcf9778ea9aae10b7520bd900ac8779.svg";
const imgFluentAttach28Regular = "http://localhost:3845/assets/0b65a341c3ab47931dd25e72e72b0e139b46c905.svg";
const imgMdiBugOutline = "http://localhost:3845/assets/cb2280d66195675cdb1a349a2b097f5c140ee578.svg";
const imgSolarMenuDotsBold = "http://localhost:3845/assets/47e9bb51bb7dfdf67ffe9d9c86d8c6a51cf3b83b.svg";
const img2 = "http://localhost:3845/assets/bfa8f6f3becd2a73409cd3e5f2323742ac206163.svg";
const imgIcRoundPlus = "http://localhost:3845/assets/e138cc0ae5a850e01d85522e507912eed33ad923.svg";
const img3 = "http://localhost:3845/assets/bc788964e3d0118d1034faf145539d337f616372.svg";
const imgGroup4 = "http://localhost:3845/assets/35c5b2d24ff24f1d3138f02467137d71a2b9ae93.svg";
const imgLucideSortDesc = "http://localhost:3845/assets/9d83a8d7e9a88e769a7429c861aa53a5c092b1c5.svg";
const imgFluentGroup24Regular = "http://localhost:3845/assets/c66d9c4f0de85cf008c34c3ad437fa008be564db.svg";
const imgFluentArrowSprint20Filled1 = "http://localhost:3845/assets/73f802ab897d9a51d1c751ca20d91a3752bdac65.svg";
const imgIcRoundPlus1 = "http://localhost:3845/assets/dd4dc3f173b43504e12901612a14573c7f02aef5.svg";
const imgGroup5 = "http://localhost:3845/assets/2e309aa74b76b1ebfdfb2f41c4d8d82d5c6e1c26.svg";

export default function ProjectKanbanBoard() {
  return (
    <div className="bg-[#f6f6f6] min-h-screen w-full">
      {/* Project Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="rotate-90">
            <img alt="arrow" className="w-10 h-10" src={imgGroup3} />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#438197]">
            Example project name
          </h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-10 mb-6">
          <div className="flex items-center gap-2">
            <img alt="dashboard" className="w-6 h-6" src={imgSiDashboardFill} />
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
            <img alt="team" className="w-6 h-6" src={imgPhKanbanFill} />
            <span className="text-xl font-medium text-[#06263d]">Team</span>
          </div>
          <div className="flex items-center gap-2">
            <img alt="report" className="w-6 h-6" src={imgPhKanbanFill} />
            <span className="text-xl font-medium text-[#06263d]">Report</span>
          </div>
        </div>
        
        {/* Active Tab Indicator */}
        <div className="h-0.5 w-36 bg-[#438197] ml-24"></div>
      </div>

      {/* View Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-medium text-[#06263d]">Kanban Board View</h2>
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 bg-[#67909b] rounded-full flex items-center justify-center">
              <span className="text-white text-base font-medium">22</span>
            </div>
          </div>
        </div>
        
        {/* Team Members */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 bg-[#999999] rounded-full flex items-center justify-center">
              <img alt="profile" className="w-4 h-4" src={imgGroup5} />
            </div>
            <div className="w-10 h-10 bg-[#416880] rounded-full flex items-center justify-center">
              <span className="text-white text-sm">K</span>
            </div>
            <img alt="member" className="w-10 h-10 rounded-full" src={imgEllipse248} />
            <img alt="member" className="w-10 h-10 rounded-full" src={imgEllipse242} />
            <img alt="member" className="w-10 h-10 rounded-full" src={imgEllipse246} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#67909b] rounded-lg flex items-center justify-center">
            <img alt="search" className="w-4 h-4" src={imgGroup4} />
          </div>
          <div className="w-10 h-10 bg-[#67909b] rounded-lg flex items-center justify-center">
            <img alt="sort" className="w-4 h-4" src={imgLucideSortDesc} />
          </div>
          <div className="w-10 h-10 bg-[#67909b] rounded-lg flex items-center justify-center">
            <img alt="group" className="w-4 h-4" src={imgFluentGroup24Regular} />
          </div>
          <div className="w-10 h-10 bg-[#67909b] rounded-lg flex items-center justify-center">
            <img alt="sprint" className="w-4 h-4" src={imgFluentArrowSprint20Filled1} />
          </div>
        </div>
        <button className="bg-[#67909b] text-white px-6 py-2 rounded-lg font-medium">
          Complete Sprint
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-8 overflow-x-auto pb-6">
        {/* To-Do Column */}
        <div className="flex-shrink-0 w-72">
          <div className="bg-[rgba(103,144,155,0.06)] rounded-t-2xl p-4 min-h-[462px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-medium text-[#06263d]">To - Do</h3>
                <div className="w-6 h-6 bg-[#67909b] rounded-full flex items-center justify-center">
                  <span className="text-white text-base font-medium">2</span>
                </div>
              </div>
              <img alt="add" className="w-6 h-6 rotate-45" src={imgIcRoundPlus} />
            </div>
            
            {/* Task Cards */}
            <div className="space-y-4">
              {/* Task Card 1 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img1} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>

              {/* Task Card 2 (Rotated) */}
              <div className="bg-white rounded-2xl p-4 shadow-sm transform rotate-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img2} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex-shrink-0 w-72">
          <div className="bg-[rgba(103,144,155,0.06)] rounded-t-2xl p-4 min-h-[583px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-medium text-[#06263d]">In progress</h3>
                <div className="w-6 h-6 bg-[#67909b] rounded-full flex items-center justify-center">
                  <span className="text-white text-base font-medium">3</span>
                </div>
              </div>
              <img alt="add" className="w-6 h-6 rotate-45" src={imgIcRoundPlus} />
            </div>
            
            {/* Task Cards */}
            <div className="space-y-4">
              {/* Task Card 1 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>

              {/* Task Card 2 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>

              {/* Task Card 3 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In Review Column */}
        <div className="flex-shrink-0 w-72">
          <div className="bg-[rgba(103,144,155,0.06)] rounded-t-2xl p-4 min-h-[583px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-medium text-[#06263d]">In review</h3>
                <div className="w-6 h-6 bg-[#67909b] rounded-full flex items-center justify-center">
                  <span className="text-white text-base font-medium">3</span>
                </div>
              </div>
              <img alt="add" className="w-6 h-6 rotate-45" src={imgIcRoundPlus} />
            </div>
            
            {/* Task Cards */}
            <div className="space-y-4">
              {/* Task Card 1 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>

              {/* Task Card 2 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Done Column */}
        <div className="flex-shrink-0 w-72">
          <div className="bg-[rgba(103,144,155,0.06)] rounded-t-2xl p-4 min-h-[418px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-medium text-[#06263d]">Done</h3>
                <div className="w-6 h-6 bg-[#67909b] rounded-full flex items-center justify-center">
                  <span className="text-white text-base font-medium">2</span>
                </div>
              </div>
              <img alt="add" className="w-6 h-6 rotate-45" src={imgIcRoundPlus} />
            </div>
            
            {/* Task Cards */}
            <div className="space-y-4">
              {/* Task Card 1 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>

              {/* Task Card 2 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse12} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse13} />
                      <img alt="member" className="w-5 h-5 rounded-full" src={imgEllipse15} />
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="date" className="w-3.5 h-3.5" src={imgClarityDateLine} />
                      <span className="text-xs text-[#e52828] font-medium">Sep 22</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img alt="message" className="w-3.5 h-3.5" src={img3} />
                      <span className="text-xs text-[#787486] font-medium">16</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img alt="attach" className="w-3.5 h-3.5" src={imgFluentAttach28Regular} />
                      <span className="text-xs text-[#787486] font-medium">14</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-[#0d062d] text-base mb-2">Brainstorming</h4>
                <p className="text-[#787486] text-xs mb-3 leading-4">
                  Brainstorming brings team members' diverse experience into play.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-[#666666]">BG – 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgba(223,168,116,0.2)] rounded px-2 py-1">
                      <span className="text-xs text-[#d58d49] font-medium">Low</span>
                    </div>
                    <img alt="menu" className="w-5 h-5 rotate-90" src={imgSolarMenuDotsBold} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-8 right-8">
        <div className="w-8 h-8 bg-[#67909b] rounded-lg flex items-center justify-center">
          <img alt="add" className="w-6 h-6" src={imgIcRoundPlus1} />
        </div>
      </div>
    </div>
  );
} 