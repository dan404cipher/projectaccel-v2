import { Search, Bell, MessageSquare, Puzzle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header 
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-10 py-4 h-[88px]"
      style={{
        borderRadius: '100px',
        background: '#C0CED2',
        backdropFilter: 'blur(50px)'
      }}
    >
      {/* Left Section - Logo and Workspace */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="h-5 w-[110px] flex items-center">
          <span className="font-bold text-lg text-[#06263D]">🔷 Logoipsum</span>
        </div>
        
        {/* Workspace Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="justify-between h-12 px-6 w-[264px] bg-[rgba(255,255,255,0.07)]"
              style={{
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.07)'
              }}
            >
              <span className="text-[#06263D] font-medium text-[20px] capitalize">
                Workspace name
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180">
                <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Workspace name</DropdownMenuItem>
            <DropdownMenuItem>Another Workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center Section - Search Bar */}
      <div className="bg-white rounded-[100px] h-12 w-[356px] flex items-center px-6 gap-4">
        <Search className="h-6 w-6 text-gray-400" />
        <input 
          type="text"
          placeholder="search for anything..." 
          className="flex-1 border-none outline-none text-base text-[#999999] placeholder:text-[#999999] bg-transparent lowercase"
        />
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </Button>
      </div>

      {/* Right Section - Action Buttons and User */}
      <div className="flex items-center gap-6">
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-full hover:bg-white/30">
            <Puzzle className="h-6 w-6 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-full hover:bg-white/30">
            <Bell className="h-6 w-6 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-full hover:bg-white/30">
            <MessageSquare className="h-6 w-6 text-gray-700" />
          </Button>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-4 h-12 px-4 rounded-full bg-white hover:bg-white/90">
              <Avatar className="h-[38px] w-[38px]">
                <AvatarImage src="" />
                <AvatarFallback className="bg-orange-400 text-white text-base font-medium">L</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-[14px] font-normal text-[#292D32]">Lisa</div>
                <div className="text-[12px] font-normal text-[rgba(41,45,50,0.44)]">Prodcut manager</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}