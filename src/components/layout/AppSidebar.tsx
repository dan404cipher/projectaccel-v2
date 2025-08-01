import { Grid, BarChart3, Settings, HelpCircle, Home, Folder, ChevronLeft } from "lucide-react"
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

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const location = useLocation()
  const collapsed = state === "collapsed"

  const isActive = (path: string) => location.pathname === path
  const getNavClass = (isActiveLink: boolean) =>
    isActiveLink 
      ? "bg-gradient-to-r from-white to-white/90 text-[#06263D] shadow-lg rounded-xl border border-white/30 backdrop-blur-sm" 
      : "hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 text-[#06263D] rounded-xl transition-all duration-300 hover:shadow-md"

  return (
    <div className={`${collapsed ? "w-20 sm:w-24" : "w-48 sm:w-60"} flex-shrink-0 h-full h-[calc(100%-7rem)] mt-16 transition-all duration-300 ease-in-out`}>
      <div 
        className="h-full m-1 sm:m-2 lg:m-4 rounded-xl sm:rounded-2xl lg:rounded-[32px] p-2 sm:p-3 lg:p-2 relative flex flex-col shadow-2xl border border-white/20"
        style={{
          background: 'linear-gradient(135deg, #C0CED2 0%, #B0BEC2 50%, #A0AEB2 100%)',
          backdropFilter: 'blur(50px)'
        }}
      >
        {/* Navigation */}
        <div className="flex flex-col h-full pt-4 sm:pt-6 lg:pt-8">
          {/* MANAGE Section */}
          <div className="flex-shrink-0">
            <div className={`text-xs sm:text-[12px] text-[#4A5568] uppercase tracking-wider font-semibold mb-2 sm:mb-3 lg:mb-4 px-2 sm:px-3 ${collapsed ? 'hidden' : 'block'} flex items-center gap-2`}>
              <div className="w-1 h-1 bg-[#4A5568] rounded-full"></div>
              MANAGE
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 sm:gap-3 lg:gap-4'} px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm lg:text-[14px] font-semibold transition-all duration-200 ${getNavClass(isActive(item.url))}`}
                  title={collapsed ? item.title : undefined}
                >
                  <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="h-full w-full flex items-center justify-center">
                      <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[#06263D] font-bold" />
                    </div>
                  </div>
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RECENT Section */}
          <div className="flex-shrink-0 mt-3 sm:mt-4 lg:mt-5">
            <div className={`text-xs sm:text-[12px] text-[#4A5568] uppercase tracking-wider font-semibold mb-2 sm:mb-3 lg:mb-4 px-2 sm:px-3 ${collapsed ? 'hidden' : 'block'} flex items-center gap-2`}>
              <div className="w-1 h-1 bg-[#4A5568] rounded-full"></div>
              RECENT
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              {recentItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 sm:gap-3 lg:gap-4'} px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm lg:text-[14px] font-medium transition-all duration-200 ${getNavClass(false)}`}
                  title={collapsed ? item.title : undefined}
                >
                  <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="h-full w-full flex items-center justify-center">
                      <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[#06263D] font-bold" />
                    </div>
                  </div>
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Collapse Button */}
        <div className={`absolute bottom-2 sm:bottom-3 lg:bottom-4 ${collapsed ? 'left-1/2 transform -translate-x-1/2' : 'right-2 sm:right-3 lg:right-4'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 p-1 sm:p-1.5 lg:p-2 rounded-xl sm:rounded-2xl lg:rounded-[20px] bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300"
            onClick={toggleSidebar}
          >
            <ChevronLeft className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[#06263D] transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}