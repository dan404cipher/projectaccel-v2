import { Paperclip, Search, Send, SlidersHorizontal, Smile } from 'lucide-react';
import React, { useState } from 'react';
import { Chats } from '@/lib/MockData';
import { TiPin } from "react-icons/ti";
import { IoIosMore } from "react-icons/io";
import { Input } from '@/components/ui/input';

const profile5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

export default function Message() {
  const [activeTap, setActiveTab] = useState<'chennal' | 'chat' | 'unread'>('chat');
  const [selectChat, setSelectChat] = useState(Chats[0]);
  const currentUser = {
    profile: profile5,
    name: 'Kamalesh'
  }

  const tabs: { label: string, value: string }[] = [
    {
      label: "Channel",
      value: 'chennal'
    },
    {
      label: "Chat",
      value: 'chat'
    },
    {
      label: "Unread",
      value: 'unread'
    }
  ]

  return (
    <div className=" w-full h-full flex gap-5">
      <div className='w-[70%] flex flex-col h-full rounded-lg relative bg-white'>
        {/* chat Header */}
        <div className='flex items-center justify-between bg-white p-5 border-b border-gray-200'>
          <div className='flex items-center gap-5'>
            <img src={selectChat?.profile} className='w-10 h-10' />
            <div className='flex flex-col'>
              <span className='text-[#333333] font-medium text-sm'>{selectChat.name}</span>
              <span className='text-[#666666] text-xs'>{selectChat.activeago}</span>
            </div>
          </div>
          <div className='flex items-center justify-center cursor-pointer'>
            <IoIosMore className='w-10 h-7' />
          </div>
        </div>
        <div className='p-5 flex flex-col gap-8'>
          {
            selectChat.conversations.map((chat) => (
              <div className={`${chat.sender === currentUser.name ? "flex-row-reverse" : " flex-row"} flex-1 flex-row flex gap-5`}>
                <img src={chat.sender === currentUser.name ? currentUser.profile : selectChat.profile} className='w-10 h-10' />
                <div className='flex flex-col'>
                  <div className={`${chat.sender === currentUser.name ? "bg-[#F0F5F7] rounded-bl-2xl" : "bg-[#FEF9F5] rounded-br-2xl"} flex items-center px-3 py-2 rounded-t-2xl`}>{chat.text}</div>
                  <div className='text-sm px-4 py-1 text-[#999999]'>2 ago</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className=' absolute left-0 bottom-0 w-full p-5'>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-full flex items-center gap-5 ">
            <div className="flex items-center gap-2 flex-1">
              <div className=" bg-[#67909B] flex items-center justify-center p-2 rounded-full text-white cursor-pointer">
                <Paperclip className="w-3 h-3" />
              </div>
              <div className=" bg-[#67909B] flex items-center justify-center p-2 rounded-full text-white cursor-pointer">
                <Smile className="w-3 h-3" />
              </div>
              <input className='border-none bg-transparent focus:border-none focus:outline-none w-full pl-5' placeholder='wirte your comments' />
            </div>
            <div className=" bg-[#67909B] flex items-center justify-center p-2 rounded-full text-white cursor-pointer">
              <Send className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
      <div className='w-[30%]  bg-white rounded-lg py-5'>
        {/* chat header */}
        <div className='flex items-center justify-between px-5'>
          <div className='flex items-center gap-3 bg-[#67909B] rounded-full px-3 py-2'>
            {
              tabs.map((tab) => (
                <div className={`${activeTap === tab.value ? " bg-white" : "text-white"} rounded-full px-2 py-1 cursor-pointer font-medium text-sm`} onClick={() => setActiveTab(tab.value as ('chennal' | 'chat' | 'unread'))}>{tab.label}</div>
              ))
            }
          </div>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-md bg-[#67909B] text-white flex items-center justify-center cursor-pointer'>
              <Search className='w-4 h-4' />
            </div>
            <div className='p-2 rounded-md bg-[#67909B] text-white flex items-center justify-center cursor-pointer'>
              <SlidersHorizontal className='w-4 h-4' />
            </div>
          </div>
        </div>
        <div className='w-full h-full overflow-y-scroll mt-5'>
          {
            Chats.length > 0 ? (
              Chats.map((chat) => (
                <div className='flex items-center justify-between hover:bg-[#EB75000A] py-4 px-5 cursor-pointer' onClick={() => setSelectChat(chat)}>
                  <div className='flex items-center gap-5'>
                    <img src={chat.profile} className='w-10 h-10' />
                    <div className='flex flex-col'>
                      <span className='text-[#333333] font-medium text-sm'>{chat.name}</span>
                      <span className='text-[#666666] text-xs'>{chat.lastmsg}</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-5'>
                    <div>
                      {chat.ispin && <TiPin className='text-[#06263D] w-5 h-5' />}
                    </div>
                    {chat.unread > 0 && <div className='bg-[#008000] text-xs p-1 w-5 h-5 overflow-hidden flex items-center justify-center rounded-full text-white'>
                      {chat.unread || 0}
                    </div>}
                  </div>
                </div>
              ))
            ) : (
              <div>No more chat</div>
            )
          }
        </div>
      </div>
    </div>
  );
} 