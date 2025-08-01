import { Search, Bell, MessageSquare, Puzzle, Settings } from "lucide-react"
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
              className="h-7 sm:h-9 lg:h-10 px-3 sm:px-4 lg:px-6 w-29 sm:w-41 lg:w-49 rounded-full relative workspace-button overflow-hidden focus:outline-none focus:ring-0 focus:border-none"
              style={{
                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.18) 100%), rgba(255, 255, 255, 0.07)',
                backgroundBlendMode: 'color-dodge, normal',
                borderRadius: '9999px'
              }}
            >
              <span className="text-[#06263D] pr-4 font-medium text-sm sm:text-base lg:text-base capitalize truncate">
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

      {/* Right Section - Search Bar, Action Buttons and User */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-shrink-0">
        {/* Search Bar */}
        <div className="bg-white rounded-[100px] h-6 sm:h-8 lg:h-9 w-40 sm:w-56 lg:w-80 flex items-center px-3 sm:px-4 lg:px-6">
          <Search className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-black flex-shrink-0 mr-2 sm:mr-3 lg:mr-4" />
          <input 
            type="text"
            placeholder="search for anything..." 
            className="flex-1 border-none outline-none text-xs sm:text-sm lg:text-base text-[#999999] placeholder:text-[#999999] bg-transparent lowercase min-w-0"
          />
          <Button size="sm" variant="ghost" className="hidden sm:flex h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 p-0 hover:bg-gray-100 flex-shrink-0 ml-2 sm:ml-3 lg:ml-4">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-black" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-white hover:bg-white/30">
            <Puzzle className="h-5 w-5 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-white hover:bg-white/30">
            <Bell className="h-5 w-5 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-white hover:bg-white/30">
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
            <Button variant="ghost" className="justify-between items-center gap-2 sm:gap-4 h-7 sm:h-9 lg:h-10 px-5 sm:pl-3 pr-6 rounded-full bg-white hover:bg-white/90">
              <Avatar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-xs sm:text-sm lg:text-base">JD</AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline text-sm font-medium text-gray-700">John Doe</span>
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