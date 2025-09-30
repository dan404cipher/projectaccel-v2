import React from 'react';

interface ActionOptionsProps {
  onEdit?: () => void;
  onCopyEmail?: () => void;
  onMessage?: () => void;
  onDelete?: () => void;
  className?: string;
}

export default function ActionOptions({ 
  onEdit, 
  onCopyEmail, 
  onMessage, 
  onDelete, 
  className = "" 
}: ActionOptionsProps) {
  return (
    <div className={`relative ${className}`} data-name="Action options">
      <div className="bg-white h-[160px] rounded-[8px] w-[176px] shadow-lg border border-gray-200 p-0" data-node-id="463:35939">
        
        {/* Edit Option */}
        <div 
          className="flex items-center h-8 px-4 cursor-pointer hover:bg-gray-50 rounded-t-[8px]" 
          onClick={onEdit}
        >
          <span className="text-[#4a4a4a] text-[14px] font-normal">Edit</span>
        </div>
        
        {/* Copy Email Option */}
        <div 
          className="flex items-center h-8 px-4 cursor-pointer hover:bg-gray-50" 
          onClick={onCopyEmail}
        >
          <span className="text-[#4a4a4a] text-[14px] font-normal">Copy Email</span>
        </div>
        
        {/* Message Option */}
        <div 
          className="flex items-center h-8 px-4 cursor-pointer hover:bg-gray-50" 
          onClick={onMessage}
        >
          <span className="text-[#4a4a4a] text-[14px] font-normal">Message</span>
        </div>
        
        {/* Separator Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-4 my-2"></div>
        
        {/* Delete Option */}
        <div 
          className="flex items-center h-8 px-4 cursor-pointer hover:bg-gray-50 rounded-b-[8px]" 
          onClick={onDelete}
        >
          <span className="text-[#4a4a4a] text-[14px] font-normal">Delete</span>
        </div>
      </div>
    </div>
  );
}
