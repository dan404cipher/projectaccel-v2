import { Grid, BarChart3, Settings, HelpCircle, Home, Folder } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dash Board", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: Folder },
]

const recentItems = [
  { title: "Ricemill Portal", url: "/ricemill", icon: Grid },
  { title: "V-accel Website", url: "/v-accel", icon: Grid },
  { title: "Hire-accel", url: "/hire-accel", icon: Grid },
]

const settingsItems = [
  { title: "Help & support", url: "/help", icon: HelpCircle },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const collapsed = state === "collapsed"

  const isActive = (path: string) => location.pathname === path
  const getNavClass = (isActiveLink: boolean) =>
    isActiveLink 
      ? "bg-gradient-to-r from-white to-white/90 text-[#06263D] shadow-lg rounded-xl border border-white/30 backdrop-blur-sm" 
      : "hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 text-[#06263D] rounded-xl transition-all duration-300 hover:shadow-md"

  return (
    <div className={`${collapsed ? "w-12 sm:w-16" : "w-48 sm:w-60"} flex-shrink-0 h-full h-[calc(100%-4rem)] mt-16`}>
      <div 
        className="h-full m-1 sm:m-2 lg:m-4 rounded-xl sm:rounded-2xl lg:rounded-[32px] p-2 sm:p-3 lg:p-2 relative flex flex-col shadow-2xl border border-white/20"
        style={{
          background: 'linear-gradient(135deg, #C0CED2 0%, #B0BEC2 50%, #A0AEB2 100%)',
          backdropFilter: 'blur(50px)'
        }}
      >
        {/* Navigation */}
        <div className="flex flex-col h-full">
          {/* MANAGE Section */}
          <div className="flex-shrink-0">
            <div className={`text-xs sm:text-[14px] text-[#4A5568] uppercase tracking-wider font-semibold mb-3 sm:mb-4 lg:mb-5 px-2 sm:px-3 ${collapsed ? 'hidden' : 'block'} flex items-center gap-2`}>
              <div className="w-1 h-1 bg-[#4A5568] rounded-full"></div>
              MANAGE
            </div>
            <div className="space-y-1 sm:space-y-2">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 sm:gap-3 lg:gap-4'} px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-[18px] font-semibold transition-all duration-200 ${getNavClass(isActive(item.url))}`}
                  title={collapsed ? item.title : undefined}
                >
                  <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="h-full w-full flex items-center justify-center">
                      <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-[14.4px] lg:w-[14.4px] text-[#06263D]" />
                    </div>
                  </div>
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RECENT Section */}
          <div className="flex-shrink-0 mt-4 sm:mt-6 lg:mt-8">
            <div className={`text-xs sm:text-[14px] text-[#4A5568] uppercase tracking-wider font-semibold mb-3 sm:mb-4 lg:mb-5 px-2 sm:px-3 ${collapsed ? 'hidden' : 'block'} flex items-center gap-2`}>
              <div className="w-1 h-1 bg-[#4A5568] rounded-full"></div>
              RECENT
            </div>
            <div className="space-y-1 sm:space-y-2">
              {recentItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 sm:gap-3 lg:gap-4'} px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-[16px] font-medium transition-all duration-200 ${getNavClass(false)}`}
                  title={collapsed ? item.title : undefined}
                >
                  <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="h-full w-full flex items-center justify-center">
                      <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-[14.4px] lg:w-[14.4px] text-[#06263D]" />
                    </div>
                  </div>
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="flex-shrink-0 mt-auto">
            <div className={`text-xs sm:text-[14px] text-[#4A5568] uppercase tracking-wider font-semibold mb-3 sm:mb-4 lg:mb-5 px-2 sm:px-3 ${collapsed ? 'hidden' : 'block'} flex items-center gap-2`}>
              <div className="w-1 h-1 bg-[#4A5568] rounded-full"></div>
              SETTINGS
            </div>
            <div className="space-y-1 sm:space-y-2">
              {settingsItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 sm:gap-3 lg:gap-4'} px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-[16px] font-medium transition-all duration-200 ${getNavClass(false)}`}
                  title={collapsed ? item.title : undefined}
                >
                  <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="h-full w-full flex items-center justify-center">
                      <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-[14.4px] lg:w-[14.4px] text-[#06263D]" />
                    </div>
                  </div>
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Collapse Button */}
        <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 p-1 sm:p-1.5 lg:p-2 rounded-xl sm:rounded-2xl lg:rounded-[20px] bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300"
            onClick={() => {/* Add collapse functionality */}}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#06263D] sm:w-3 sm:h-3 lg:w-4 lg:h-4">
              <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}