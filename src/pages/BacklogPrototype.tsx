import ProjectHeader from '@/components/ProjectHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

// Image assets from Figma design
const imgSearch = "/icons/icon-park-outline_search.png";
const filter = '/icons/solar_filter-broken.svg';
const lucideSortDesc = '/icons/lucide_sort-desc.png';
const downarrow = '/icons/iconamoon_arrow-up-2-fill.svg';
const menu = '/icons/solar_menu-dots-bold.svg';
const bug = '/icons/mdi_bug-outline.svg';
const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";


export default function BacklogPrototype() {
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
    <div className="bg-[#f6f6f6] h-screen w-full flex flex-col">
      {/* Project Header - Fixed */}
      <ProjectHeader projectName="Example project name" activeTab="backlog" onTabChange={handleTabClick} />
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Main Content Area */}
        <div className="bg-[#f2f2f2] rounded-2xl p-4">
          {/* List View Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-[#06263d]">
                List View / Sort by status
              </h2>
              <div className="flex items-center gap-1">
                <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">22</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(6,38,61,0.4)] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <img alt="search" className="w-4 h-4" src={imgSearch} />
              </div>
              <div className="bg-[rgba(6,38,61,0.4)] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <img alt="filter" className="w-4 h-4" src={filter} />
              </div>
              <div className="bg-[rgba(6,38,61,0.4)] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <img alt="sort" className="w-4 h-4" src={lucideSortDesc} />
              </div>
            </div>
          </div>

          {/* Sprint Cards */}
          <div className="space-y-4">
            {/* Sprint 1 - Active */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className='flex items-center gap-5'>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button className="w-5 h-5">
                        <Checkbox
                          checked={false}
                          onCheckedChange={() => { }}
                          className="w-5 h-5"
                        />
                      </button>
                      <button className="w-5 h-5 rotate-180">
                        <img alt="drag" className="w-full h-full rotate-180" src={downarrow} />
                      </button>
                      <h3 className="text-lg font-medium text-[#06263d]">SCRUM Sprint 1</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">4</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#838488]">01 Dec-07 Dec (3 issue items)</span>
                </div>
                {/* Complete Sprint Button */}
                <div className="flex justify-end mb-4 gap-2">
                  <button className="bg-[#06263d] text-white px-2 py-2 rounded-lg text-xs font-medium">
                    Complete Sprint
                  </button>
                  <button className=" text-white px-2 py-2 rounded-lg text-xs font-medium">
                    <img alt="menu" className="w-full h-full" src={menu} />
                  </button>
                </div>
              </div>


              {/* Table Header */}
              <div className="grid grid-cols-7 gap-3 mb-3 text-sm font-medium text-[#252525]">
                <div className='text-left'>Type</div>
                <div className='text-left'>Issue Title</div>
                <div className='text-center'>Assign to</div>
                <div className='text-center'>Status</div>
                <div className='text-center'>Priority</div>
                <div className="text-center">Due date</div>
                <div className="text-center">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {/* Row 1 */}
                <div className="grid grid-cols-7 gap-3 items-center py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={bug} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="flex -space-x-4">
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img3} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img4} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img5} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img6} />
                      <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={img2} />
                    </div>
                    <span className="text-sm text-[#333333]">24+</span> 
                  </div>
                  <div className="text-xs w-full flex items-center justify-center font-medium gap-1">
                    <span className="text-[#8a96f7] bg-[rgba(138,150,247,0.2)] px-2 py-1 rounded">To-do</span>
                  </div>
                  <div className=" text-[#d58d49] text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className="text-[#d58d49]  bg-[rgba(223,168,116,0.2)] text-center px-2 py-1 rounded ">Low</span>
                  </div>
                  <div className="text-center font-medium text-[#e52828]">Dec 5</div>
                  <div className="flex justify-center">
                    <button className="w-5 h-5 rotate-90">
                      <img alt="menu" className="w-full h-full rotate-90" src={menu} />
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-7 gap-3 items-center py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={bug} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className=" text-xs font-medium w-full flex items-center justify-center">
                    <span className='bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-2 py-1 rounded'>Todo</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-2 py-1 rounded'>Low</span>
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-5 h-5 rotate-90">
                      <img alt="menu" className="w-full h-full rotate-90" src={menu} />
                    </button>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-7 gap-3 items-center py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={bug} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-2 py-1 rounded'>Todo</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-2 py-1 rounded'>Low</span>
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-5 h-5 rotate-90">
                      <img alt="menu" className="w-full h-full rotate-90" src={menu} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Backlog Card */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className='flex items-center gap-5'>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button className="w-5 h-5">
                        <Checkbox
                          checked={false}
                          onCheckedChange={() => { }}
                          className="w-5 h-5"
                        />
                      </button>
                      <button className="w-5 h-5 rotate-180">
                        <img alt="drag" className="w-full h-full rotate-180" src={downarrow} />
                      </button>
                      <h3 className="text-lg font-medium text-[#06263d]">Backlog</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">9</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#838488]">(9 issues items)</span>
                </div>
                {/* Create Sprint Button */}
                <div className="flex justify-end mb-4">
                  <button className="bg-[#06263d] text-white px-2 py-2 rounded-lg text-xs font-medium">
                    Create Sprint
                  </button>
                  <button className=" text-white px-2 py-2 rounded-lg text-xs font-medium">
                    <img alt="menu" className="w-full h-full" src={menu} />
                  </button>
                </div>
              </div>



              {/* Table Header */}
              <div className="grid grid-cols-7 gap-3 mb-3 text-sm font-medium text-[#252525]">
                <div className='text-left'>Type</div>
                <div className='text-left'>Issue Title</div>
                <div className='text-center'>Assign to</div>
                <div className='text-center'>Status</div>
                <div className='text-center'>Priority</div>
                <div className="text-center">Due date</div>
                <div className="text-center">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {/* Row 1 */}
                <div className="grid grid-cols-7 gap-3 items-center py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={bug} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-2 py-1 rounded'>Todo</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-2 py-1 rounded'>Low</span>
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-5 h-5 rotate-90">
                      <img alt="menu" className="w-full h-full rotate-90" src={menu} />
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-7 gap-3 items-center py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={bug} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-2 py-1 rounded'>Todo</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-2 py-1 rounded'>Low</span>
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-5 h-5 rotate-90">
                      <img alt="menu" className="w-full h-full rotate-90" src={menu} />
                    </button>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-7 gap-3 items-center py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center">
                      <img alt="bug" className="w-3 h-3" src={bug} />
                    </div>
                    <span className="text-xs text-[#666666]">TA – 117</span>
                  </div>
                  <div className="font-medium text-[#252525]">Publish blog page</div>
                    <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-[#333333]">Unassigned</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(138,150,247,0.2)] text-[#8a96f7] px-2 py-1 rounded'>Todo</span>
                  </div>
                  <div className="text-xs font-medium w-full flex items-center justify-center gap-1">
                    <span className='bg-[rgba(223,168,116,0.2)] text-[#d58d49] px-2 py-1 rounded'>Low</span>
                  </div>
                  <div className="text-center font-medium text-[#808080]">-</div>
                  <div className="flex justify-center">
                    <button className="w-5 h-5 rotate-90">
                      <img alt="menu" className="w-full h-full rotate-90" src={menu} />
                    </button>
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