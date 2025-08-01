import React from 'react';
import { Layout } from '@/components/layout/Layout';

// Image assets from Figma design
const imgEllipse242 = "http://localhost:3845/assets/2c9169f96717641f0bb06a7a6be7046836bd4ada.png";
const imgEllipse243 = "http://localhost:3845/assets/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const imgEllipse244 = "http://localhost:3845/assets/5375465d21d8f708db62b44f13c796c91c2a4e5f.png";
const imgEllipse245 = "http://localhost:3845/assets/d3d4f37717609e977f5fe8d69a995ab2ca7dff62.png";
const imgEllipse246 = "http://localhost:3845/assets/be8f7c59d45aca4f6175e23713a9d21d9742abc7.png";
const imgEllipse247 = "http://localhost:3845/assets/b38481751890bb742ffc613e1fe570486af1f031.png";
const imgMdiBugOutline = "http://localhost:3845/assets/7c927e169f33a813536c75efc7a1f6a075bc7421.svg";

export default function ProjectList() {
  return (
    <Layout>
      <div className="bg-[#f6f6f6] min-h-screen w-full">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#438197] mb-2">
            Active Projects
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#999999]">
            18 projects
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Project Card 1 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-medium text-[#252525] capitalize line-clamp-2">
                Example Project Title
              </h3>
              <div className="flex items-center gap-1">
                <div className="bg-[#263238] rounded-full p-1">
                  <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                </div>
                <span className="text-xs text-[#666666] font-medium">PV – 117</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-[#999999] mb-4 line-clamp-2">
              consectetur adipiscing elit, sed do consectetur
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666] font-medium">Progress</span>
                <span className="text-sm text-[#666666] font-medium">89%</span>
              </div>
              <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-2">
                <div className="bg-[#438197] h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse242} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse243} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse244} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse245} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse246} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse247} />
              </div>
              <span className="text-sm text-[#999999] font-medium">24+</span>
            </div>
            
            {/* Deadline */}
            <div className="bg-[rgba(203,102,102,0.16)] rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-medium text-[#252525] capitalize line-clamp-2">
                Example Project Title
              </h3>
              <div className="flex items-center gap-1">
                <div className="bg-[#263238] rounded-full p-1">
                  <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                </div>
                <span className="text-xs text-[#666666] font-medium">PV – 117</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-[#999999] mb-4 line-clamp-2">
              consectetur adipiscing elit, sed do consectetur
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666] font-medium">Progress</span>
                <span className="text-sm text-[#666666] font-medium">89%</span>
              </div>
              <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-2">
                <div className="bg-[#438197] h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse242} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse243} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse244} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse245} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse246} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse247} />
              </div>
              <span className="text-sm text-[#999999] font-medium">24+</span>
            </div>
            
            {/* Deadline */}
            <div className="bg-[rgba(203,102,102,0.16)] rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-medium text-[#252525] capitalize line-clamp-2">
                Example Project Title
              </h3>
              <div className="flex items-center gap-1">
                <div className="bg-[#263238] rounded-full p-1">
                  <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                </div>
                <span className="text-xs text-[#666666] font-medium">PV – 117</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-[#999999] mb-4 line-clamp-2">
              consectetur adipiscing elit, sed do consectetur
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666] font-medium">Progress</span>
                <span className="text-sm text-[#666666] font-medium">89%</span>
              </div>
              <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-2">
                <div className="bg-[#438197] h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse242} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse243} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse244} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse245} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse246} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse247} />
              </div>
              <span className="text-sm text-[#999999] font-medium">24+</span>
            </div>
            
            {/* Deadline */}
            <div className="bg-[rgba(203,102,102,0.16)] rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>

          {/* Project Card 4 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-medium text-[#252525] capitalize line-clamp-2">
                Example Project Title
              </h3>
              <div className="flex items-center gap-1">
                <div className="bg-[#263238] rounded-full p-1">
                  <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                </div>
                <span className="text-xs text-[#666666] font-medium">PV – 117</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-[#999999] mb-4 line-clamp-2">
              consectetur adipiscing elit, sed do consectetur
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666] font-medium">Progress</span>
                <span className="text-sm text-[#666666] font-medium">89%</span>
              </div>
              <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-2">
                <div className="bg-[#438197] h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse242} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse243} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse244} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse245} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse246} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse247} />
              </div>
              <span className="text-sm text-[#999999] font-medium">24+</span>
            </div>
            
            {/* Deadline */}
            <div className="bg-[rgba(203,102,102,0.16)] rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>

          {/* Project Card 5 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-medium text-[#252525] capitalize line-clamp-2">
                Example Project Title
              </h3>
              <div className="flex items-center gap-1">
                <div className="bg-[#263238] rounded-full p-1">
                  <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                </div>
                <span className="text-xs text-[#666666] font-medium">PV – 117</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-[#999999] mb-4 line-clamp-2">
              consectetur adipiscing elit, sed do consectetur
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666] font-medium">Progress</span>
                <span className="text-sm text-[#666666] font-medium">89%</span>
              </div>
              <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-2">
                <div className="bg-[#438197] h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse242} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse243} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse244} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse245} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse246} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse247} />
              </div>
              <span className="text-sm text-[#999999] font-medium">24+</span>
            </div>
            
            {/* Deadline */}
            <div className="bg-[rgba(203,102,102,0.16)] rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>

          {/* Project Card 6 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-medium text-[#252525] capitalize line-clamp-2">
                Example Project Title
              </h3>
              <div className="flex items-center gap-1">
                <div className="bg-[#263238] rounded-full p-1">
                  <img alt="bug" className="w-3 h-3" src={imgMdiBugOutline} />
                </div>
                <span className="text-xs text-[#666666] font-medium">PV – 117</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-[#999999] mb-4 line-clamp-2">
              consectetur adipiscing elit, sed do consectetur
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666] font-medium">Progress</span>
                <span className="text-sm text-[#666666] font-medium">89%</span>
              </div>
              <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-2">
                <div className="bg-[#438197] h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse242} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse243} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse244} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse245} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse246} />
                <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={imgEllipse247} />
              </div>
              <span className="text-sm text-[#999999] font-medium">24+</span>
            </div>
            
            {/* Deadline */}
            <div className="bg-[rgba(203,102,102,0.16)] rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 