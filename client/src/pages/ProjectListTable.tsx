import React from 'react';
import { Layout } from '@/components/layout/Layout';

// Image assets from Figma design
const imgEllipse243 = "http://localhost:3845/assets/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const imgEllipse244 = "http://localhost:3845/assets/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const imgEllipse245 = "http://localhost:3845/assets/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const imgEllipse246 = "http://localhost:3845/assets/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const imgEllipse247 = "http://localhost:3845/assets/f373c72d51af21d02977bea40bdb4a1d38533f48.png";
const imgEllipse242 = "http://localhost:3845/assets/e8ca84c111215893799dd1a1575ed9277e36a0ed.png";
const imgQlementineIconsDrag16 = "http://localhost:3845/assets/949547e3a890827325725733994a0ad4dcde1080.svg";
const imgCheckbox = "http://localhost:3845/assets/484f69df9df67da437dce6a99dec51bda11e52e3.svg";
const imgMdiBugOutline = "http://localhost:3845/assets/78243820230748e1536afa6524861dc16102acd5.svg";
const imgSolarMenuDotsBold = "http://localhost:3845/assets/8a979a8cdfa677b78d2d6aa2adaa2593f7446dfa.svg";
const imgSort = "http://localhost:3845/assets/283f48e115be6d21549f75ccc5222604dfe9d2a7.svg";

export default function ProjectListTable() {
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

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#eef1f2] h-16 shadow-[0px_2px_4px_0px_rgba(6,38,61,0.1)] px-6 flex items-center">
            <div className="flex items-center gap-4 w-full">
              {/* Drag Handle */}
              <div className="w-6 h-6 flex items-center justify-center">
                <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
              </div>
              
              {/* Checkbox */}
              <div className="w-6 h-6 flex items-center justify-center">
                <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
              </div>
              
              {/* Type */}
              <div className="flex items-center gap-2 min-w-[88px]">
                <span className="text-[#252525] text-lg font-medium">Type</span>
                <img alt="sort" className="w-4 h-4" src={imgSort} />
              </div>
              
              {/* Issue Title */}
              <div className="flex items-center gap-2 min-w-[200px] flex-1">
                <span className="text-[#252525] text-lg font-medium">Issue Title</span>
                <img alt="sort" className="w-4 h-4" src={imgSort} />
              </div>
              
              {/* Assign to */}
              <div className="flex items-center gap-2 min-w-[120px]">
                <span className="text-[#252525] text-lg font-medium">Assign to</span>
                <img alt="sort" className="w-4 h-4" src={imgSort} />
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className="text-[#252525] text-lg font-medium">Status</span>
                <img alt="sort" className="w-4 h-4" src={imgSort} />
              </div>
              
              {/* Priority */}
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className="text-[#252525] text-lg font-medium">Priority</span>
                <img alt="sort" className="w-4 h-4" src={imgSort} />
              </div>
              
              {/* Due date */}
              <div className="flex items-center gap-2 min-w-[100px] justify-end">
                <span className="text-[#252525] text-lg font-medium">Due date</span>
                <img alt="sort" className="w-4 h-4" src={imgSort} />
              </div>
              
              {/* Action */}
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-[#252525] text-lg font-medium">Action</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {/* Table Row 1 */}
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                {/* Drag Handle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
                </div>
                
                {/* Checkbox */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
                </div>
                
                {/* Type */}
                <div className="flex items-center gap-1 min-w-[88px]">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-[#666666] text-xs font-normal">TA – 117</span>
                </div>
                
                {/* Issue Title */}
                <div className="min-w-[200px] flex-1">
                  <span className="text-[#252525] text-base font-medium">Publish blog page</span>
                </div>
                
                {/* Assign to */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                  </div>
                  <span className="text-[#333333] text-xs font-medium">24+</span>
                </div>
                
                {/* Status */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#8a96f7] text-sm font-medium">To-do</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#d58d49] text-sm font-medium">Low</span>
                  </div>
                </div>
                
                {/* Due date */}
                <div className="min-w-[100px] text-right">
                  <span className="text-[#e52828] text-base font-medium">Dec 5</span>
                </div>
                
                {/* Action */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="menu" className="w-4 h-4" src={imgSolarMenuDotsBold} />
                </div>
              </div>
            </div>

            {/* Table Row 2 */}
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                {/* Drag Handle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
                </div>
                
                {/* Checkbox */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
                </div>
                
                {/* Type */}
                <div className="flex items-center gap-1 min-w-[88px]">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-[#666666] text-xs font-normal">TA – 117</span>
                </div>
                
                {/* Issue Title */}
                <div className="min-w-[200px] flex-1">
                  <span className="text-[#252525] text-base font-medium">Publish blog page</span>
                </div>
                
                {/* Assign to */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                  </div>
                  <span className="text-[#333333] text-xs font-medium">24+</span>
                </div>
                
                {/* Status */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#8a96f7] text-sm font-medium">To-do</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#d58d49] text-sm font-medium">Low</span>
                  </div>
                </div>
                
                {/* Due date */}
                <div className="min-w-[100px] text-right">
                  <span className="text-[#e52828] text-base font-medium">Dec 5</span>
                </div>
                
                {/* Action */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="menu" className="w-4 h-4" src={imgSolarMenuDotsBold} />
                </div>
              </div>
            </div>

            {/* Table Row 3 */}
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                {/* Drag Handle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
                </div>
                
                {/* Checkbox */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
                </div>
                
                {/* Type */}
                <div className="flex items-center gap-1 min-w-[88px]">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-[#666666] text-xs font-normal">TA – 117</span>
                </div>
                
                {/* Issue Title */}
                <div className="min-w-[200px] flex-1">
                  <span className="text-[#252525] text-base font-medium">Publish blog page</span>
                </div>
                
                {/* Assign to */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                  </div>
                  <span className="text-[#333333] text-xs font-medium">24+</span>
                </div>
                
                {/* Status */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#8a96f7] text-sm font-medium">To-do</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#d58d49] text-sm font-medium">Low</span>
                  </div>
                </div>
                
                {/* Due date */}
                <div className="min-w-[100px] text-right">
                  <span className="text-[#e52828] text-base font-medium">Dec 5</span>
                </div>
                
                {/* Action */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="menu" className="w-4 h-4" src={imgSolarMenuDotsBold} />
                </div>
              </div>
            </div>

            {/* Table Row 4 */}
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                {/* Drag Handle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
                </div>
                
                {/* Checkbox */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
                </div>
                
                {/* Type */}
                <div className="flex items-center gap-1 min-w-[88px]">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-[#666666] text-xs font-normal">TA – 117</span>
                </div>
                
                {/* Issue Title */}
                <div className="min-w-[200px] flex-1">
                  <span className="text-[#252525] text-base font-medium">Publish blog page</span>
                </div>
                
                {/* Assign to */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                  </div>
                  <span className="text-[#333333] text-xs font-medium">24+</span>
                </div>
                
                {/* Status */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#8a96f7] text-sm font-medium">To-do</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#d58d49] text-sm font-medium">Low</span>
                  </div>
                </div>
                
                {/* Due date */}
                <div className="min-w-[100px] text-right">
                  <span className="text-[#e52828] text-base font-medium">Dec 5</span>
                </div>
                
                {/* Action */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="menu" className="w-4 h-4" src={imgSolarMenuDotsBold} />
                </div>
              </div>
            </div>

            {/* Table Row 5 */}
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                {/* Drag Handle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
                </div>
                
                {/* Checkbox */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
                </div>
                
                {/* Type */}
                <div className="flex items-center gap-1 min-w-[88px]">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-[#666666] text-xs font-normal">TA – 117</span>
                </div>
                
                {/* Issue Title */}
                <div className="min-w-[200px] flex-1">
                  <span className="text-[#252525] text-base font-medium">Publish blog page</span>
                </div>
                
                {/* Assign to */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                  </div>
                  <span className="text-[#333333] text-xs font-medium">24+</span>
                </div>
                
                {/* Status */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#8a96f7] text-sm font-medium">To-do</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#d58d49] text-sm font-medium">Low</span>
                  </div>
                </div>
                
                {/* Due date */}
                <div className="min-w-[100px] text-right">
                  <span className="text-[#e52828] text-base font-medium">Dec 5</span>
                </div>
                
                {/* Action */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="menu" className="w-4 h-4" src={imgSolarMenuDotsBold} />
                </div>
              </div>
            </div>

            {/* Table Row 6 */}
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 w-full">
                {/* Drag Handle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="drag" className="w-4 h-4" src={imgQlementineIconsDrag16} />
                </div>
                
                {/* Checkbox */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="checkbox" className="w-4 h-4" src={imgCheckbox} />
                </div>
                
                {/* Type */}
                <div className="flex items-center gap-1 min-w-[88px]">
                  <div className="bg-[#263238] rounded-full p-1">
                    <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                  </div>
                  <span className="text-[#666666] text-xs font-normal">TA – 117</span>
                </div>
                
                {/* Issue Title */}
                <div className="min-w-[200px] flex-1">
                  <span className="text-[#252525] text-base font-medium">Publish blog page</span>
                </div>
                
                {/* Assign to */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse243} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse244} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse245} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse246} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse247} />
                    <img alt="member" className="w-8 h-8 rounded-full border-2 border-white" src={imgEllipse242} />
                  </div>
                  <span className="text-[#333333] text-xs font-medium">24+</span>
                </div>
                
                {/* Status */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(138,150,247,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#8a96f7] text-sm font-medium">To-do</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div className="min-w-[80px]">
                  <div className="bg-[rgba(223,168,116,0.2)] rounded px-3 py-1 inline-block">
                    <span className="text-[#d58d49] text-sm font-medium">Low</span>
                  </div>
                </div>
                
                {/* Due date */}
                <div className="min-w-[100px] text-right">
                  <span className="text-[#e52828] text-base font-medium">Dec 5</span>
                </div>
                
                {/* Action */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <img alt="menu" className="w-4 h-4" src={imgSolarMenuDotsBold} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 