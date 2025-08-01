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
      ? "bg-white text-[#06263D] shadow-sm rounded-lg" 
      : "hover:bg-white/20 text-[#06263D] rounded-lg"

  return (
    <div className={`${collapsed ? "w-16" : "w-60"} flex-shrink-0 h-full`}>
      <div 
        className="h-[957px] m-4 rounded-[32px] p-6 relative"
        style={{
          background: '#C0CED2',
          backdropFilter: 'blur(50px)'
        }}
      >
        {/* Navigation */}
        <div className="space-y-6">
          {/* MANAGE Section */}
          <div>
            <div className="text-[14px] text-[#5A5A5A] uppercase tracking-wider font-medium mb-4 px-2">
              MANAGE
            </div>
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center gap-4 px-4 py-3 text-[18px] font-semibold transition-all duration-200 ${getNavClass(isActive(item.url))}`}
                >
                  <div className="h-6 w-6 overflow-hidden">
                    <div className="h-[14.4px] w-[14.4px] flex items-center justify-center">
                      <item.icon className="h-[14.4px] w-[14.4px]" />
                    </div>
                  </div>
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RECENT Section */}
          <div>
            <div className="text-[14px] text-[#5A5A5A] uppercase tracking-wider font-medium mb-4 px-2">
              RECENT
            </div>
            <div className="space-y-2">
              {recentItems.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  className={`flex items-center gap-4 px-4 py-3 text-[16px] font-medium transition-all duration-200 ${getNavClass(false)}`}
                >
                  <div className="h-6 w-6 overflow-hidden">
                    <div className="h-[14.4px] w-[14.4px] flex items-center justify-center">
                      <item.icon className="h-[14.4px] w-[14.4px]" />
                    </div>
                  </div>
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Collapse Button */}
        <div className="absolute bottom-4 right-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 w-10 p-2 rounded-[20px] bg-[#C0CED2] hover:bg-[#B0BEC2] flex items-center justify-center"
            onClick={() => {/* Add collapse functionality */}}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
              <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}