import { Search, Bell, MessageSquare, Puzzle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header 
      className="fixed top-1 sm:top-2 left-2 sm:left-4 right-2 sm:right-4 z-50 flex items-center justify-between px-3 sm:px-6 lg:px-10 py-1.5 sm:py-3 lg:py-4 h-12 sm:h-16 lg:h-18 mt-2"
      style={{
        borderRadius: '100px',
        background: '#C0CED2',
        backdropFilter: 'blur(50px)'
      }}
    >
      {/* Left Section - Logo and Workspace */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-10 flex-shrink-0">
        {/* Logo */}
        <div className="h-5 min-w-0 flex items-center">
          <span className="font-bold text-sm sm:text-base lg:text-lg text-[#06263D] truncate">
            <span className="hidden sm:inline">🔷 Logoipsum</span>
            <span className="sm:hidden">🔷 Logo</span>
          </span>
        </div>
        
        {/* Workspace Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="justify-between h-7 sm:h-9 lg:h-10 px-3 sm:px-4 lg:px-6 w-32 sm:w-48 lg:w-[264px] bg-[rgba(255,255,255,0.07)]"
              style={{
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.07)'
              }}
            >
              <span className="text-[#06263D] font-medium text-sm sm:text-base lg:text-[20px] capitalize truncate">
                <span className="hidden sm:inline">Workspace name</span>
                <span className="sm:hidden">Workspace</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rotate-180 sm:w-6 sm:h-6 flex-shrink-0">
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
      <div className="bg-white rounded-[100px] h-7 sm:h-9 lg:h-10 flex-1 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-[356px] mx-2 sm:mx-4 flex items-center px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400 flex-shrink-0" />
        <input 
          type="text"
          placeholder="search..." 
          className="flex-1 border-none outline-none text-sm sm:text-base text-[#999999] placeholder:text-[#999999] bg-transparent lowercase min-w-0"
        />
        <Button size="sm" variant="ghost" className="hidden sm:flex h-4 w-4 sm:h-6 sm:w-6 p-0 hover:bg-gray-100 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </Button>
      </div>

      {/* Right Section - Action Buttons and User */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-shrink-0">
        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:bg-white/30">
            <Puzzle className="h-5 w-5 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:bg-white/30">
            <Bell className="h-5 w-5 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:bg-white/30">
            <MessageSquare className="h-5 w-5 text-gray-700" />
          </Button>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-white/30">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-white/30">
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          </Button>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 sm:gap-4 h-7 sm:h-9 lg:h-10 px-2 sm:px-4 rounded-full bg-white hover:bg-white/90">
              <Avatar className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-orange-400 text-white text-xs sm:text-sm lg:text-base font-medium">L</AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <div className="text-xs sm:text-sm lg:text-[14px] font-normal text-[#292D32]">Lisa</div>
                <div className="text-xs lg:text-[12px] font-normal text-[rgba(41,45,50,0.44)] hidden lg:block">Product manager</div>
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