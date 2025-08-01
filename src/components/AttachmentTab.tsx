import React from 'react';

// Image assets from Figma design
const imgRectangle7064 = "http://localhost:3845/assets/995bd6c938356c08041c6f5e04e0e15abfdec276.png";
const imgRectangle7065 = "http://localhost:3845/assets/2e8f77c916e61bba6ea153750f164efeeabc8420.png";
const imgRectangle7066 = "http://localhost:3845/assets/e6b2025730ebbb4af5a7e677480f3838c818ac9c.png";
const imgDownload = "http://localhost:3845/assets/18f86ce457be1794e423e862aca0ea2f0b13a8d4.svg";
const imgDelete = "http://localhost:3845/assets/b770445e1d2afccdb0aa14fd6206f0297d7fbf44.svg";

interface AttachmentItem {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  thumbnail: string;
}

interface AttachmentTabProps {
  className?: string;
}

export default function AttachmentTab({ className = "" }: AttachmentTabProps) {
  const attachments: AttachmentItem[] = [
    {
      id: "1",
      name: "Wireframe UI Kit.zip",
      uploadDate: "Uploaded on 15.09.2025 at 11:45",
      size: "5.8 MB",
      thumbnail: imgRectangle7064
    },
    {
      id: "2", 
      name: "Picture 01.png",
      uploadDate: "Uploaded on 15.09.2025 at 11:45",
      size: "1.2MB",
      thumbnail: imgRectangle7065
    },
    {
      id: "3",
      name: "Picture 01.png",
      uploadDate: "Uploaded on 15.09.2025 at 11:45", 
      size: "1.2MB",
      thumbnail: imgRectangle7066
    }
  ];

  const handleDownload = (attachmentId: string) => {
    console.log('Download attachment:', attachmentId);
    // Implement download logic here
  };

  const handleDelete = (attachmentId: string) => {
    console.log('Delete attachment:', attachmentId);
    // Implement delete logic here
  };

  return (
    <div className={`h-[246px] w-[620px] ${className}`}>
      <div className="flex flex-col gap-4 h-[246px] overflow-x-clip overflow-y-auto p-0 w-[620px]">
        {attachments.map((attachment) => (
          <div 
            key={attachment.id}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-6">
              <div 
                className="bg-gray-300 bg-cover bg-center rounded-lg w-[92px] h-[92px] shrink-0"
                style={{ backgroundImage: `url('${attachment.thumbnail}')` }}
              />
              <div className="flex flex-col gap-2 w-[249px]">
                <div className="text-base font-medium text-gray-900 tracking-tight">
                  {attachment.name}
                </div>
                <div className="text-base font-medium text-gray-500 tracking-tight">
                  {attachment.uploadDate}
                </div>
                <div className="text-sm font-medium text-gray-500 tracking-tight">
                  {attachment.size}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleDownload(attachment.id)}
                className="w-6 h-6 hover:opacity-70 transition-opacity"
                aria-label="Download attachment"
              >
                <img 
                  alt="Download" 
                  className="block max-w-none size-full" 
                  src={imgDownload} 
                />
              </button>
              <button 
                onClick={() => handleDelete(attachment.id)}
                className="w-6 h-6 hover:opacity-70 transition-opacity"
                aria-label="Delete attachment"
              >
                <img 
                  alt="Delete" 
                  className="block max-w-none size-full" 
                  src={imgDelete} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}