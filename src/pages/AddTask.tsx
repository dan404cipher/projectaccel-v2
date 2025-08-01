import React, { useState } from 'react';
import AttachmentTab from '@/components/AttachmentTab';

// Image assets from Figma design
const imgEllipse253 = "http://localhost:3845/assets/c888080ce94d57f50955fb04d5962065ea66f33f.png";
const imgEllipse243 = "http://localhost:3845/assets/404c75e26786835a6fc5f408fe3205ae5046b5fd.png";
const imgEllipse244 = "http://localhost:3845/assets/3af77bedbbb1a456dbfda7a3ae271f51a267c672.png";
const imgEllipse245 = "http://localhost:3845/assets/11b5bca72b4284b33f1de649e4f4b504e9799ce8.png";
const imgEllipse254 = "http://localhost:3845/assets/b921db79ddde95cded013673eed0bd9b28214788.png";
const imgIconamoonArrowUp2Light = "http://localhost:3845/assets/fab16e5cb0511992493ed8bffb6b292003e05d46.svg";
const imgLine103 = "http://localhost:3845/assets/57906776ce1f9141ddafd4871c6db2c2733562cc.svg";
const imgLine35 = "http://localhost:3845/assets/bd3a85f4dcfc43fa139add7ccf17c6fe3ff3b3c4.svg";
const imgLine96 = "http://localhost:3845/assets/e83976845ebf17674ea9cc082d2d6f90732461b6.svg";
const imgLine98 = "http://localhost:3845/assets/13a44c439acaaf305daa8fcfd6a259ae5df5eec0.svg";
const imgLine99 = "http://localhost:3845/assets/d3c12f554316625430f76802a97abedc390bb67f.svg";
const imgLine97 = "http://localhost:3845/assets/e141b0986f92f5e41799f9d63bd71ca7158892d4.svg";
const imgLine95 = "http://localhost:3845/assets/07b2bfee8827da1baa26333031acab9c6d327951.svg";
const imgGroup2087324215 = "http://localhost:3845/assets/4a81044addceb80f7e1582596100d3bc7c6bedd0.svg";
const imgGroup2087324218 = "http://localhost:3845/assets/a4f088eb45a6270a198a64054fa0c59d35214014.svg";
const imgGroup2087324219 = "http://localhost:3845/assets/da37573bd8d30441856383e1f06821e5e81c0f7b.svg";
const imgIcRoundPlus = "http://localhost:3845/assets/d53f6463b0e4333126e976ee6c3b7d9d3a3bf4d3.svg";
const imgIcRoundPlus1 = "http://localhost:3845/assets/aece6970a29f3aab0eb10ea86178527cef35970f.svg";
const imgIcRoundPlus2 = "http://localhost:3845/assets/dd4dc3f173b43504e12901612a14573c7f02aef5.svg";
const img = "http://localhost:3845/assets/033a35e00f86a3ceaa10ce1c425fc55f00857174.svg";
const imgIconamoonArrowUp2Light1 = "http://localhost:3845/assets/4f4980d1829f1e186899646a5e4908ff8ffc2cb6.svg";
const imgIonCheckmarkDoneCircle = "http://localhost:3845/assets/0b7da985ee9c87ed18db56326cbb519d306af66a.svg";
const imgMdiBugOutline = "http://localhost:3845/assets/78243820230748e1536afa6524861dc16102acd5.svg";
const imgTeenyiconsCurvedConnectorOutline = "http://localhost:3845/assets/98205014a71cad19acca7b2978395630aa53796f.svg";
const imgMingcuteFullscreen2Line = "http://localhost:3845/assets/34357f25efe3680407c28a3dafff9770e6fe0122.svg";
const imgTdesignShare = "http://localhost:3845/assets/4fccb1196d05cbb851d0a9d8f83a829d4efb909b.svg";
const imgMdiLightEye = "http://localhost:3845/assets/a57effb99e22008a117461f4c4e2a53c920f0bda.svg";
const imgSolarMenuDotsBold = "http://localhost:3845/assets/0d9adb6cbac7a09d66074dfd5d004549e4cd57b7.svg";
const imgMakiCross = "http://localhost:3845/assets/e263f2bc45efe8e6e8fa4cb04e10a4d60daf65ff.svg";

export default function AddTask() {
  const [activeTab, setActiveTab] = useState<'comment' | 'attachment'>('attachment');

  return (
    <div className="relative size-full min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-3xl shadow-sm max-w-7xl mx-auto h-[984px] relative">
        {/* Header Section */}
        <div className="absolute flex items-center justify-between left-8 p-0 top-6 w-[1313px]">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-[#438197] tracking-tight">
                Add Task
              </h1>
              <p className="text-base text-gray-600 mt-1">
                Project / PJ-2 / EP-1 / T-112
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Krishna Kumar</p>
                <p className="text-xs text-gray-500">Task Created on Sep 24 2025 at 10:30 AM</p>
              </div>
              <img alt="avatar" className="w-8 h-8 rounded-full" src={imgEllipse254} />
            </div>
            
            <div className="flex items-center gap-6">
              <img alt="share" className="w-6 h-6" src={imgTdesignShare} />
              <div className="flex items-center gap-2">
                <img alt="eye" className="w-6 h-6" src={imgMdiLightEye} />
                <span className="text-xl font-semibold text-gray-700">6</span>
              </div>
              <img alt="menu" className="w-6 h-6" src={imgSolarMenuDotsBold} />
              <img alt="close" className="w-6 h-6" src={imgMakiCross} />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="absolute flex h-0 items-center justify-center left-1/2 top-20 translate-x-[-50%] w-[1385px]">
          <div className="h-0 w-[1385px]">
            <img alt="" className="block max-w-none size-full" src={imgLine103} />
          </div>
        </div>

        {/* Fullscreen Button */}
        <div className="absolute left-[1321px] top-28">
          <img alt="fullscreen" className="w-6 h-6" src={imgMingcuteFullscreen2Line} />
        </div>

        <div className="flex pt-24">
          {/* Left Column */}
          <div className="flex-1 p-8">
            {/* Task Type */}
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium text-gray-900 w-40">Task type</span>
                <div className="flex items-center gap-1">
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium">
                    Task
                  </div>
                  <img alt="arrow" className="w-6 h-6 rotate-180" src={imgIconamoonArrowUp2Light} />
                </div>
              </div>
            </div>

            {/* Task Title */}
            <h2 className="text-2xl font-medium text-[#438197] mb-8 tracking-tight">
              V-Accel Website Design
            </h2>

            {/* Task Details */}
            <div className="space-y-6 mb-8">
              {/* Assigned to */}
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium text-gray-900 w-40">Assigned to</span>
                <div className="flex items-center gap-2">
                  <div className="bg-[#67909b] rounded-lg w-8 h-8 flex items-center justify-center">
                    <img alt="plus" className="w-6 h-6" src={imgIcRoundPlus2} />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium text-gray-900 w-40">Dates</span>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                  <img alt="calendar" className="w-6 h-6" src={img} />
                  <span className="text-base font-medium">Sep 24 2025</span>
                  <img alt="arrow" className="w-6 h-6 rotate-90" src={imgIconamoonArrowUp2Light1} />
                  <span className="text-base font-medium">Sep 24 2025</span>
                </div>
              </div>

              {/* Estimate Time */}
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium text-gray-900 w-40">Estimate Time</span>
                <div className="bg-gray-50 px-3 py-2 rounded-full">
                  <span className="text-base font-medium">Empty</span>
                </div>
              </div>

              {/* Task Priority and Status */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-medium text-gray-900 w-40">Task Priority</span>
                  <div className="flex items-center gap-1">
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-sm font-medium">
                      Low
                    </div>
                    <img alt="arrow" className="w-6 h-6 rotate-180" src={imgIconamoonArrowUp2Light} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xl font-medium text-gray-900 w-20">Status</span>
                  <div className="flex items-center gap-1">
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium">
                      To-do
                    </div>
                    <img alt="arrow" className="w-6 h-6 rotate-180" src={imgIconamoonArrowUp2Light} />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Description</h3>
              <div className="border border-gray-300 rounded-lg p-4 min-h-24">
                <p className="text-gray-500">Add task description</p>
              </div>
            </div>

            {/* Subtask */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-gray-900">Subtask</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <img alt="plus" className="w-6 h-6" src={imgIcRoundPlus} />
                  <span>Add Subtask</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                <img alt="check" className="w-6 h-6" src={imgIonCheckmarkDoneCircle} />
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <div className="bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center">
                      <img alt="bug" className="w-4 h-4" src={imgMdiBugOutline} />
                    </div>
                    <span className="text-xs text-gray-600">BG – 117</span>
                  </div>
                  <span className="text-base font-medium text-gray-900">Publish blog page</span>
                </div>
                
                <div className="flex items-center gap-1 ml-auto">
                  <img alt="connector" className="w-4 h-4 rotate-180" src={imgTeenyiconsCurvedConnectorOutline} />
                  <span className="text-sm font-medium text-[#06263d]">2</span>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex -space-x-2">
                    <img alt="member" className="w-6 h-6 rounded-full" src={imgEllipse243} />
                    <img alt="member" className="w-6 h-6 rounded-full" src={imgEllipse244} />
                    <img alt="member" className="w-6 h-6 rounded-full" src={imgEllipse245} />
                    <img alt="member" className="w-6 h-6 rounded-full" src={imgEllipse245} />
                  </div>
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium">
                    To-do
                  </div>
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-sm font-medium">
                    Low
                  </div>
                  <span className="text-base font-medium text-red-600">Oct 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-96 border-l border-gray-200 p-8">
            {/* Comment/Attachment Section */}
            <div className="mb-8">
              <div className="flex items-center gap-8 mb-4">
                <button 
                  onClick={() => setActiveTab('comment')}
                  className={`text-xl font-medium ${activeTab === 'comment' ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  Comment
                </button>
                <button 
                  onClick={() => setActiveTab('attachment')}
                  className={`text-xl font-medium ${activeTab === 'attachment' ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  Attachment
                </button>
              </div>
              
              {/* Tab indicator line */}
              <div className="relative mb-6">
                <div className="h-0 w-[100px]">
                  <img alt="" className="block max-w-none size-full" src={imgLine35} />
                </div>
                <div 
                  className={`absolute top-0 h-0 w-[100px] transition-transform duration-200 ${
                    activeTab === 'comment' ? 'translate-x-0' : 'translate-x-[109px]'
                  }`}
                >
                  <img alt="" className="block max-w-none size-full" src={imgLine35} />
                </div>
              </div>
              
              {/* Tab Content */}
              {activeTab === 'comment' ? (
                <div className="border border-gray-300 rounded-full p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex gap-2">
                        <img alt="icon" className="w-8 h-8" src={imgGroup2087324215} />
                        <img alt="icon" className="w-8 h-8" src={imgGroup2087324218} />
                      </div>
                      <span className="text-gray-500 opacity-90">Add your comment...</span>
                    </div>
                    <img alt="send" className="w-8 h-8" src={imgGroup2087324219} />
                  </div>
                </div>
              ) : (
                <AttachmentTab className="mb-6" />
              )}
            </div>

            {/* Activity Section */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Activity</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <img alt="avatar" className="w-10 h-10 rounded-full" src={imgEllipse253} />
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-base font-medium text-gray-900">Kate</span>
                      <span className="text-xs text-gray-500">Sep 24 2025 at 10:30 AM</span>
                    </div>
                    <p className="text-base text-gray-600 leading-5">
                      Moved task card <span className="font-medium">Login Auth</span><br />
                      <span className="text-gray-500 text-sm">Todo {'>'} In progress</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <img alt="avatar" className="w-10 h-10 rounded-full" src={imgEllipse253} />
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-base font-medium text-gray-900">Kate</span>
                      <span className="text-xs text-gray-500">Sep 24 2025 at 10:30 AM</span>
                    </div>
                    <p className="text-base text-gray-600 leading-5">
                      Moved task card <span className="font-medium">Login Auth</span><br />
                      <span className="text-gray-500 text-sm">Todo {'>'} In progress</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Log Section */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Work log</h3>
              <div className="space-y-4 opacity-0">
                <div className="flex items-center gap-4">
                  <span className="text-base text-gray-900">Started</span>
                  <div className="bg-gray-50 px-3 py-2 rounded-full">
                    <span className="text-base font-medium">Sep 25 2025 at 2:09 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base text-gray-900">Time spend</span>
                  <div className="bg-gray-50 px-3 py-2 rounded-full">
                    <span className="text-base font-medium">06h 22m</span>
                    <span className="text-sm text-green-700 ml-2">(On progress)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Lines */}
        <div className="absolute flex h-0 items-center justify-center left-0 top-[674px] w-[733px]">
          <div className="h-0 w-[733px]">
            <img alt="" className="block max-w-none size-full" src={imgLine96} />
          </div>
        </div>
        
        <div className="absolute flex h-0 items-center justify-center left-[733px] top-[862px] w-[652px]">
          <div className="h-0 w-[652px]">
            <img alt="" className="block max-w-none size-full" src={imgLine98} />
          </div>
        </div>
        
        <div className="absolute flex h-0 items-center justify-center left-[733px] top-[428px] w-[652px]">
          <div className="h-0 w-[652px]">
            <img alt="" className="block max-w-none size-full" src={imgLine99} />
          </div>
        </div>
      </div>
    </div>
  );
}