import { Search, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import profile from "../../assets/icons/profile.png"

export function SuperAdminHeader() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <header 
      className="bg-[#C0CED2] flex items-center justify-between px-10 py-4 h-[88px] mb-[1.5rem] rounded-[100px]"
      style={{
        backdropFilter: 'blur(50px)'
      }}
    >
      {/* Left Section - Logo and Workspace */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="h-5 flex items-center">
          <span className="font-bold text-lg text-[#06263D]">
            Logoipsum
          </span>
        </div>
        
        {/* Workspace Dropdown */}
        <div className="bg-[rgba(255,255,255,0.07)] h-12 rounded-[100px] w-[264px] relative flex items-center px-6">
          <span className="font-medium text-[#06263d] text-xl mr-auto">Workspace Name</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180">
            <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Center - Search Bar */}
      <div className="bg-white rounded-[100px] h-12 w-[356px] flex items-center px-6 relative">
        <Search className="h-6 w-6 text-[#999999] mr-4 flex-shrink-0" />
        <input 
          type="text"
          placeholder="search for anything..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border-none outline-none text-base text-[#999999] bg-transparent"
        />
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-transparent flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 7H21M9 12H21M7 17H21" stroke="#999999" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Button>
      </div>

      {/* Right Section - Action Buttons and User */}
      <div className="flex items-center gap-6">
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-white hover:bg-white/80">
            <Bell className="h-5 w-5 text-[#06263D]" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-white hover:bg-white/80">
            <Bell className="h-5 w-5 text-[#06263D]" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-white hover:bg-white/80">
            <Bell className="h-5 w-5 text-[#06263D]" />
          </Button>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-4 h-10 px-5 pr-6 rounded-full bg-white hover:bg-white/90">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile} />
                <AvatarFallback className="text-sm">KK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start">
                <span className="text-sm font-medium text-[#292D32]">Krishna Kumar</span>
                <span className="text-sm font-medium text-[#292D3270]">Administrator</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

